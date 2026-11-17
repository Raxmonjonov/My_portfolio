import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Layers,
  Server,
  Zap,
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  Cpu,
  Briefcase,
  GraduationCap,
  Globe
} from 'lucide-react';
import { portfolioData } from './data/portfolio';
import { translations } from './data/translations';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--border-color)',
  color: '#fff',
  fontSize: '0.95rem',
  outline: 'none',
  fontFamily: 'inherit'
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio_lang') || 'uz');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const t = translations[lang] || translations.uz;

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const encode = (data) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    const emailSubject =
      formState.subject ||
      (lang === 'uz'
        ? 'Portfolio orqali yangi mijoz / taklif'
        : lang === 'ru'
          ? 'Новое сообщение из портфолио'
          : 'New inquiry from Portfolio');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formState, subject: emailSubject })
      });

      fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, subject: emailSubject, targetEmail: portfolioData.socials.email })
      }).catch(() => {});

      fetch(`https://formsubmit.co/ajax/${portfolioData.socials.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `[Portfolio] ${formState.name}: ${emailSubject}`,
          _template: 'box',
          _captcha: 'false',
          Ism: formState.name,
          Email: formState.email,
          Mavzu: emailSubject,
          Til: lang.toUpperCase(),
          Xabar: formState.message,
          Yuborilgan_vaqt: new Date().toLocaleString()
        })
      }).catch(() => {});

      setStatusMsg({ type: 'success', text: t.contact.form.successMsg });
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatusMsg({ type: 'success', text: t.contact.form.successMsg });
      setFormState({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#services', label: t.nav.services },
    { href: '#projects', label: t.nav.projects }
  ];

  const skillGroups = [
    {
      title: t.skills.backendTitle,
      items: portfolioData.skills.backend,
      icon: <Server size={22} color="#a78bfa" />,
      gradient: 'linear-gradient(90deg, #8b5cf6, #a78bfa)'
    },
    {
      title: t.skills.frontendTitle,
      items: portfolioData.skills.frontend,
      icon: <Code2 size={22} color="#60a5fa" />,
      gradient: 'linear-gradient(90deg, #3b82f6, #60a5fa)'
    },
    {
      title: t.skills.toolsTitle,
      items: portfolioData.skills.tools,
      icon: <Cpu size={22} color="#34d399" />,
      gradient: 'linear-gradient(90deg, #10b981, #34d399)'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background ambient orbs */}
      <div
        className="glow-circle"
        style={{ top: '5%', left: '10%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.15)' }}
      />
      <div
        className="glow-circle"
        style={{ top: '40%', right: '5%', width: '500px', height: '500px', background: 'rgba(139, 92, 246, 0.12)' }}
      />

      {/* Navigation Header */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(10, 12, 16, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <a
            href="#"
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              textDecoration: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Terminal size={20} />
            </div>
            <span>
              Raxmonjonov<span style={{ color: '#38bdf8' }}>.dev</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="desktop-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: '0.2s' }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '3px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                gap: '2px'
              }}
            >
              {['uz', 'en', 'ru'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleLangChange(item)}
                  style={{
                    border: 'none',
                    background: lang === item ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                    color: lang === item ? '#fff' : 'var(--text-muted)',
                    padding: '4px 10px',
                    borderRadius: '7px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500, padding: '6px 0' }}
              >
                {item.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
              {['uz', 'en', 'ru'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleLangChange(item)}
                  style={{
                    border: '1px solid var(--border-color)',
                    background: lang === item ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'rgba(255,255,255,0.04)',
                    color: lang === item ? '#fff' : 'var(--text-muted)',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ marginTop: '8px' }}
            >
              {t.nav.contact}
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header
        id="about"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '90px 24px 70px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ maxWidth: '880px' }}>
          <div className="badge" style={{ marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            {t.hero.status}
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}
          >
            {t.hero.greeting}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {t.hero.name}
            </span>
            .<br />
            {t.hero.title}.
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '36px',
              lineHeight: 1.75,
              maxWidth: '740px'
            }}
          >
            {t.hero.subtitle}. {t.hero.bio}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <a href="#projects" className="btn-primary">
              <Sparkles size={18} /> {t.hero.viewProjects}
            </a>
            <a href="#contact" className="btn-secondary">
              <Mail size={18} /> {t.hero.contactMe}
            </a>
            <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="btn-secondary">
              <GithubIcon size={18} /> GitHub
            </a>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '24px',
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa' }}>{portfolioData.personal.experienceYears}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.hero.metrics.experience}</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a78bfa' }}>{portfolioData.personal.projectsCount}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.hero.metrics.projects}</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>{portfolioData.personal.satisfactionRate}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.hero.metrics.satisfaction}</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>{t.hero.metrics.locationVal}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.hero.metrics.location}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Experience & Education Section */}
      <section id="experience" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>{t.experience.badge}</span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800 }}>{t.experience.title}</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '24px'
          }}
        >
          {t.experience.items.map((item, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: item.type === 'work' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                    color: item.type === 'work' ? '#60a5fa' : '#a78bfa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.type === 'work' ? <Briefcase size={22} /> : <GraduationCap size={22} />}
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {item.period}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.role}</h3>
                </div>
              </div>
              <div style={{ fontSize: '0.92rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '8px' }}>{item.org}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Languages Strip */}
        <div
          className="glass-panel"
          style={{
            padding: '22px 28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
            <Globe size={20} color="#34d399" />
            <span>{t.experience.langTitle}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {t.experience.languages.map((langItem, i) => (
              <span
                key={i}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  color: '#e2e8f0'
                }}
              >
                <strong>{langItem.name}</strong> — <span style={{ color: 'var(--text-muted)' }}>{langItem.level}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>{t.services.badge}</span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800 }}>{t.services.title}</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}
        >
          {t.services.items.map((srv, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                {idx === 0 && <Server size={24} />}
                {idx === 1 && <Layers size={24} />}
                {idx === 2 && <Code2 size={24} />}
                {idx === 3 && <Zap size={24} />}
              </div>
              <h3 style={{ fontSize: '1.22rem', fontWeight: 700, marginBottom: '12px' }}>{srv.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{srv.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>{t.skills.badge}</span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800 }}>{t.skills.title}</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {skillGroups.map((group, gIdx) => (
            <div key={gIdx} className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {group.icon} {group.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {group.items.map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
                      <span>{item.name}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{item.level}</span>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: item.level, height: '100%', background: group.gradient, borderRadius: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>{t.projects.badge}</span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800 }}>{t.projects.title}</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>{t.projects.subtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {portfolioData.projects.map((proj) => {
            const localized = t.projects.items[proj.id] || { title: proj.id, description: '' };
            return (
              <div
                key={proj.id}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <Layers size={20} color="#38bdf8" />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: 'var(--text-muted)', transition: '0.2s', padding: '6px' }}
                          title={t.projects.viewCode}
                        >
                          <GithubIcon size={18} />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#60a5fa', transition: '0.2s', padding: '6px' }}
                          title={t.projects.viewLive}
                        >
                          <ArrowUpRight size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>
                    {localized.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    {localized.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#94a3b8',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 100px', width: '100%' }}>
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(28px, 5vw, 56px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge" style={{ marginBottom: '16px' }}>{t.contact.badge}</span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '16px' }}>{t.contact.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
              {t.contact.subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
                  <Mail size={20} />
                </div>
                <a href={`mailto:${portfolioData.socials.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {portfolioData.socials.email}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                  <Phone size={20} />
                </div>
                <a href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {portfolioData.personal.phone}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                  <MapPin size={20} />
                </div>
                <span>{portfolioData.personal.location}</span>
              </div>
            </div>
          </div>

          <div>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleContactSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              <input type="hidden" name="form-name" value="contact" />

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {t.contact.form.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t.contact.form.namePlaceholder}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {t.contact.form.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t.contact.form.emailPlaceholder}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {t.contact.form.subjectLabel}
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder={t.contact.form.subjectPlaceholder}
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {t.contact.form.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder={t.contact.form.messagePlaceholder}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {statusMsg && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: `1px solid ${statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: statusMsg.type === 'success' ? '#34d399' : '#f87171',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                {submitting ? t.contact.form.submitting : <><Send size={18} /> {t.contact.form.submitBtn}</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid var(--border-color)',
          padding: '32px 24px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            © {new Date().getFullYear()} {portfolioData.personal.name}. {t.footer.rights}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub</a>
            <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LinkedIn</a>
            <a href={portfolioData.socials.telegram} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Telegram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
