/* @jsx React.createElement */
const { useState, useEffect, useRef } = React;

function AnasonFade({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return React.createElement('div', {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(14px)',
      transition: `opacity 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      ...style
    }
  }, children);
}

function AnasonPage() {
  const { Button, Footer } = window;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ink  = '#1a1a1a';
  const bone = '#f4efe6';

  // ---- Sub Nav ----
  const SubNav = () => React.createElement('nav', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '14px 48px' : '22px 48px',
      color: scrolled ? ink : bone,
      background: scrolled ? bone : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(26,26,26,0.1)' : '1px solid transparent',
      transition: 'all 320ms cubic-bezier(.22,.61,.36,1)'
    }
  },
    React.createElement('a', {
      href: 'index.html',
      style: { borderBottom: 0, color: 'inherit', display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }
    },
      React.createElement('span', { style: { fontSize: 14, transform: 'translateY(-1px)' } }, '←'),
      'Efendy Group'
    ),
    React.createElement('div', {
      style: { fontFamily: 'var(--font-wordmark)', fontSize: 13, letterSpacing: '0.42em', textTransform: 'uppercase', fontWeight: 500, paddingLeft: '0.42em' }
    }, 'Anason'),
    React.createElement('div', { style: { display: 'flex', gap: 32, alignItems: 'center' } },
      ['Menu', 'The Bar', 'Events', 'Visit'].map(l =>
        React.createElement('button', {
          key: l,
          style: { background: 'transparent', border: 0, padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', fontWeight: 500, textTransform: 'uppercase', color: 'inherit' }
        }, l)
      ),
      React.createElement(Button, { variant: scrolled ? 'primary' : 'onDark', style: { padding: '11px 22px', fontSize: 11 } }, 'Book a Table')
    )
  );

  // ---- Hero ----
  const Hero = () => React.createElement('section', {
    'data-screen-label': 'Anason — Hero',
    style: { position: 'relative', height: 'min(860px, 96vh)', overflow: 'hidden', background: ink }
  },
    React.createElement('img', {
      src: 'assets/images/anason-hero.jpg',
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }
    }),
    React.createElement('div', {
      style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 100%)' }
    }),
    React.createElement('div', {
      style: { position: 'absolute', left: 48, right: 48, bottom: 80, color: bone, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 64 }
    },
      React.createElement(AnasonFade, { style: { maxWidth: 720 } },
        React.createElement('div', {
          style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.7)', marginBottom: 22 }
        }, 'Barangaroo, Sydney · Modern Turkish Tavern · Est. 2016'),
        React.createElement('h1', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, margin: 0, fontSize: 'clamp(52px,7vw,104px)', lineHeight: 0.96, letterSpacing: '-0.02em', color: bone }
        }, 'Rak\u0131, meze,', React.createElement('br'), 'and the harbour.')
      ),
      React.createElement(AnasonFade, { delay: 200, style: { maxWidth: 380, paddingBottom: 8 } },
        React.createElement('p', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 21, lineHeight: 1.45, color: 'rgba(244,239,230,0.9)', margin: '0 0 28px' }
        }, 'The spirit of an Istanbul meyhane, set on one of the world\'s great harbours.'),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('a', {
            href: 'https://www.sevenrooms.com/explore/anasonbarangaroo',
            target: '_blank', rel: 'noopener',
            style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '15px 32px', background: bone, color: ink, textDecoration: 'none', display: 'inline-block', transition: 'opacity 180ms' },
            onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
            onMouseLeave: e => e.currentTarget.style.opacity = '1'
          }, 'Book a Table'),
          React.createElement('a', {
            href: '#menu',
            style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '14px 31px', background: 'transparent', color: bone, border: '1px solid rgba(244,239,230,0.55)', textDecoration: 'none', display: 'inline-block', transition: 'opacity 180ms' },
            onMouseEnter: e => e.currentTarget.style.opacity = '0.7',
            onMouseLeave: e => e.currentTarget.style.opacity = '1'
          }, 'View Menu')
        )
      )
    )
  );

  // ---- Intro ----
  const Intro = () => React.createElement('section', {
    'data-screen-label': 'Anason — Intro',
    style: { padding: '120px 80px', background: bone }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' } },
      React.createElement(AnasonFade, null,
        React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'About Anason'),
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(38px,3.8vw,58px)', lineHeight: 1.06, letterSpacing: '-0.015em', margin: '0 0 32px', color: ink }
        }, 'A meyhane spirit on the harbour.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20, lineHeight: 1.65, color: 'rgba(26,26,26,0.75)', margin: '0 0 24px', maxWidth: 480 }
        }, 'Anason is a modern Turkish tavern inspired by the meyhanes of Istanbul — those long, generous, raki-soaked evenings where food arrives in waves and conversation never ends.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', margin: '0 0 32px', maxWidth: 480 }
        }, 'Sitting at 23 Barangaroo Avenue with views over Darling Harbour, the menu moves between fire-cooked meze, charcoal grill, seasonal vegetables, and a raki and wine list that encourages staying late. Named for anise — the base of raki, the spirit of the table.'),
        React.createElement('div', {
          style: { paddingTop: 32, borderTop: '1px solid rgba(26,26,26,0.1)', display: 'flex', gap: 56 }
        },
          [{ n: 'RCNSW Best Specialty', l: 'Restaurant 2022–2025' }, { n: 'SMH Good Food', l: 'Recommended 2024' }, { n: 'Est. 2016', l: 'Barangaroo, Sydney' }].map(({ n, l }) =>
            React.createElement('div', { key: n },
              React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20, color: ink, lineHeight: 1.1 } }, n),
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.5)', marginTop: 6 } }, l)
            )
          )
        )
      ),
      React.createElement(AnasonFade, { delay: 120, style: { paddingTop: 48 } },
        React.createElement('img', {
          src: 'assets/images/anason-dish-1.jpg',
          style: { width: '100%', height: 600, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', {
          style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.45)', marginTop: 14 }
        }, '01 \u2014 Salmon tartare, radish, herb leaves')
      )
    )
  );

  // ---- Montage ----
  const Montage = () => React.createElement('section', {
    style: { padding: '0 48px 80px', background: bone }
  },
    React.createElement('div', { style: { maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 24 } },
      React.createElement(AnasonFade, { style: { marginTop: 0 } },
        React.createElement('img', {
          src: 'assets/images/anason-room.jpg',
          style: { width: '100%', height: 720, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(26,26,26,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 14 } }, '02 \u2014 The dining room, Barangaroo')
      ),
      React.createElement(AnasonFade, { delay: 100, style: { marginTop: 80 } },
        React.createElement('img', {
          src: 'assets/images/anason-dish-2.jpg',
          style: { width: '100%', height: 560, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(26,26,26,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 14 } }, '03 \u2014 King prawns, charcoal grill')
      )
    )
  );

  // ---- Menu CTA ----
  const MenuCTA = () => {
    const menus = [
      { label: 'Lunch & Dinner', sub: 'Meze, charcoal grill & raki', href: 'https://www.anason.com.au/menu' },
      { label: 'Bottomless Brunch', sub: 'Sat & Sun 12–3pm', href: 'https://www.anason.com.au/brunch' },
      { label: 'Cocktails & Wine', sub: 'Raki, anise & Turkish wines', href: 'https://www.anason.com.au/drinks' }
    ];
    return React.createElement('section', {
      id: 'menu',
      'data-screen-label': 'Anason — Menu',
      style: { padding: '80px 80px', background: ink, color: bone }
    },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement(AnasonFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 20 } }, 'What we cook'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,4.2vw,64px)', margin: '0 0 72px', lineHeight: 1.02, letterSpacing: '-0.015em', color: bone }
          }, 'The menus.')
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, borderTop: '1px solid rgba(244,239,230,0.15)' } },
          menus.map(({ label, sub, href }, i) =>
            React.createElement(AnasonFade, { key: label, delay: i * 80 },
              React.createElement('a', {
                href, target: '_blank', rel: 'noopener',
                style: { display: 'block', padding: '44px 0', borderBottom: '1px solid rgba(244,239,230,0.15)', textDecoration: 'none', color: bone, transition: 'color 200ms' },
                onMouseEnter: e => e.currentTarget.style.color = 'rgba(244,239,230,0.6)',
                onMouseLeave: e => e.currentTarget.style.color = bone
              },
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.45)', marginBottom: 14 } }, `0${i + 1}`),
                React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28, lineHeight: 1.1, marginBottom: 10 } }, label),
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(244,239,230,0.5)' } }, sub),
                React.createElement('div', { style: { marginTop: 24, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(244,239,230,0.5)', display: 'inline-block', paddingBottom: 2, color: 'rgba(244,239,230,0.7)' } }, 'View PDF')
              )
            )
          )
        )
      )
    );
  };

  // ---- The Bar ----
  const TheBar = () => React.createElement('section', {
    'data-screen-label': 'Anason — The Bar',
    style: { background: bone, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 680 }
  },
    React.createElement('div', {
      style: { padding: '100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }
    },
      React.createElement(AnasonFade, null,
        React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Raki & Cocktails'),
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(38px,3.6vw,56px)', lineHeight: 1.06, letterSpacing: '-0.015em', margin: '0 0 24px', color: ink }
        }, 'The spirit of the evening.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 19, lineHeight: 1.65, color: 'rgba(26,26,26,0.72)', margin: '0 0 36px', maxWidth: 460 }
        }, 'Anason means anise. It\u2019s the base of raki — the national spirit of Turkey, clouding white when it meets water and ice. Our bar is built around it: cocktails, Turkish and Australian wines, and a raki list longer than most.'),
        React.createElement('img', {
          src: 'assets/images/anason-dish-3.jpg',
          style: { width: '100%', maxWidth: 400, height: 440, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.45)', marginTop: 14 } }, '\u2014 Pomegranate sour, raki, cocktail meze')
      )
    ),
    React.createElement('div', { style: { position: 'relative', overflow: 'hidden' } },
      React.createElement('img', {
        src: 'assets/images/anason-hero.jpg',
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
      })
    )
  );

  // ---- Gallery ----
  const Gallery = () => {
    const slides = [
  {
    "src": "assets/images/anason-gallery-1.jpg",
    "caption": "Manti — hand-folded dumplings, yoghurt, chilli butter"
  },
  {
    "src": "assets/images/anason-gallery-2.jpg",
    "caption": "The blue tile table — a shared feast"
  },
  {
    "src": "assets/images/anason-gallery-3.jpg",
    "caption": "Fig salad, walnuts, string cheese"
  },
  {
    "src": "assets/images/anason-gallery-4.jpg",
    "caption": "Pomegranate cocktail, Anason coaster"
  },
  {
    "src": "assets/images/anason-gallery-5.jpg",
    "caption": "Espresso martini, Turkish style"
  },
  {
    "src": "assets/images/anason-gallery-6.jpg",
    "caption": "King prawns on the charcoal grill"
  },
  {
    "src": "assets/images/anason-gallery-7.jpg",
    "caption": "The full spread — an Anason evening"
  }
];
    const [idx, setIdx] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [paused, setPaused] = useState(false);
    const total = slides.length;
    const go = n => setIdx((n + total) % total);
    useEffect(() => {
      if (paused) return;
      const t = setInterval(() => setIdx(i => (i + 1) % total), 6000);
      return () => clearInterval(t);
    }, [paused, total]);
    return React.createElement('section', {
      'data-screen-label': 'Anason — Gallery',
      style: { width: '100%' }
    },
      React.createElement('div', { style: { padding: '120px 80px 60px', background: 'var(--color-bone)' } },
        React.createElement(AnasonFade, null,
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 18 } }, 'The Space'),
              React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.005em', textTransform: 'none', color: 'var(--color-ink)' } }, 'Navy tiles, harbour light.')
            ),
            React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 19, color: 'var(--fg-2)', maxWidth: 400, lineHeight: 1.5 } }, 'The iconic Anason blue tile — Barangaroo Avenue, level 1.')
          )
        )
      ),
      React.createElement('div', {
        onClick: () => go(idx + 1),
        onMouseEnter: () => { setHovered(true); setPaused(true); },
        onMouseLeave: () => { setHovered(false); setPaused(false); },
        style: { position: 'relative', width: '100%', height: '85vh', cursor: 'none', overflow: 'hidden', background: 'var(--color-ink)' }
      },
        slides.map((s, i) => React.createElement('img', {
          key: i, src: s.src,
          style: {
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? 'scale(1.0)' : 'scale(1.06)',
            transition: 'opacity 1400ms cubic-bezier(.22,.61,.36,1), transform 8000ms cubic-bezier(.22,.61,.36,1)'
          }
        })),
        React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' } }),
        React.createElement('div', { style: { position: 'absolute', left: 48, bottom: 48, color: 'var(--color-bone)', fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 17, opacity: hovered ? 1 : 0.8, transition: 'opacity 400ms', pointerEvents: 'none', textShadow: '0 1px 10px rgba(0,0,0,0.4)' } }, slides[idx].caption),
        React.createElement('div', { style: { position: 'absolute', right: 48, bottom: 48, color: 'var(--color-bone)', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.65, pointerEvents: 'none', textShadow: '0 1px 10px rgba(0,0,0,0.4)' } }, String(idx + 1).padStart(2, '0'), ' / ', String(total).padStart(2, '0')),
        React.createElement('button', { onClick: e => { e.stopPropagation(); go(idx - 1); }, 'aria-label': 'Previous', style: { position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, padding: '16px 20px', opacity: hovered ? 0.9 : 0, transition: 'opacity 350ms' } }, '←'),
        React.createElement('button', { onClick: e => { e.stopPropagation(); go(idx + 1); }, 'aria-label': 'Next', style: { position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, padding: '16px 20px', opacity: hovered ? 0.9 : 0, transition: 'opacity 350ms' } }, '→'),
        React.createElement('div', { style: { position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, pointerEvents: 'none' } },
          slides.map((_, i) => React.createElement('div', {
            key: i,
            style: { width: i === idx ? 28 : 6, height: 2, background: 'var(--color-bone)', opacity: i === idx ? 0.9 : 0.35, transition: 'width 400ms cubic-bezier(.22,.61,.36,1), opacity 400ms' }
          }))
        )
      )
    );
  };

  // ---- Visit ----
  const Visit = () => {
    const hours = [
      ['Monday', 'Closed'],
      ['Tuesday', '5pm \u2013 10pm'],
      ['Wednesday', '12pm \u2013 10pm'],
      ['Thursday', '12pm \u2013 10pm'],
      ['Friday', '12pm \u2013 late'],
      ['Saturday', '12pm \u2013 late'],
      ['Sunday', '12pm \u2013 9pm']
    ];
    return React.createElement('section', {
      'data-screen-label': 'Anason — Visit',
      style: { padding: '120px 80px', background: 'var(--color-paper)' }
    },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' } },
        React.createElement(AnasonFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Find us'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(38px,3.8vw,56px)', lineHeight: 1.06, letterSpacing: '-0.015em', margin: '0 0 48px', color: ink }
          }, 'Visit Anason.'),
          React.createElement('div', { style: { marginBottom: 48 } },
            hours.map(([day, time]) =>
              React.createElement('div', {
                key: day,
                style: { display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(26,26,26,0.08)' }
              },
                React.createElement('span', { style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.5)' } }, day),
                React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 16, color: ink } }, time)
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('a', {
              href: 'https://www.sevenrooms.com/explore/anasonbarangaroo',
              target: '_blank', rel: 'noopener',
              style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '15px 32px', background: ink, color: bone, textDecoration: 'none', display: 'inline-block', transition: 'opacity 180ms' },
              onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
              onMouseLeave: e => e.currentTarget.style.opacity = '1'
            }, 'Reserve'),
            React.createElement('a', {
              href: 'tel:(02)91881581',
              style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '14px 31px', background: 'transparent', color: ink, border: '1px solid rgba(26,26,26,0.3)', textDecoration: 'none', display: 'inline-block', transition: 'opacity 180ms' },
              onMouseEnter: e => e.currentTarget.style.opacity = '0.6',
              onMouseLeave: e => e.currentTarget.style.opacity = '1'
            }, '(02) 9188 1581')
          )
        ),
        React.createElement(AnasonFade, { delay: 100 },
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Address'),
          React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 32, lineHeight: 1.3, color: ink, marginBottom: 8 } }, '23 Barangaroo Avenue'),
          React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 24, color: 'rgba(26,26,26,0.6)' } }, 'Barangaroo, NSW 2000'),
          React.createElement('a', {
            href: 'https://maps.google.com/?q=Anason+Barangaroo',
            target: '_blank', rel: 'noopener',
            style: { display: 'inline-block', marginTop: 20, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: ink, borderBottom: '1px solid rgba(26,26,26,0.4)', paddingBottom: 2, textDecoration: 'none' }
          }, 'Open in Maps'),
          React.createElement('div', { style: { marginTop: 40, padding: 32, background: ink, color: bone } },
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 16 } }, 'Private events'),
            React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20, lineHeight: 1.5, marginBottom: 24 } }, 'Meyhane evenings, private dining, corporate events and functions.'),
            React.createElement('a', {
              href: 'mailto:booking@anason.com.au',
              style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: bone, textDecoration: 'none', borderBottom: '1px solid rgba(244,239,230,0.5)', paddingBottom: 2 }
            }, 'booking@anason.com.au')
          ),
          React.createElement('img', {
            src: 'assets/images/anason-dish-2.jpg',
            style: { width: '100%', height: 360, objectFit: 'cover', display: 'block', marginTop: 24 }
          })
        )
      )
    );
  };

  return React.createElement('div', { id: 'top', style: { background: bone } },
    React.createElement(SubNav, null),
    React.createElement(Hero, null),
    React.createElement(Intro, null),
    React.createElement(Montage, null),
    React.createElement(MenuCTA, null),
    React.createElement(TheBar, null),
    React.createElement(Gallery, null),
    React.createElement(Visit, null),
    React.createElement(Footer, null)
  );
}

window.AnasonPage = AnasonPage;
