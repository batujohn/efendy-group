/* @jsx React.createElement */
const { useState, useEffect, useRef } = React;

// Local FadeIn for Maydanoz (avoid collision)
function MayFade({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.08 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return React.createElement('div', {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 800ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 800ms cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      ...style
    }
  }, children);
}

function MaydanozPage() {
  const { Button, Footer } = window;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Maydanoz accent colours (teal/forest)
  const teal   = '#1b4a45';
  const copper = '#b87333';
  const cream  = '#f5f0e8';
  const ink    = '#1a1a1a';

  // ---- Sub nav ----
  const SubNav = () => React.createElement('nav', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '14px 48px' : '22px 48px',
      color: scrolled ? ink : cream,
      background: scrolled ? cream : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
      transition: 'all 320ms cubic-bezier(.22,.61,.36,1)'
    }
  },
    React.createElement('a', {
      href: 'index.html',
      style: {
        borderBottom: 0, color: 'inherit', display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
        textTransform: 'uppercase', fontWeight: 500
      }
    },
      React.createElement('span', { style: { fontSize: 14, transform: 'translateY(-1px)' } }, '←'),
      'Efendy Group'
    ),
    React.createElement('div', {
      style: {
        fontFamily: 'var(--font-wordmark)', fontSize: 13, letterSpacing: '0.42em',
        textTransform: 'uppercase', fontWeight: 500, paddingLeft: '0.42em'
      }
    }, 'Maydanoz'),
    React.createElement('div', { style: { display: 'flex', gap: 32, alignItems: 'center' } },
      ['Menu', 'The Bar', "Chef's Table", 'Visit'].map(l =>
        React.createElement('button', {
          key: l,
          style: {
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
            fontWeight: 500, textTransform: 'uppercase', color: 'inherit'
          }
        }, l)
      ),
      React.createElement(Button, {
        variant: scrolled ? 'primary' : 'onDark',
        style: { padding: '11px 22px', fontSize: 11, background: scrolled ? ink : copper, border: 0 }
      }, 'Reserve')
    )
  );

  // ---- Hero ----
  const Hero = () => React.createElement('section', {
    'data-screen-label': 'Maydanoz — Hero',
    style: { position: 'relative', height: 'min(860px, 96vh)', overflow: 'hidden', background: ink }
  },
    React.createElement('img', {
      src: 'assets/images/maydanoz-hero.jpg',
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.72 }
    }),
    // subtle dark vignette at bottom
    React.createElement('div', {
      style: {
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.02) 40%, rgba(10,30,28,0.72) 100%)'
      }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 80px 80px'
      }
    },
      React.createElement('div', { style: { maxWidth: 720 } },
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', marginBottom: 22
          }
        }, 'Aegean Turkish · 50 Carrington St, Sydney · SMH 1 Hat 2024 & 2025'),
        React.createElement('h1', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300, margin: 0,
            fontSize: 'clamp(60px, 8vw, 110px)', lineHeight: 0.95,
            letterSpacing: '-0.02em', color: cream, textTransform: 'none'
          }
        }, 'Maydanoz.'),
        React.createElement('p', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.45,
            color: 'rgba(245,240,232,0.88)', margin: '24px 0 36px', maxWidth: 520
          }
        }, 'Aegean meze. Olive oil. Wood fire. The casual abundance of the Turkish coast — in the heart of Sydney CBD.'),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          React.createElement('a', {
            href: 'https://www.sevenrooms.com/explore/maydanoz/reservations/create/search/',
            target: '_blank',
            style: {
              fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em',
              textTransform: 'uppercase', padding: '15px 32px',
              background: copper, color: cream, border: 0, cursor: 'pointer',
              textDecoration: 'none', display: 'inline-block',
              transition: 'opacity 180ms'
            },
            onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
            onMouseLeave: e => e.currentTarget.style.opacity = '1'
          }, 'Reserve a Table'),
          React.createElement('a', {
            href: '#menu',
            style: {
              fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em',
              textTransform: 'uppercase', padding: '14px 31px',
              background: 'transparent', color: cream,
              border: '1px solid rgba(245,240,232,0.55)', cursor: 'pointer',
              textDecoration: 'none', display: 'inline-block',
              transition: 'opacity 180ms'
            },
            onMouseEnter: e => e.currentTarget.style.opacity = '0.7',
            onMouseLeave: e => e.currentTarget.style.opacity = '1'
          }, 'View Menu')
        )
      )
    )
  );

  // ---- Intro ----
  const Intro = () => React.createElement('section', {
    'data-screen-label': 'Maydanoz — Intro',
    style: { padding: '120px 80px', background: cream }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' } },
      React.createElement(MayFade, null,
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: copper, marginBottom: 20
          }
        }, 'Maydanoz — Parsley'),
        React.createElement('h2', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(38px, 3.8vw, 58px)', lineHeight: 1.06,
            letterSpacing: '-0.015em', margin: '0 0 32px', color: ink
          }
        }, 'Produce-driven meze from the Aegean coast.'),
        React.createElement('p', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20,
            lineHeight: 1.65, color: 'rgba(26,26,26,0.75)', margin: 0, maxWidth: 480
          }
        }, 'Maydanoz draws from the vegetable gardens, olive groves and fishing villages of Turkey\u2019s Aegean coast \u2014 a cuisine built on olive oil, dairy, fire and restraint. Every plate begins with a single ingredient at its seasonal peak.'),
        React.createElement('div', {
          style: {
            marginTop: 40, paddingTop: 40,
            borderTop: '1px solid rgba(26,26,26,0.1)',
            display: 'flex', gap: 64
          }
        },
          [
            { n: 'SMH 1 Hat', l: '2024 & 2025' },
            { n: 'Best Specialty', l: 'Restaurant · National' },
            { n: 'Two Goblets', l: 'Wine List of the Year' }
          ].map(({ n, l }) =>
            React.createElement('div', { key: n },
              React.createElement('div', {
                style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, color: ink, lineHeight: 1.1 }
              }, n),
              React.createElement('div', {
                style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.5)', marginTop: 6 }
              }, l)
            )
          )
        )
      ),
      React.createElement(MayFade, { delay: 120, style: { paddingTop: 48 } },
        React.createElement('img', {
          src: 'assets/images/maydanoz-dish-1.jpg',
          style: { width: '100%', height: 600, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(26,26,26,0.45)', marginTop: 14
          }
        }, '01 — Circassian cheese, herb oil, wood-fired courgette')
      )
    )
  );

  // ---- Montage (2-up) ----
  const Montage = () => React.createElement('section', {
    'data-screen-label': 'Maydanoz — Montage',
    style: { padding: '0 48px 80px', background: cream }
  },
    React.createElement('div', {
      style: {
        maxWidth: 1320, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 24
      }
    },
      React.createElement(MayFade, { style: { marginTop: 0 } },
        React.createElement('img', {
          src: 'assets/images/maydanoz-room.jpg',
          style: { width: '100%', height: 720, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(26,26,26,0.45)',
            letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 14
          }
        }, '02 — The dining room, 50 Carrington Street')
      ),
      React.createElement(MayFade, { delay: 100, style: { marginTop: 80 } },
        React.createElement('img', {
          src: 'assets/images/maydanoz-dish-2.jpg',
          style: { width: '100%', height: 560, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(26,26,26,0.45)',
            letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 14
          }
        }, '03 — Seasonal meze, courgette flower, yoghurt')
      )
    )
  );

  // ---- Menu CTA ----
  const MenuCTA = () => {
    const menus = [
      { label: 'Lunch & Dinner', sub: 'Meze, olive oil & wood fire', href: 'https://www.maydanoz.com.au/_files/ugd/bf7c5b_6551606221fa499898dd6bc0d864d68e.pdf' },
      { label: 'Bottomless Brunch', sub: 'Saturday & Sunday from 12pm', href: 'https://www.maydanoz.com.au/_files/ugd/bf7c5b_64da522a4c7343a1a7fb087edcf0f5b2.pdf' },
      { label: 'Cocktails & Wine', sub: 'Anatolian spirits, natural wine', href: 'https://www.maydanoz.com.au/_files/ugd/bf7c5b_486e9a6dc45b4b28b32724460b5586c4.pdf' }
    ];
    return React.createElement('section', {
      id: 'menu',
      'data-screen-label': 'Maydanoz — Menu',
      style: { padding: '80px 80px', background: ink, color: cream }
    },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement(MayFade, null,
          React.createElement('div', {
            style: {
              fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: 'rgba(245,240,232,0.55)', marginBottom: 20
            }
          }, 'What we cook'),
          React.createElement('h2', {
            style: {
              fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(40px, 4.2vw, 64px)', margin: '0 0 72px',
              lineHeight: 1.02, letterSpacing: '-0.015em', color: cream
            }
          }, 'The menus.')
        ),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, borderTop: '1px solid rgba(245,240,232,0.15)' }
        },
          menus.map(({ label, sub, href }, i) =>
            React.createElement(MayFade, { key: label, delay: i * 80 },
              React.createElement('a', {
                href,
                target: '_blank',
                style: {
                  display: 'block', padding: '44px 0', borderBottom: '1px solid rgba(245,240,232,0.15)',
                  textDecoration: 'none', color: 'inherit',
                  transition: 'color 200ms'
                },
                onMouseEnter: e => { e.currentTarget.style.color = copper; },
                onMouseLeave: e => { e.currentTarget.style.color = cream; }
              },
                React.createElement('div', {
                  style: {
                    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)', marginBottom: 14
                  }
                }, `0${i + 1}`),
                React.createElement('div', {
                  style: {
                    fontFamily: 'var(--font-display)', fontWeight: 300,
                    fontSize: 28, lineHeight: 1.1, marginBottom: 10
                  }
                }, label),
                React.createElement('div', {
                  style: {
                    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em',
                    color: 'rgba(245,240,232,0.5)'
                  }
                }, sub),
                React.createElement('div', {
                  style: {
                    marginTop: 24, fontFamily: 'var(--font-body)', fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    borderBottom: `1px solid ${copper}`, display: 'inline-block', paddingBottom: 2, color: copper
                  }
                }, 'View PDF')
              )
            )
          )
        )
      )
    );
  };

  // ---- The Bar ----
  const TheBar = () => React.createElement('section', {
    'data-screen-label': "Maydanoz — The Bar",
    style: { padding: '0', background: ink, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 680 }
  },
    React.createElement('div', {
      style: { position: 'relative', overflow: 'hidden' }
    },
      React.createElement('img', {
        src: 'assets/images/maydanoz-bar.jpg',
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }
      })
    ),
    React.createElement('div', {
      style: {
        padding: '100px 80px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', background: ink, color: cream
      }
    },
      React.createElement(MayFade, null,
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: copper, marginBottom: 20
          }
        }, 'Cocktails & Wine'),
        React.createElement('h2', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(38px, 3.6vw, 56px)', lineHeight: 1.06,
            letterSpacing: '-0.015em', margin: '0 0 28px', color: cream
          }
        }, 'The bar at the heart of it.'),
        React.createElement('p', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20,
            lineHeight: 1.6, color: 'rgba(245,240,232,0.78)', margin: '0 0 40px', maxWidth: 420
          }
        }, 'Anatolian spirits, handpicked natural wines, and cocktails built around herbs, citrus and fire. Two goblets from Wine List of the Year.'),
        React.createElement('img', {
          src: 'assets/images/maydanoz-cocktail.jpg',
          style: { width: '100%', maxWidth: 360, height: 400, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginTop: 14
          }
        }, '— Maydanoz spritz, herb sorbet, dried apple')
      )
    )
  );

  // ---- Chef's Table ----
  const ChefsTable = () => React.createElement('section', {
    'data-screen-label': "Maydanoz — Chef's Table",
    style: { padding: '140px 80px', background: cream }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' } },
      React.createElement(MayFade, { style: { order: 2 } },
        React.createElement('img', {
          src: 'assets/images/maydanoz-chefstable.jpg',
          style: { width: '100%', height: 640, objectFit: 'cover', display: 'block' }
        }),
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(26,26,26,0.45)', marginTop: 14
          }
        }, '— The dining room, open kitchen beyond')
      ),
      React.createElement(MayFade, { delay: 100, style: { order: 1 } },
        React.createElement('div', {
          style: {
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: copper, marginBottom: 20
          }
        }, "Chef's Table"),
        React.createElement('h2', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(36px, 3.4vw, 52px)', lineHeight: 1.08,
            letterSpacing: '-0.015em', margin: '0 0 28px', color: ink
          }
        }, 'An intimate seat at the kitchen.'),
        React.createElement('p', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 19,
            lineHeight: 1.65, color: 'rgba(26,26,26,0.72)', margin: '0 0 36px', maxWidth: 460
          }
        }, 'The Chef\'s Table is a semi-private perch with views directly into the open kitchen. The chef creates the meal in front of you — seasonal produce, Anatolian recipes, real conversation.'),
        React.createElement('div', {
          style: {
            padding: '32px 0', borderTop: '1px solid rgba(26,26,26,0.1)',
            borderBottom: '1px solid rgba(26,26,26,0.1)', marginBottom: 36
          }
        },
          [
            ['Experience', 'Interactive tasting, chef-guided'],
            ['Capacity', 'Up to 10 guests'],
            ['Booking', 'By enquiry']
          ].map(([k, v]) =>
            React.createElement('div', {
              key: k,
              style: { display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(26,26,26,0.06)' }
            },
              React.createElement('span', {
                style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.45)' }
              }, k),
              React.createElement('span', {
                style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 16, color: ink }
              }, v)
            )
          )
        ),
        React.createElement('a', {
          href: 'mailto:booking@maydanoz.com.au',
          style: {
            display: 'inline-block',
            fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em',
            textTransform: 'uppercase', padding: '15px 32px',
            background: ink, color: cream, textDecoration: 'none',
            transition: 'opacity 180ms'
          },
          onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
          onMouseLeave: e => e.currentTarget.style.opacity = '1'
        }, 'Enquire Now')
      )
    )
  );

  // ---- Gallery ----
  const Gallery = () => {
    const slides = [
  {
    "src": "assets/images/maydanoz-gallery-1.jpg",
    "caption": "The dining room — green marble, copper, walnut"
  },
  {
    "src": "assets/images/maydanoz-gallery-2.jpg",
    "caption": "Carrington Street at night"
  },
  {
    "src": "assets/images/maydanoz-gallery-3.jpg",
    "caption": "Circassian cheese, herb oil, smoked courgette"
  },
  {
    "src": "assets/images/maydanoz-gallery-4.jpg",
    "caption": "Maydanoz spritz — parsley, apple, soda"
  },
  {
    "src": "assets/images/maydanoz-gallery-5.jpg",
    "caption": "Seasonal meze — the full spread"
  },
  {
    "src": "assets/images/maydanoz-gallery-6.jpg",
    "caption": "The emerald bar at service"
  },
  {
    "src": "assets/images/maydanoz-gallery-7.jpg",
    "caption": "Seasonal meze table"
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
      'data-screen-label': 'Maydanoz — Gallery',
      style: { width: '100%' }
    },
      React.createElement('div', { style: { padding: '120px 80px 60px', background: 'var(--color-bone)' } },
        React.createElement(MayFade, null,
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 18 } }, 'The Space'),
              React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.005em', textTransform: 'none', color: 'var(--color-ink)' } }, 'A room built for the senses.')
            ),
            React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 19, color: 'var(--fg-2)', maxWidth: 400, lineHeight: 1.5 } }, 'Emerald marble, copper pendants, bentwood chairs — 50 Carrington Street.')
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
      ['Monday', '5pm – 10pm (dinner)'],
      ['Tuesday', '12pm – 10pm'],
      ['Wednesday', '12pm – 10pm'],
      ['Thursday', '12pm – 10pm'],
      ['Friday', '12pm – 11pm'],
      ['Saturday', '12pm – 11pm'],
      ['Sunday', 'Closed']
    ];
    return React.createElement('section', {
      'data-screen-label': 'Maydanoz — Visit',
      style: { padding: '120px 80px', background: cream }
    },
      React.createElement('div', {
        style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }
      },
        React.createElement(MayFade, null,
          React.createElement('div', {
            style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: copper, marginBottom: 20 }
          }, 'Find us'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(38px, 3.8vw, 56px)', lineHeight: 1.06, letterSpacing: '-0.015em', margin: '0 0 48px', color: ink }
          }, 'Visit Maydanoz.'),
          React.createElement('div', { style: { marginBottom: 48 } },
            hours.map(([day, time]) =>
              React.createElement('div', {
                key: day,
                style: {
                  display: 'flex', justifyContent: 'space-between',
                  padding: '14px 0', borderBottom: '1px solid rgba(26,26,26,0.08)'
                }
              },
                React.createElement('span', {
                  style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.5)' }
                }, day),
                React.createElement('span', {
                  style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 16, color: ink }
                }, time)
              )
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('a', {
              href: 'https://www.sevenrooms.com/explore/maydanoz/reservations/create/search/',
              target: '_blank',
              style: {
                fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em',
                textTransform: 'uppercase', padding: '15px 32px',
                background: ink, color: cream, textDecoration: 'none', display: 'inline-block',
                transition: 'opacity 180ms'
              },
              onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
              onMouseLeave: e => e.currentTarget.style.opacity = '1'
            }, 'Reserve'),
            React.createElement('a', {
              href: 'tel:(02)94279789',
              style: {
                fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em',
                textTransform: 'uppercase', padding: '14px 31px',
                background: 'transparent', color: ink,
                border: '1px solid rgba(26,26,26,0.3)', textDecoration: 'none', display: 'inline-block',
                transition: 'opacity 180ms'
              },
              onMouseEnter: e => e.currentTarget.style.opacity = '0.6',
              onMouseLeave: e => e.currentTarget.style.opacity = '1'
            }, '(02) 9427 9789')
          )
        ),
        React.createElement(MayFade, { delay: 100 },
          React.createElement('div', {
            style: {
              fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: copper, marginBottom: 20
            }
          }, 'Address'),
          React.createElement('div', {
            style: {
              fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 32,
              lineHeight: 1.3, color: ink, marginBottom: 8
            }
          }, '50 Carrington Street'),
          React.createElement('div', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 24, color: 'rgba(26,26,26,0.6)' }
          }, 'Sydney CBD, NSW 2000'),
          React.createElement('div', {
            style: { marginTop: 40, padding: 32, background: ink, color: cream }
          },
            React.createElement('div', {
              style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.55)', marginBottom: 16 }
            }, 'Event enquiries'),
            React.createElement('div', {
              style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20, lineHeight: 1.5, marginBottom: 24 }
            }, 'Private dining, corporate events, and bespoke experiences available.'),
            React.createElement('a', {
              href: 'mailto:booking@maydanoz.com.au',
              style: {
                fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: copper, textDecoration: 'none',
                borderBottom: `1px solid ${copper}`, paddingBottom: 2
              }
            }, 'booking@maydanoz.com.au')
          ),
          React.createElement('img', {
            src: 'assets/images/maydanoz-dish-3.jpg',
            style: { width: '100%', height: 360, objectFit: 'cover', display: 'block', marginTop: 24 }
          })
        )
      )
    );
  };

  return React.createElement('div', { id: 'top', style: { background: cream } },
    React.createElement(SubNav, null),
    React.createElement(Hero, null),
    React.createElement(Intro, null),
    React.createElement(Montage, null),
    React.createElement(MenuCTA, null),
    React.createElement(TheBar, null),
    React.createElement(ChefsTable, null),
    React.createElement(Gallery, null),
    React.createElement(Visit, null),
    React.createElement(Footer, null)
  );
}

window.MaydanozPage = MaydanozPage;
