/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, scale = 1, offsetX = 0, offsetY = 0, roughness = 1, metalness = 0 }) {
  const { scene, animations } = useGLTF(url);
  const ref = useRef();
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    // Play all animations (or just the first one)
    names.forEach((name) => actions[name]?.play());
    // Or to play just the first: actions[names[0]]?.play();
  }, [actions, names]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          if (mat.roughness !== undefined) mat.roughness = roughness;
          if (mat.metalness !== undefined) mat.metalness = metalness;
          mat.needsUpdate = true;
        });
      }
    });

    if (!ref.current) return;
    const box = new THREE.Box3().setFromObject(ref.current);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    ref.current.position.set(-centre.x, -centre.y, -centre.z);
  }, [scene, roughness, metalness]);

  return (
    <group position={[offsetX, offsetY, 0]}>
      <primitive ref={ref} object={scene} scale={scale} />
    </group>
  );
}

function Scene({ url, modelScale, offsetX, offsetY, roughness, metalness }) {
  const groupRef = useRef();
  const { gl } = useThree();

  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });
  const rotY = useRef(0);
  const rotX = useRef(0);
  const velY = useRef(0);
  const velX = useRef(0);

  useEffect(() => {
    const canvas = gl.domElement;
    const onDown = (e) => {
      dragging.current = true;
      prev.current = { x: e.clientX ?? e.touches?.[0]?.clientX, y: e.clientY ?? e.touches?.[0]?.clientY };
      velY.current = 0;
      velX.current = 0;
      canvas.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      const dx = x - prev.current.x;
      const dy = y - prev.current.y;
      velY.current = dx * 0.012;
      velX.current = dy * 0.008;
      rotY.current += velY.current;
      rotX.current = THREE.MathUtils.clamp(rotX.current + velX.current, -0.6, 0.6);
      prev.current = { x, y };
    };
    const onUp = () => {
      dragging.current = false;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    canvas.style.cursor = 'grab';
    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!dragging.current) {
      rotY.current += delta * 0.4;
      rotX.current += (0 - rotX.current) * 0.06;
      velY.current *= 0.92;
      velX.current *= 0.92;
    }
    groupRef.current.rotation.y = rotY.current;
    groupRef.current.rotation.x = rotX.current;
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <Model
          url={url}
          scale={modelScale}
          offsetX={offsetX}
          offsetY={offsetY}
          roughness={roughness}
          metalness={metalness}
        />
      </Suspense>
    </group>
  );
}

function Loader() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'transparent',
      fontFamily: 'var(--mono)', fontSize: '0.7rem',
      color: 'var(--accent)', letterSpacing: '0.1em',
    }}>
      LOADING...
    </div>
  );
}

export default function ModelViewer({
  url,
  modelScale = 1,
  cameraZ = 3,
  offsetX = 0,
  offsetY = 0,
  envPreset = 'apartment',
  envIntensity = 2.5,
  exposure = 1.0,
  roughness = 1,
  metalness = 0,
}) {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!ready && <Loader />}
      <Canvas
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
        camera={{ position: [0, 0, cameraZ], fov: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.NeutralToneMapping,
          toneMappingExposure: exposure,
        }}
        onCreated={() => setReady(true)}
      >
        <Scene
          url={url}
          modelScale={modelScale}
          offsetX={offsetX}
          offsetY={offsetY}
          roughness={roughness}
          metalness={metalness}
        />
        <Environment
          preset={envPreset}
          environmentIntensity={envIntensity}
          backgroundBlurriness={1}
        />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.3}
          scale={6}
          blur={2.5}
          far={3}
        />
      </Canvas>
     <div style={{
  position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
  fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgb(31, 186, 132)',
  letterSpacing: '0.08em', pointerEvents: 'none', whiteSpace: 'nowrap',
}}>
  DRAG TO ROTATE
</div>
    </div>
  );
}