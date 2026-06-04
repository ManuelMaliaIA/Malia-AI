const { useState, useEffect, useRef, useMemo } = React;

const WHATSAPP = 'https://wa.me/34611459336?text=Hola%2C%20me%20interesa%20el%20diagn%C3%B3stico%20gratuito%20de%20Malia';

/* ============================================================
   Reveal-on-scroll
============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const d = parseInt(e.target.dataset.delay || '0', 10);
            setTimeout(() => e.target.classList.add('in'), d);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   Character-by-character entrance
============================================================ */
function AnimatedHeadline({ lines, initialDelay = 200, perChar = 30, className = '' }) {
  const flat = useMemo(() => {
    const out = [];
    lines.forEach((ln, li) => {
      [...ln].forEach((ch) => out.push({ ch, br: false }));
      if (li < lines.length - 1) out.push({ ch: '', br: true });
    });
    return out;
  }, [lines]);

  const [shown, setShown] = useState(0);
  useEffect(() => {
    let t;
    const tick = (i) => {
      if (i > flat.length) return;
      setShown(i);
      t = setTimeout(() => tick(i + 1), perChar);
    };
    const start = setTimeout(() => tick(1), initialDelay);
    return () => { clearTimeout(start); clearTimeout(t); };
  }, [flat, initialDelay, perChar]);

  return (
    <h1 className={className} aria-label={lines.join(' ')}>
      {flat.map((item, i) => {
        if (item.br) return <br key={i} />;
        const c = item.ch === ' ' ? ' ' : item.ch;
        return <span key={i} className={'char ' + (i < shown ? 'in' : '')}>{c}</span>;
      })}
    </h1>
  );
}

/* ============================================================
   SVG ICON SET (outline, inline)
============================================================ */
function Icon({ name, className = '', style }) {
  const common = {
    className, style,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  switch (name) {
    case 'chat':
      return (<svg {...common}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>);
    case 'search':
      return (<svg {...common}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
    case 'clock':
      return (<svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case 'grid':
      return (<svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>);
    case 'help-chart':
      return (<svg {...common}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>);
    case 'trending':
      return (<svg {...common}><polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/></svg>);
    case 'ear':
      return (<svg {...common}><path d="M6 8.5a6 6 0 0112 0c0 3-2 4-2 6a3 3 0 01-3 3"/><path d="M6 8.5a3 3 0 016 0"/><path d="M6 14v1a4 4 0 002 3.5"/></svg>);
    case 'lens':
      return (<svg {...common}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>);
    case 'rocket':
      return (<svg {...common}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 014-9 11.5 11.5 0 015 5 22 22 0 01-9 4z"/><path d="M9 12H4s.55-3.03 2-4a4.5 4.5 0 013 0"/><path d="M12 15v5s3.03-.55 4-2a4.5 4.5 0 000-3"/></svg>);
    case 'pin':
      return (<svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>);
    case 'speak':
      return (<svg {...common}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/><line x1="8" y1="10" x2="14" y2="10"/><line x1="8" y1="13" x2="12" y2="13"/></svg>);
    case 'target':
      return (<svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>);
    case 'cycle':
      return (<svg {...common}><path d="M3 12a9 9 0 0115-6.7L21 8"/><polyline points="21 3 21 8 16 8"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/><polyline points="3 21 3 16 8 16"/></svg>);
    case 'whatsapp':
      return (<svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.523 5.36l-.999 3.648 3.965-1.027z"/></svg>);
    case 'arrow':
      return (<svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case 'arrow-sm':
      return (<svg {...common}><path d="M5 10h10M11 6l4 4-4 4"/></svg>);
    case 'mark':
      return (<svg {...common}><path d="M4 10.5l4 4 8-9"/></svg>);
    case 'restaurant':
      return (<svg {...common}><path d="M3 2v7a3 3 0 003 3v10"/><path d="M6 2v6"/><path d="M9 2v6"/><path d="M17 2c-1.5 0-3 2-3 5s1 4 1 4v9"/><path d="M17 2c1.5 0 3 2 3 5s-1 4-1 4"/></svg>);
    case 'folder':
      return (<svg {...common}><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>);
    case 'briefcase':
      return (<svg {...common}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>);
    case 'menu':
      return (<svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>);
    case 'close':
      return (<svg {...common}><path d="M6 6l12 12M18 6L6 18"/></svg>);
    case 'mail':
      return (<svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>);
    case 'webspark':
      return (<svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><circle cx="6" cy="6.5" r=".6" fill="currentColor" stroke="none"/><circle cx="8.5" cy="6.5" r=".6" fill="currentColor" stroke="none"/><path d="M12 16l1-2.2 2.2-1-2.2-1L12 9.6l-1 2.2-2.2 1 2.2 1z"/></svg>);
    case 'linkedin':
      return (<svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34V9.99H5.67v8.35h2.67zM7 8.8a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zm11.34 9.54v-4.58c0-2.45-1.31-3.59-3.06-3.59a2.64 2.64 0 00-2.39 1.31v-1.13h-2.67v8.35h2.67v-4.41c0-.23.02-.46.09-.62.18-.46.6-.94 1.31-.94.92 0 1.29.7 1.29 1.73v4.24h2.66z"/></svg>);
    default:
      return null;
  }
}

/* ============================================================
   NAV
============================================================ */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);

  const links = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#casos', label: 'Casos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 pt-4">
      <nav
        className={`liquid-glass rounded-2xl mx-auto max-w-7xl flex items-center justify-between
          px-4 md:px-6 lg:px-8 py-3 transition-all duration-300 ${scrolled ? 'shadow-2xl' : ''}`}
        aria-label="Principal"
      >
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="Malia — inicio">
          <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/95">
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0A4B78" />
                  <stop offset="1" stopColor="#2A9D8F" />
                </linearGradient>
              </defs>
              <path d="M3 17 Q 7 11, 12 14 T 21 12" stroke="url(#lg1)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="8" r="2" fill="#F4A259" />
            </svg>
          </span>
          <span className="text-2xl font-semibold tracking-tight text-white text-shadow-soft">Malia</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/85 hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* [1] Botón CTA navbar en naranja para más calidez */}
          <a href="#contacto" className="hidden sm:inline-flex items-center gap-2 bg-secondary hover:bg-[#e8913a] text-white rounded-lg px-5 py-2 text-sm font-medium transition-all">
            Diagnóstico gratis
            <Icon name="arrow-sm" className="w-3.5 h-3.5" />
          </a>
          <button className="md:hidden text-white p-2 rounded-lg hover:bg-white/10" onClick={() => setOpen((s) => !s)} aria-label="Abrir menú">
            <Icon name={open ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl liquid-glass rounded-2xl p-4 flex flex-col gap-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 py-2">{l.label}</a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="bg-secondary text-white rounded-lg px-5 py-2 text-center font-medium mt-1">Diagnóstico gratis</a>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <div className="hero-stage">
        <img
          src="/assets/hero-barbate.png"
          alt="Vista aérea de la playa de Barbate al atardecer con edificios blancos y agua turquesa"
          className="hero-img"
        />
        <div className="hero-shimmer" aria-hidden="true"></div>
      </div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-10 lg:pb-16 px-6 md:px-12 lg:px-16 pt-32">
        <div className="absolute top-28 left-6 md:left-12 lg:left-16 flex items-center gap-3 reveal" data-delay="100">
          <span className="liquid-glass rounded-full px-3 py-1.5 inline-flex items-center gap-2 text-white/95 text-xs">
            <span className="relative inline-flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-70"></span>
              <span className="relative w-2 h-2 rounded-full bg-emerald-300"></span>
            </span>
            <span className="chip-mono">DESDE BARBATE · CÁDIZ</span>
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-9">
            <AnimatedHeadline
              lines={["Si tu negocio puede ir mejor,", "nosotros sabemos cómo."]}
              className="text-white text-shadow-strong mb-5
                text-[9vw] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl
                font-normal leading-[0.98] tracking-[-0.04em]"
            />

            <p className="reveal text-white/95 text-shadow-soft text-base md:text-lg mb-7 max-w-2xl leading-relaxed" data-delay="800" style={{ transitionDuration: '1000ms' }}>
              Somos una consultoría de Inteligencia Artificial en Barbate. Analizamos tu negocio, encontramos lo que te frena y lo ponemos en marcha. Sin tecnicismos.
            </p>

            <div className="reveal flex flex-wrap gap-3 md:gap-4" data-delay="1200" style={{ transitionDuration: '1000ms' }}>
              <a href={WHATSAPP} className="inline-flex items-center gap-2 bg-secondary hover:bg-[#e8913a] text-white px-7 md:px-8 py-3 rounded-lg font-medium text-base transition-all duration-300 shadow-lg hover:scale-[1.02]">
                <Icon name="whatsapp" className="w-4 h-4" />
                Quiero mi diagnóstico gratuito
              </a>
              <a href="#como-funciona" className="liquid-glass inline-flex items-center gap-2 text-white px-7 md:px-8 py-3 rounded-lg font-medium text-base hover:bg-white hover:text-black transition-all duration-300">
                Ver cómo funciona
                <Icon name="arrow-sm" className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* [2] Tarjeta Powered by IA con cierre visual */}
          <div className="lg:col-span-3 mt-8 lg:mt-0 flex lg:justify-end">
            <div className="reveal liquid-glass rounded-2xl px-6 py-5 text-white max-w-xs w-full" data-delay="1400" style={{ transitionDuration: '1000ms' }}>
              <div className="text-[10px] uppercase tracking-[0.22em] opacity-80 mb-2 chip-mono">Powered by IA</div>
              <div className="text-xl md:text-2xl font-light leading-tight tracking-[-0.01em]">
                Inteligencia Artificial aplicada a tu negocio
              </div>
              <ul className="mt-4 space-y-2">
                {['Agentes IA activos', 'Automatizaciones en marcha', 'Soluciones a medida'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/90">
                    <span className="relative inline-flex w-2 h-2 flex-shrink-0">
                      <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-70"></span>
                      <span className="relative w-2 h-2 rounded-full bg-emerald-300"></span>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-white/15">
                <a href="#contacto" className="w-full flex items-center justify-center gap-2 bg-secondary/90 hover:bg-secondary rounded-lg py-2 text-xs font-semibold chip-mono uppercase tracking-wider transition-colors">
                  Diagnóstico gratis
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-12 flex items-center gap-3 text-white/70 text-xs" data-delay="1700" style={{ transitionDuration: '1000ms' }}>
          <span className="chip-mono uppercase">Desliza</span>
          <span className="w-12 h-px bg-white/40"></span>
          <span className="text-white/60">Lo que podemos resolver por ti</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SOLUCIONES — Creamos soluciones con IA a medida
============================================================ */
function Dolor() {
  const sols = [
    { icon: 'clock',    circle: false, color: 'primary', t: 'Agente de reservas',              d: 'Gestiona citas y reservas solo, sin que tengas que intervenir.' },
    { icon: 'chat',     circle: true,  color: 'accent',  t: 'Asistente de atención al cliente', d: 'Responde preguntas, resuelve dudas y atiende a tus clientes a cualquier hora.' },
    { icon: 'cycle',    circle: false, color: 'primary', t: 'Automatización de procesos',       d: 'Lo que haces a mano cada día, funcionando solo.' },
    { icon: 'webspark', circle: true,  color: 'accent',  t: 'Web inteligente',                  d: 'Presencia online que trabaja por ti y aparece en Google.' },
    { icon: 'trending', circle: false, color: 'primary', t: 'SaaS a medida',                    d: 'Tu propia herramienta en la nube, hecha para tu negocio y nadie más.' },
  ];

  const Card = ({ s, i }) => (
    <article
      className="reveal group bg-white border border-black/[0.06] rounded-2xl p-6 lg:p-7
                 hover:-translate-y-1 hover:shadow-xl transition-all duration-300
                 shadow-[0_8px_30px_-16px_rgba(10,75,120,0.15)]"
      data-delay={i * 100}
    >
      {/* [6] Formas alternadas: círculo vs cuadrado redondeado */}
      <span className={`inline-flex w-12 h-12 items-center justify-center mb-5
        ${s.circle ? 'rounded-full' : 'rounded-xl'}
        ${s.color === 'accent' ? 'bg-accent/[0.12]' : 'bg-primary/[0.08]'}`}>
        <Icon name={s.icon} className="w-6 h-6" style={{ color: s.color === 'accent' ? 'var(--accent)' : 'var(--primary)' }} />
      </span>
      <h3 className="text-lg font-semibold text-ink mb-2 tracking-[-0.01em]">{s.t}</h3>
      <p className="text-[15px] text-gray-600 leading-relaxed">{s.d}</p>
    </article>
  );

  return (
    <section className="relative bg-gradient-to-b from-white to-[#F8F9FA] py-20 lg:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 lg:mb-16">
          <div className="overline text-xs uppercase font-medium text-accent mb-4 reveal">Lo que podemos construir</div>
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-[-0.02em] leading-[1.05]" data-delay="80">
            Creamos soluciones con IA a medida de tu negocio.
          </h2>
          <p className="reveal text-muted text-base md:text-lg mt-5 max-w-2xl mx-auto" data-delay="160">
            Esto es solo una muestra de lo que podemos construir para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {sols.slice(0, 3).map((s, i) => <Card key={i} s={s} i={i} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mt-5 lg:mt-6 lg:w-2/3 mx-auto">
          {sols.slice(3).map((s, i) => <Card key={i} s={s} i={i} />)}
        </div>

        <p className="reveal text-center text-lg md:text-xl text-gray-700 mt-12 max-w-2xl mx-auto italic" data-delay="160">
          ¿No ves tu problema aquí? Cuéntanoslo igualmente. <span className="text-ink font-medium not-italic">Si tiene solución, la construimos.</span>
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   CÓMO FUNCIONA — 3 pasos timeline
============================================================ */
function ComoFunciona() {
  const steps = [
    { n: '01', icon: 'ear',    title: 'Te escuchamos',        body: 'Nos reunimos contigo, en tu negocio o por videollamada. Sin formularios raros ni presentaciones de PowerPoint.' },
    { n: '02', icon: 'lens',   title: 'Analizamos',           body: 'Miramos qué está frenando tu negocio y te explicamos exactamente qué se puede mejorar y cuánto te puede suponer.' },
    { n: '03', icon: 'rocket', title: 'Lo ponemos en marcha', body: 'Ejecutamos, lo dejamos funcionando y te acompañamos. No entregamos informes — entregamos resultados.' },
  ];

  return (
    <section id="como-funciona" className="relative py-20 lg:py-28 px-6 md:px-12 bg-white overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="overline text-xs uppercase font-medium text-accent mb-4 reveal">Cómo trabajamos</div>
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-[-0.02em] leading-[1.05]" data-delay="80">
            Así trabajamos.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 relative">
          {/* [4] Línea conectora más visible con naranja */}
          <div aria-hidden="true" className="hidden md:block absolute top-[44px] left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-secondary/30 via-secondary/60 to-secondary/30 rounded-full"></div>

          {steps.map((s, i) => (
            <div key={i} className="reveal relative" data-delay={i * 140}>
              {/* Conector vertical en móvil */}
              {i < steps.length - 1 && (
                <div aria-hidden="true" className="md:hidden absolute left-11 top-[88px] w-0.5 h-8 bg-gradient-to-b from-secondary/50 to-transparent"></div>
              )}
              <div className="flex md:flex-col items-start gap-4">
                <span className="relative z-10 w-[88px] h-[88px] rounded-2xl bg-white border-2 border-secondary/20 shadow-[0_8px_30px_-16px_rgba(244,162,89,0.4)] flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon} className="w-9 h-9" style={{ color: 'var(--primary)' }} />
                  {/* [1] Badge naranja más visible */}
                  <span className="absolute -top-3 -right-3 chip-mono text-[11px] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md" style={{ background: 'var(--secondary)' }}>{s.n}</span>
                </span>
              </div>
              <div className="mt-5">
                <h3 className="text-xl font-semibold text-ink mb-2 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 liquid-glass-light rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-5" data-delay="120">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
            <Icon name="mark" className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] uppercase chip-mono tracking-widest text-primary/70">El primer paso es gratis</div>
            <div className="text-ink text-[15px] mt-1">El diagnóstico no te cuesta nada. Si lo que vemos no te compensa, te lo decimos claro y no pasa nada.</div>
          </div>
          <a href="#contacto" className="chip-mono text-[11px] uppercase text-white bg-primary rounded-lg px-4 py-2.5 hover:bg-primary/85 transition-colors whitespace-nowrap">Pedir diagnóstico</a>
        </div>
      </div>
      {/* [3] Transición suave hacia la siguiente sección */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#F8F9FA] pointer-events-none" aria-hidden="true" />
    </section>
  );
}

/* ============================================================
   STATS STRIP — franja visual con foto de fondo
============================================================ */
function StatsStrip() {
  const stats = [
    { n: '45 min', label: 'Para saber exactamente qué puede mejorar en tu negocio' },
    { n: '24/7',   label: 'Tus clientes atendidos, aunque estés durmiendo' },
    { n: '0€',     label: 'El diagnóstico, sin coste ni compromiso' },
  ];
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Foto de fondo con overlay oscuro */}
      <div className="absolute inset-0">
        <img src="/assets/hero-barbate.png" alt="" className="w-full h-full object-cover object-center" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,47,77,0.92) 0%, rgba(10,75,120,0.88) 100%)' }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-white text-center">
          {stats.map((s, i) => (
            <div key={i} className="reveal" data-delay={i * 120}>
              <div className="text-5xl md:text-6xl font-bold tracking-[-0.03em] mb-3" style={{ color: 'var(--secondary)' }}>{s.n}</div>
              <p className="text-white/75 text-[15px] leading-snug max-w-[200px] mx-auto">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SOLUCIONES QUE CONSTRUIMOS
============================================================ */
function Casos() {
  const casos = [
    {
      icon: 'clock',
      badge: 'Hostelería',
      title: 'Tu restaurante lleno, sin coger el teléfono',
      body: 'Un agente de IA gestiona tus reservas solo. Recibe la petición, comprueba disponibilidad, confirma la mesa y recuerda la cita al cliente automáticamente. Sin llamadas perdidas, sin errores, sin que tengas que intervenir.',
      stat: '24/7',
      statLabel: 'gestionando reservas',
    },
    {
      icon: 'webspark',
      badge: 'Cualquier negocio',
      title: 'Que te encuentren antes que a la competencia',
      body: 'Una web rápida, bonita y optimizada para Google. Adaptada a tu negocio, con todo lo que tu cliente necesita encontrar. Visible para cualquiera que busque lo que tú ofreces en Barbate y la costa de Cádiz.',
      stat: '+visibilidad',
      statLabel: 'en Google',
    },
    {
      icon: 'cycle',
      badge: 'Cualquier negocio',
      title: 'Tu negocio funcionando solo mientras tú te dedicas a lo importante',
      body: 'Presupuestos, facturas, recordatorios, respuestas automáticas, gestión de clientes… Construimos la herramienta exacta que necesita tu negocio para que todo ocurra solo, sin que toques nada. Da igual el sector.',
      stat: '0',
      statLabel: 'intervención manual',
    },
  ];

  return (
    <section id="casos" className="relative pt-20 lg:pt-28 pb-12 lg:pb-16 px-6 md:px-12 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="overline text-xs uppercase font-medium text-accent mb-4 reveal">Lo que construimos</div>
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-[-0.02em] leading-[1.05]" data-delay="80">
            Soluciones que construimos con IA.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {casos.map((c, i) => (
            <article
              key={i}
              className="reveal bg-white rounded-2xl p-7 lg:p-8 border border-black/[0.06] shadow-[0_8px_30px_-16px_rgba(10,75,120,0.15)] flex flex-col hover:-translate-y-1 transition-all duration-300"
              data-delay={i * 120}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex w-12 h-12 rounded-full bg-primary/[0.08] items-center justify-center">
                  <Icon name={c.icon} className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                </span>
                <span className="chip-mono text-[10px] uppercase tracking-widest text-accent bg-accent/[0.12] rounded-full px-3 py-1.5">{c.badge}</span>
              </div>

              <h3 className="text-xl font-semibold text-ink mb-3 leading-snug tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">{c.body}</p>

              <div className="mt-6 pt-5 border-t border-black/[0.06]">
                <div className="text-3xl md:text-4xl font-semibold text-primary tracking-[-0.03em] leading-none">{c.stat}</div>
                <div className="text-[13px] text-muted mt-2">{c.statLabel}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-12 text-center" data-delay="160">
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            ¿No ves tu caso aquí? Cuéntanoslo. <span className="text-ink font-medium">Si tiene solución, la construimos.</span>
          </p>
          <a href={WHATSAPP} className="inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-lg font-medium hover:scale-[1.02] transition-all" style={{ background: 'var(--primary)' }}>
            <Icon name="whatsapp" className="w-4 h-4" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
      {/* [3] Transición suave */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white pointer-events-none" aria-hidden="true" />
    </section>
  );
}

/* ============================================================
   PROFILE PHOTO — con fallback a iniciales
============================================================ */
function ProfilePhoto() {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-2xl font-semibold select-none"
           style={{ background: 'linear-gradient(135deg, #0A4B78, #2A9D8F)' }}>
        MM
      </div>
    );
  }
  return (
    <img
      src="/assets/profile.jpg"
      alt="Manuel Malia"
      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
      onError={() => setError(true)}
    />
  );
}

/* ============================================================
   QUIÉNES SOMOS — LinkedIn profile card
============================================================ */
function Quienes() {
  return (
    <section className="relative pt-12 lg:pt-16 pb-10 lg:pb-14 px-6 md:px-12 bg-white overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="overline text-xs uppercase font-medium text-accent mb-4 reveal">El equipo</div>
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-[-0.02em] leading-[1.05]" data-delay="80">
            ¿Quién hay detrás de Malia?
          </h2>
        </div>

        <div className="reveal max-w-xl mx-auto" data-delay="160">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(10,75,120,0.18)] border border-black/[0.06] overflow-hidden">

            <div className="h-24 relative overflow-hidden">
              <img src="/assets/banner-linkedin.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
            </div>

            <div className="px-6 pb-6">
              <div className="relative -mt-10 mb-3 inline-flex">
                <ProfilePhoto />
                <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-[#0A66C2] flex items-center justify-center border-2 border-white">
                  <Icon name="linkedin" className="w-3 h-3 text-white" />
                </span>
              </div>

              <h3 className="text-xl font-semibold text-ink tracking-[-0.01em] leading-tight">Manuel Malia</h3>
              <p className="text-[15px] text-gray-600 mt-0.5 leading-snug">
                Consultor de IA &amp; Tecnología · Fundador de Malia
              </p>

              <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-gray-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/>
                </svg>
                <span>Ingeniería de Software · Universidad Loyola Andalucía</span>
              </div>

              <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-muted">
                <Icon name="pin" className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                <span>Barbate, Cádiz, España</span>
              </div>

              <div className="my-4 h-px bg-black/[0.06]" />

              <p className="text-[14px] text-gray-600 leading-relaxed">
                Ayudo a negocios locales a crecer con tecnología. Sin tecnicismos, sin oficinas en Madrid.
                Si tienes un problema, lo analizamos juntos y lo resolvemos.
              </p>

              <div className="flex gap-3 mt-5">
                <a
                  href="https://www.linkedin.com/in/manuel-malia-vidal-921778224/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#0958a8] text-white rounded-full py-2 text-[14px] font-semibold transition-colors"
                >
                  <Icon name="linkedin" className="w-4 h-4" />
                  Ver perfil en LinkedIn
                </a>
                <a
                  href={WHATSAPP}
                  className="flex items-center justify-center gap-2 border border-black/[0.18] hover:border-primary hover:text-primary text-ink rounded-full px-4 py-2 text-[14px] font-semibold transition-colors"
                >
                  <Icon name="whatsapp" className="w-4 h-4" />
                  Escríbeme
                </a>
              </div>
            </div>
          </div>

          <p className="text-center text-[13px] text-muted mt-4">
            No somos una agencia anónima. <span className="text-ink font-medium">Tienes mi número y te cojo el teléfono.</span>
          </p>
        </div>

      </div>
    </section>
  );
}

/* ============================================================
   POR QUÉ MALIA
============================================================ */
function PorQue() {
  const items = [
    { icon: 'pin',    k: 'Somos de aquí',                    v: 'No somos una agencia de Madrid. Pisamos tu negocio y conocemos tu realidad.' },
    { icon: 'speak',  k: 'Hablamos en persona, no en técnico', v: 'Te explicamos todo con palabras normales. Si no lo entiendes, es culpa nuestra.' },
    { icon: 'target', k: 'Empezamos por lo que más duele',    v: 'No te montamos diez cosas a la vez. Atacamos primero lo que más te frena.' },
    { icon: 'cycle',  k: 'No desaparecemos al terminar',      v: 'Seguimos contigo, ajustamos y te proponemos el siguiente paso.' },
  ];

  return (
    <section className="relative pt-10 lg:pt-14 pb-20 lg:pb-28 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="overline text-xs uppercase font-medium text-accent mb-4 reveal">Por qué Malia</div>
            <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-[-0.02em] leading-[1.05]" data-delay="80">
              Por qué los negocios de Barbate confían en nosotros.
            </h2>
            <p className="reveal text-muted text-base md:text-lg mt-5 leading-relaxed" data-delay="160">
              No vendemos tecnología por vender. Resolvemos lo que te frena, te lo explicamos claro y nos quedamos cerca.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 lg:gap-5">
            {items.map((it, i) => (
              <div key={i} className="reveal bg-paper rounded-2xl p-6 border border-black/[0.05] hover:-translate-y-1 hover:shadow-md transition-all duration-300" data-delay={i * 90}>
                <span className="inline-flex w-11 h-11 rounded-full bg-accent/[0.12] items-center justify-center mb-4">
                  <Icon name={it.icon} className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                </span>
                <h3 className="text-lg font-semibold text-ink mb-1.5 tracking-[-0.01em]">{it.k}</h3>
                <p className="text-[14px] text-muted leading-relaxed">{it.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA FINAL — [5] más impactante
============================================================ */
function CTAFinal() {
  return (
    <section id="contacto" className="relative py-24 lg:py-36 px-6 md:px-12 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #072f4d 0%, #0A4B78 50%, #0d6494 100%)' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1.2px)',
        backgroundSize: '24px 24px'
      }} aria-hidden="true"></div>
      {/* Glow naranja decorativo */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'var(--secondary)' }} aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto text-center">
        {/* [1] Overline naranja */}
        <div className="overline text-xs uppercase font-medium mb-5 reveal chip-mono" style={{ color: 'var(--secondary)' }}>Diagnóstico gratuito</div>
        <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]" data-delay="80">
          El diagnóstico es gratuito<br />
          <span style={{ color: 'var(--secondary)' }}>y sin compromiso.</span>
        </h2>
        <p className="reveal text-white/80 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed" data-delay="160">
          En 45 minutos te decimos exactamente qué puede mejorar en tu negocio y cómo. Sin rodeos.
        </p>
        <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" data-delay="240">
          <a href={WHATSAPP} className="inline-flex items-center gap-2.5 bg-secondary hover:bg-[#e8913a] text-white px-10 py-4 rounded-xl font-semibold text-lg hover:scale-[1.03] transition-all shadow-[0_8px_32px_-8px_rgba(244,162,89,0.6)]">
            <Icon name="whatsapp" className="w-5 h-5" />
            Quiero mi diagnóstico gratuito
          </a>
          <a href={`mailto:manuelmaliaempr@gmail.com`} className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <Icon name="mail" className="w-4 h-4" />
            manuelmaliaempr@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER — [7] más presencia visual
============================================================ */
function Footer() {
  return (
    <footer className="relative bg-ink text-white pt-16 lg:pt-20 pb-10 px-6 md:px-12 overflow-hidden topo">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            {/* Logo más grande */}
            <div className="flex items-center gap-3 mb-5">
              <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/95">
                <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                  <defs>
                    <linearGradient id="lg-footer" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#0A4B78" />
                      <stop offset="1" stopColor="#2A9D8F" />
                    </linearGradient>
                  </defs>
                  <path d="M3 17 Q 7 11, 12 14 T 21 12" stroke="url(#lg-footer)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  <circle cx="12" cy="8" r="2" fill="#F4A259" />
                </svg>
              </span>
              <span className="text-3xl font-semibold tracking-tight">Malia</span>
            </div>
            <p className="text-white/60 text-[14px] max-w-xs leading-relaxed mb-4">El consultor tecnológico de Barbate.</p>
            {/* Tagline en naranja */}
            <span className="chip-mono text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border" style={{ color: 'var(--secondary)', borderColor: 'rgba(244,162,89,0.25)' }}>
              Inteligencia Artificial · Barbate
            </span>
          </div>

          <div className="md:col-span-3">
            <div className="chip-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'var(--secondary)' }}>Navega</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a></li>
              <li><a href="#casos" className="hover:text-white transition-colors">Casos</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="/aviso-legal.html" className="hover:text-white transition-colors">Aviso legal</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="chip-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'var(--secondary)' }}>Hablamos</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Icon name="pin" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                Barbate, Cádiz
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                <a href="mailto:manuelmaliaempr@gmail.com" className="hover:text-white transition-colors">manuelmaliaempr@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="whatsapp" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                <a href={WHATSAPP} className="hover:text-white transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="linkedin" className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                <a href="https://www.linkedin.com/in/manuel-malia-vidal-921778224/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-thin my-10"></div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[12px] text-white/40">
          <span>© 2025 Malia · Hecho en Barbate, frente al Atlántico.</span>
          <span className="chip-mono uppercase tracking-widest">El consultor tecnológico de Barbate</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   App
============================================================ */
function App() {
  useReveal();
  return (
    <main>
      <Nav />
      <Hero />
      <Dolor />
      <ComoFunciona />
      <StatsStrip />
      <Casos />
      <Quienes />
      <PorQue />
      <CTAFinal />
      <Footer />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
