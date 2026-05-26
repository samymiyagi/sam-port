const links = [
  {
    href: 'mailto:jackspedicyteam@gmail.com',
    label: 'Email',
    value: 'jackspedicyteam@gmail.com',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 7L2 7"/>
      </svg>
    ),
  },
  {
    href: 'tel:09081840173',
    label: 'Phone',
    value: '0908-184-0173',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.95 12 19.79 19.79 0 0 1 1.95 3.3 2 2 0 0 1 3.92 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.09 15.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
      </svg>
    ),
  },
  {
    href: 'https://github.com/SAMUELSALVATIERRA24',
    label: 'GitHub',
    value: 'SAMUELSALVATIERRA24',
    target: '_blank',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100009681768076',
    label: 'Facebook',
    value: 'Samuel Salvatierra',
    target: '_blank',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="reveal">
          <p className="section-label">Get in touch</p>
          <h2 className="section-title">Contact</h2>
        </div>

        <div className="contact-inner">
          <div className="reveal reveal-delay-1">
            <p className="contact-blurb">
              I'm currently a student open to collaboration, projects, and opportunities. Whether
              you want to build something together or just say hi — my inbox is open.
            </p>
          </div>

          <div className="contact-links reveal reveal-delay-2">
            {links.map((l) => (
              <a
                key={l.label}
                className="contact-link"
                href={l.href}
                target={l.target}
                rel={l.target ? 'noopener noreferrer' : undefined}
              >
                <span className="link-icon">{l.icon}</span>
                <span className="link-text">
                  <strong>{l.label}</strong>
                  <span>{l.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
