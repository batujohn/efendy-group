/* @jsx React.createElement */
const { useState, useEffect, useRef } = React;

function PageFade({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return React.createElement('div', { ref, style: { opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(12px)', transition: `opacity 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms`, ...style } }, children);
}

function SubPageNav({ title, scrolled }) {
  return React.createElement('nav', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '14px 48px' : '22px 48px',
      color: scrolled ? 'var(--color-ink)' : 'var(--color-bone)',
      background: scrolled ? 'var(--color-bone)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
      transition: 'all 320ms cubic-bezier(.22,.61,.36,1)'
    }
  },
    React.createElement('a', { href: 'index.html', style: { borderBottom: 0, color: 'inherit', display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 } },
      React.createElement('span', { style: { fontSize: 14 } }, '←'), 'Efendy Group'
    ),
    React.createElement('div', { style: { fontFamily: 'var(--font-wordmark)', fontSize: 13, letterSpacing: '0.42em', textTransform: 'uppercase', fontWeight: 500, paddingLeft: '0.42em' } }, title),
    React.createElement('div', { style: { width: 160 } })
  );
}

function WhatsOnPage() {
  const { Footer } = window;
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const events = [
    { venue: 'Anason', tag: 'Regular', date: 'Every Friday & Saturday', title: 'Bottomless Meyhane Night', img: 'assets/images/anason-gallery-2.jpg', desc: 'Raki flows, the meze keeps arriving, and the evening takes on a life of its own. From 6pm, no end time.' },
    { venue: 'Maydanoz', tag: 'Regular', date: 'Sat & Sun 12–3pm', title: 'Bottomless Brunch', img: 'assets/images/maydanoz-gallery-3.jpg', desc: 'Aegean meze and bottomless drinks with harbour light streaming in. No rush, no service charge.' },
    { venue: 'Hamsi Taverna', tag: 'Regular', date: 'Daily from 11.30am', title: 'Balık Ekmek at the Wharf', img: 'assets/images/hamsi-gallery-4.jpg', desc: 'The legendary Istanbul fish sandwich, made fresh to order at the Sydney Fish Market waterfront.' },
    { venue: 'Efendy İstanbul', tag: 'Seasonal', date: 'June – August 2026', title: 'Summer Tasting Menu', img: 'assets/images/efendy-istanbul.jpg', desc: 'A new six-course tasting menu celebrating the flavours of the Anatolian summer — stone fruits, lamb, yoghurt.' },
    { venue: 'All Venues', tag: 'Special', date: 'Saturday 14 June 2026', title: 'Efendy Group Open Day', img: 'assets/images/anason-hero.jpg', desc: 'For one afternoon, every venue opens its kitchen. Meet the chefs, taste the menus, hear the stories.' },
    { venue: 'Anason', tag: 'Special', date: 'Sunday 22 June 2026', title: 'Turkish Wine Evening', img: 'assets/images/anason-gallery-4.jpg', desc: 'A curated evening of Turkish natural wines with sommelier Berk Cemail. Six wines, paired small plates.' },
  ];

  const tags = ['All', 'Regular', 'Seasonal', 'Special'];
  const filtered = filter === 'All' ? events : events.filter(e => e.tag === filter);

  return React.createElement('div', { style: { background: 'var(--color-bone)' } },
    React.createElement(SubPageNav, { title: "What's On", scrolled }),
    // Hero
    React.createElement('section', {
      style: { paddingTop: 160, paddingBottom: 80, paddingLeft: 80, paddingRight: 80, background: 'var(--color-bone)' }
    },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Events & Happenings'),
          React.createElement('h1', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px,6vw,88px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: '0 0 32px', color: 'var(--color-ink)' } }, "What's On."),
          React.createElement('p', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: 'var(--fg-2)', maxWidth: 580, margin: 0 } }, 'Regular menus, seasonal specials, and evenings worth making time for — across all five Efendy Group venues.')
        ),
        // Filter tags
        React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 56, flexWrap: 'wrap' } },
          tags.map(t => React.createElement('button', {
            key: t, onClick: () => setFilter(t),
            style: {
              fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '10px 22px', border: '1px solid var(--color-ink)', cursor: 'pointer',
              background: filter === t ? 'var(--color-ink)' : 'transparent',
              color: filter === t ? 'var(--color-bone)' : 'var(--color-ink)',
              transition: 'all 200ms'
            }
          }, t))
        )
      )
    ),
    // Events grid
    React.createElement('section', { style: { padding: '0 80px 140px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 40px' } },
        filtered.map((ev, i) => React.createElement(PageFade, { key: i, delay: (i % 3) * 80 },
          React.createElement('article', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
            React.createElement('div', { style: { position: 'relative', overflow: 'hidden' } },
              React.createElement('img', { src: ev.img, style: { width: '100%', height: 320, objectFit: 'cover', display: 'block', transition: 'transform 1200ms cubic-bezier(.22,.61,.36,1)' }, onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.03)', onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)' }),
              React.createElement('div', { style: { position: 'absolute', top: 16, left: 16, fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'var(--color-bone)', color: 'var(--color-ink)', padding: '5px 10px' } }, ev.tag)
            ),
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)' } }, ev.date),
            React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28, margin: 0, lineHeight: 1.2, letterSpacing: '-0.005em', color: 'var(--color-ink)' } }, ev.title),
            React.createElement('p', { style: { fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0 } }, ev.desc),
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 4 } }, ev.venue)
          )
        ))
      )
    ),
    React.createElement(Footer, null)
  );
}

window.WhatsOnPage = WhatsOnPage;
window.SubPageNav = SubPageNav;
window.PageFade = PageFade;
