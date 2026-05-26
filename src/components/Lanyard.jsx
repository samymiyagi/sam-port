/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from './card.glb';
import lanyard from './lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', touchAction: 'none' }}
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.80 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          gl.domElement.style.touchAction = 'none';
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics
          gravity={gravity}
          timeStep={1 / 60}
          maxStabilizationIterations={20}
          // More solver iterations = tighter, more stable joints
          maxVelocityIterations={12}
          maxVelocityFrictionIterations={8}
        >
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={0.2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={0.3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={0.3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={0.8} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 40, minSpeed = 10, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  // Increased angularDamping (was 2.5) and linearDamping (was 8) for much calmer physics
  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 1.4, // coasts freely but does eventually settle
    linearDamping: 12,
  };

  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);

  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  texture.needsUpdate = true;

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // ── Showcase state ────────────────────────────────────────────────────────
  // Separate "settled" idle time from drag time so the showcase only fires
  // after the card has genuinely been still (not just released).
  // Phase 0 — front-facing idle (always snaps to front, no exceptions)
  // Phase 1 — slow drift to back
  // Phase 2 — linger on back
  // Phase 3 — snap back home
  const settledTime = useRef(0);  // only counts while card is nearly still
  const lingerTime  = useRef(0);
  const showcasePhase = useRef(0);
  const wasDragged    = useRef(false);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 1 / 30);

    if (dragged) {
      wasDragged.current = true;
      // While dragging: pause showcase, do NOT reset settledTime yet
      // (we reset it on release once card is calm)
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          safeDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());

      // Normalise Y rotation to [-PI, PI]
      const yRot    = ((rot.y % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      const absY    = Math.abs(yRot);
      const angSpeed = Math.abs(ang.y);

      const isFacingFront = absY < 0.10 && angSpeed < 0.08;
      const isNearBack    = absY > Math.PI * 0.85;
      const isCalm        = angSpeed < 0.15;

      // Count settled time only when not dragging AND card is calm AND facing front
      if (!dragged && isFacingFront) {
        settledTime.current += safeDelta;
      } else if (dragged || (!isFacingFront && showcasePhase.current === 0)) {
        // Reset settled clock any time we leave front-facing idle
        settledTime.current = 0;
      }

      // ── Phase transitions ────────────────────────────────────────────────

      // Only start showcase from a genuine settled state (3 s of calm front-facing)
      if (showcasePhase.current === 0 && !dragged && settledTime.current > 3.0) {
        showcasePhase.current = 1;
        settledTime.current = 0;
        card.current?.wakeUp();
        card.current?.setAngvel({ x: ang.x, y: 0.45, z: ang.z }); // slow deliberate drift
      }

      if (showcasePhase.current === 1 && isNearBack && isCalm) {
        showcasePhase.current = 2;
        lingerTime.current = 0;
        card.current?.setAngvel({ x: ang.x, y: 0, z: ang.z });
      }

      if (showcasePhase.current === 2) {
        lingerTime.current += safeDelta;
        if (lingerTime.current > 2.5) showcasePhase.current = 3;
      }

      if (showcasePhase.current === 3 && isFacingFront) {
        showcasePhase.current = 0;
        settledTime.current = 0;
        card.current?.setAngvel({ x: 0, y: 0, z: 0 });
      }

      // If user drags during showcase, abort back to idle
      if (dragged && showcasePhase.current !== 0) {
        showcasePhase.current = 0;
        lingerTime.current = 0;
        settledTime.current = 0;
      }

      // ── Angular velocity each frame ──────────────────────────────────────
      // RULE: whenever the card is NOT in an active showcase phase (1 or 2),
      // ALWAYS apply a snap-to-front correction. This covers post-drag flicks too.
      let yVel;

      if (showcasePhase.current === 1) {
        // Drift to back — drive tapers as it arrives
        const taper = Math.max(0, 1 - absY / (Math.PI * 0.85));
        yVel = ang.y * 0.98 + 0.06 * taper * safeDelta * 60;

      } else if (showcasePhase.current === 2) {
        // Linger — brake hard, stay on back
        yVel = ang.y * 0.75;

      } else {
        // Coast freely while spinning fast (shows the back naturally after a flick).
        // Once speed bleeds off, a gentle-but-guaranteed correction pulls it home.
        // speedFade: 0 when spinning fast, ramps to 1 once nearly stopped
        const speedFade = Math.max(0, 1 - angSpeed * 0.9);
        const snapStr   = 0.18 * speedFade; // gentle enough to be slow, strong enough to always win
        yVel = (ang.y - yRot * snapStr) * 0.96;
      }

      card.current.setAngvel({
        x: ang.x * 0.85,
        y: yVel,
        z: ang.z * 0.85,
      });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              try { e.target.releasePointerCapture(e.pointerId); } catch (_) {}
              drag(false);
            }}
            onPointerCancel={() => drag(false)}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry} rotation={[0, Math.PI, 0]}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-colorSpace={THREE.SRGBColorSpace}
                clearcoat={0}
                clearcoatRoughness={0}
                roughness={1}
                metalness={0}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}