/* @jsx React.createElement */
const { useState, useEffect, useRef } = React;

// Local FadeIn (avoid global collision)
function HamsiFade({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return React.createElement('div', {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      ...style
    }
  }, children);
}

function HamsiPage() {
  const { Eyebrow, Button, Footer } = window;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sub-nav (same family as group nav, with a "back to group" affordance)
  const SubNav = () => React.createElement('nav', {
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
    React.createElement('a', {
      href: 'index.html',
      style: {
        borderBottom: 0, color: 'inherit', display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500
      }
    },
      React.createElement('span', { style: { fontSize: 14, lineHeight: 1, transform: 'translateY(-1px)' } }, '←'),
      'Efendy Group'
    ),
    React.createElement('div', {
      style: {
        fontFamily: 'var(--font-wordmark)', fontSize: 13, letterSpacing: '0.42em',
        textTransform: 'uppercase', fontWeight: 500, paddingLeft: '0.42em'
      }
    }, 'Hamsi Taverna'),
    React.createElement('div', { style: { display: 'flex', gap: 32, alignItems: 'center' } },
      ['Menu', 'The Room', 'Hamsi Street', 'Visit'].map(l =>
        React.createElement('button', {
          key: l,
          style: {
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', fontWeight: 500,
            textTransform: 'uppercase', color: 'inherit'
          }
        }, l)
      ),
      React.createElement(Button, { variant: scrolled ? 'primary' : 'onDark', style: { padding: '11px 22px', fontSize: 11 } }, 'Book a Table')
    )
  );

  // Hero
  const Hero = () => React.createElement('section', {
    'data-screen-label': 'Hamsi — Hero',
    style: { position: 'relative', height: 'min(840px, 96vh)', overflow: 'hidden', background: 'var(--color-ink)' }
  },
    React.createElement('img', {
      src: 'assets/images/hamsi-hero.jpg',
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }
    }),
    React.createElement('div', {
      style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)' }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', left: 48, right: 48, bottom: 80, color: 'var(--color-bone)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 64
      }
    },
      React.createElement(HamsiFade, { style: { maxWidth: 820 } },
        React.createElement('div', {
          style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 24, color: 'rgb(244,239,230)' }
        }, 'Sydney Fish Market · Pyrmont · Open daily'),
        React.createElement('h1', {
          style: {
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(48px,7.2vw,108px)', lineHeight: 0.98, margin: 0,
            letterSpacing: '-0.018em', color: 'rgb(244,239,230)'
          }
        }, 'Charcoal,', React.createElement('br'), 'sea breeze,', React.createElement('br'), 'and a long lunch.')
      ),
      React.createElement(HamsiFade, { delay: 200, style: { maxWidth: 380, paddingBottom: 6 } },
        React.createElement('div', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 21, lineHeight: 1.4, opacity: 0.92, color: 'rgb(244,239,230)' }
        }, 'A breezy Aegean taverna at the new Sydney Fish Market, from the Efendy Group.'),
        React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 24 } },
          React.createElement(Button, { variant: 'onDark', style: { padding: '13px 24px', fontSize: 11 } }, 'Book a Table'),
          React.createElement(Button, { variant: 'outlineLight', style: { padding: '12px 23px', fontSize: 11 } }, 'View Menu')
        )
      )
    ),
    React.createElement('div', {
      style: {
        position: 'absolute', top: 100, right: 32, color: 'var(--color-bone)', opacity: 0.55,
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase'
      }
    }, 'Est. 2026 · Pyrmont, NSW')
  );

  // Editorial intro
  const Intro = () => React.createElement('section', {
    'data-screen-label': 'Hamsi — Intro',
    style: { padding: '140px 48px 100px', background: 'var(--color-bone)' }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 96, alignItems: 'start' } },
      React.createElement(HamsiFade, null,
        React.createElement(Eyebrow, { style: { marginBottom: 24 } }, 'About Hamsi'),
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, lineHeight: 1.06, letterSpacing: '-0.005em', textTransform: 'none', color: 'var(--color-ink)' }
        }, 'Where Aegean tavern culture meets the Sydney waterfront.')
      ),
      React.createElement(HamsiFade, { delay: 120, style: { display: 'flex', flexDirection: 'column', gap: 26 } },
        React.createElement('p', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 24, lineHeight: 1.5, color: 'var(--color-ink)', margin: 0 }
        }, 'Named after Türkiye\u2019s Black Sea anchovy, Hamsi is inspired by the seaside taverns dotted along the Aegean coast — and by the Bosphorus fish restaurants and beach clubs of summer.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 620 }
        }, 'The dining room sits on the upper-ground level of the new Sydney Fish Market, water views and Anzac Bridge in the middle distance. Charcoal is the main ingredient — skewered sardines, sujuk-butter scallops, kataifi-wrapped king prawns, a charcoaled fish sandwich set to the Bosphorus.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 620 }
        }, 'Rakı, Australian and European wine, and a thoughtful selection of Turkish bottles. Weekends bring DJs spinning Mediterranean records. Hamsi doesn\u2019t close between services — dock for lunch and stay for a sundowner.'),
        React.createElement('div', {
          style: { display: 'flex', gap: 32, paddingTop: 18, borderTop: '1px solid var(--hairline)', marginTop: 12 }
        },
          [['Chef', 'Somer Sivrioğlu'], ['Design', 'Alkot Studio'], ['Opened', 'Jan 2026']].map(([k, v]) =>
            React.createElement('div', { key: k, style: { display: 'flex', flexDirection: 'column', gap: 6 } },
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)' } }, k),
              React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18, color: 'var(--color-ink)' } }, v)
            )
          )
        )
      )
    )
  );

  // 2-up image montage
  const Montage = () => React.createElement('section', {
    style: { padding: '0 48px 0', background: 'var(--color-bone)' }
  },
    React.createElement('div', { style: { maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 } },
      React.createElement(HamsiFade, { style: { gridColumn: 1, marginTop: 64 } },
        React.createElement('img', { src: 'assets/images/hamsi-dish-1.jpg', style: { width: '100%', height: 600, objectFit: 'cover', display: 'block' } }),
        React.createElement('div', {
          style: { fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 14 }
        }, '01 — Cured hamsi, dill, pickled onion')
      ),
      React.createElement(HamsiFade, { delay: 100, style: { gridColumn: 2, marginTop: 0 } },
        React.createElement('img', { src: 'assets/images/hamsi-room.jpg', style: { width: '100%', height: 720, objectFit: 'cover', display: 'block' } }),
        React.createElement('div', {
          style: { fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 14 }
        }, '02 — The dining room, by Alkot Studio')
      )
    )
  );

  // Menu CTA — three menus: food, wine, cocktails
  const MenuCTA = () => {
    const menus = [
      { label: 'Food', sub: 'Charcoal, sea & sharing plates', href: 'https://hamsi.com.au/food-menu' },
      { label: 'Wine', sub: 'Turkish, Australian & European', href: 'https://hamsi.com.au/wine-list' },
      { label: 'Cocktails', sub: 'Rakı, anise & Aegean spritzes', href: 'https://hamsi.com.au/cocktails' }
    ];
    return React.createElement('section', {
      'data-screen-label': 'Hamsi — Menu',
      style: { padding: '80px 80px', background: 'var(--color-ink)', color: 'var(--color-bone)' }
    },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement(HamsiFade, null,
          React.createElement('div', {
            style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 20 }
          }, 'What we cook'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,4.2vw,64px)', margin: '0 0 72px', lineHeight: 1.02, letterSpacing: '-0.015em', color: 'var(--color-bone)' }
          }, 'The menus.')
        ),
        React.createElement('div', {
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, borderTop: '1px solid rgba(244,239,230,0.15)' }
        },
          menus.map(({ label, sub, href }, i) =>
            React.createElement(HamsiFade, { key: label, delay: i * 80 },
              React.createElement('a', {
                href, target: '_blank', rel: 'noopener',
                style: {
                  display: 'block', padding: '44px 0', borderBottom: '1px solid rgba(244,239,230,0.15)',
                  textDecoration: 'none', color: 'inherit', transition: 'color 200ms'
                },
                onMouseEnter: e => e.currentTarget.style.color = 'rgba(244,239,230,0.6)',
                onMouseLeave: e => e.currentTarget.style.color = 'var(--color-bone)'
              },
                React.createElement('div', {
                  style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.45)', marginBottom: 14 }
                }, `0${i + 1}`),
                React.createElement('div', {
                  style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28, lineHeight: 1.1, marginBottom: 10 }
                }, label),
                React.createElement('div', {
                  style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(244,239,230,0.5)' }
                }, sub),
                React.createElement('div', {
                  style: { marginTop: 24, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(244,239,230,0.5)', display: 'inline-block', paddingBottom: 2, color: 'rgba(244,239,230,0.7)' }
                }, 'View PDF')
              )
            )
          )
        )
      )
    );
  };


  // Gallery — cinematic full-bleed
  const Gallery = () => {
    const slides = [
  {
    "src": "assets/images/hamsi-gallery-1.jpg",
    "caption": "In the dining room"
  },
  {
    "src": "assets/images/hamsi-gallery-2.jpg",
    "caption": "The room at service"
  },
  {
    "src": "assets/images/hamsi-gallery-3.jpg",
    "caption": "Joinery — oak and Aegean glaze"
  },
  {
    "src": "assets/images/hamsi-gallery-4.jpg",
    "caption": "Charcoal grill — lobster on the spit"
  },
  {
    "src": "assets/images/hamsi-gallery-5.jpg",
    "caption": "Family — Somer with the team"
  },
  {
    "src": "assets/images/hamsi-gallery-6.jpg",
    "caption": "On the pass — kataifi prawn"
  },
  {
    "src": "assets/images/hamsi-gallery-7.jpg",
    "caption": "Service — three plates moving"
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
      'data-screen-label': 'Hamsi — Gallery',
      style: { width: '100%' }
    },
      React.createElement('div', { style: { padding: '120px 80px 60px', background: 'var(--color-bone)' } },
        React.createElement(HamsiFade, null,
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 18 } }, 'The Space'),
              React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.005em', textTransform: 'none', color: 'var(--color-ink)' } }, 'A room shaped by the water.')
            ),
            React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 19, color: 'var(--fg-2)', maxWidth: 400, lineHeight: 1.5 } }, 'Earthy palette, Aegean tiles, brass and timber — by Alkot Studio.')
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
        React.createElement('button', { onClick: e => { e.stopPropagation(); go(idx - 1); }, 'aria-label': 'Previous', style: { position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, padding: '16px 20px', opacity: hovered ? 0.9 : 0, transition: 'opacity 350ms' } }, '\u2190'),
        React.createElement('button', { onClick: e => { e.stopPropagation(); go(idx + 1); }, 'aria-label': 'Next', style: { position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 0, color: 'var(--color-bone)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, padding: '16px 20px', opacity: hovered ? 0.9 : 0, transition: 'opacity 350ms' } }, '\u2192'),
        React.createElement('div', { style: { position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, pointerEvents: 'none' } },
          slides.map((_, i) => React.createElement('div', {
            key: i,
            style: { width: i === idx ? 28 : 6, height: 2, background: 'var(--color-bone)', opacity: i === idx ? 0.9 : 0.35, transition: 'width 400ms cubic-bezier(.22,.61,.36,1), opacity 400ms' }
          }))
        )
      )
    );
  };

  // Quote / pull
  const Pull = () => React.createElement('section', {
    style: { padding: '160px 48px', background: 'var(--color-cream)', textAlign: 'center' }
  },
    React.createElement(HamsiFade, { style: { maxWidth: 980, margin: '0 auto' } },
      React.createElement(Eyebrow, { style: { marginBottom: 32 } }, 'In the Press'),
      React.createElement('blockquote', {
        style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px,3.4vw,48px)', lineHeight: 1.25, letterSpacing: '-0.005em', color: 'var(--color-ink)', margin: 0 }
      },
        '"Hamsi reflects everything myself and the Efendy Group stand for: taking Turkish food global without losing its soul. It\u2019s about confidence, generosity, and letting great produce, fire and flavour do the talking."'
      ),
      React.createElement('div', {
        style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 36 }
      }, 'Somer Sivrioğlu — Broadsheet, Jan 2026')
    )
  );

  // The Room
  const Room = () => React.createElement('section', {
    'data-screen-label': 'Hamsi — Room',
    style: { padding: '0', background: 'var(--color-bone)' }
  },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', minHeight: 640 } },
      React.createElement('div', { style: { padding: '120px 88px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 } },
        React.createElement(HamsiFade, null,
          React.createElement(Eyebrow, { style: { marginBottom: 8 } }, 'The Room'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,4.4vw,64px)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.012em', textTransform: 'none' }
          }, 'Sunshine yellow umbrellas, water at your back.'),
          React.createElement('p', {
            style: { fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 460 }
          }, 'Earthy colours, stylish tiles, contemporary pieces. Fit-out by Alkot Studio. Floor-to-ceiling water views with Anzac Bridge in the middle distance. The terrace is dressed in sunshine-yellow umbrellas and folds open to the breeze.'),
          React.createElement('div', {
            style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, marginTop: 8, borderTop: '1px solid var(--hairline)' }
          },
            [['Capacity', '90 seated · 130 standing'], ['Private', 'Room for 22'], ['Terrace', 'Yes — water-side'], ['Music', 'Mediterranean DJs, weekends']].map(([k, v], i) =>
              React.createElement('div', {
                key: k,
                style: {
                  padding: '18px 0', borderBottom: '1px solid var(--hairline)',
                  paddingRight: (i % 2 === 0) ? 24 : 0, paddingLeft: (i % 2 === 1) ? 24 : 0,
                  borderRight: (i % 2 === 0) ? '1px solid var(--hairline)' : 'none'
                }
              },
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)' } }, k),
                React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 18, color: 'var(--color-ink)', marginTop: 4 } }, v)
              )
            )
          )
        )
      ),
      React.createElement('div', { style: { position: 'relative', overflow: 'hidden', minHeight: 640 } },
        React.createElement('img', {
          src: 'assets/images/hamsi-dish-3.jpg',
          style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
        })
      )
    )
  );

  // Hamsi Street takeaway
  const Street = () => React.createElement('section', {
    style: { padding: '160px 48px', background: 'var(--color-ink)', color: 'var(--color-bone)' }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' } },
      React.createElement(HamsiFade, null,
        React.createElement('div', {
          style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.6)', marginBottom: 18 }
        }, 'Next door · Open Wed–Sun, 10–5'),
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,4.6vw,68px)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.012em', textTransform: 'none', color: 'var(--color-bone)' }
        }, 'Hamsi Street.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, lineHeight: 1.5, color: 'rgba(244,239,230,0.85)', margin: '20px 0 0', maxWidth: 480 }
        }, 'Istanbul street food to take away. Balık ekmek, simit, pide, lokum — handed across the counter, eaten on the wharf.'),
        React.createElement('div', { style: { display: 'flex', gap: 18, marginTop: 32 } },
          React.createElement(Button, { variant: 'onDark' }, 'Order Online'),
          React.createElement(Button, { variant: 'outlineLight' }, 'See the Menu')
        )
      ),
      React.createElement(HamsiFade, { delay: 120 },
        React.createElement('img', {
          src: 'assets/images/hamsi-dish-2.jpg',
          style: { width: '100%', height: 540, objectFit: 'cover', display: 'block' }
        })
      )
    )
  );

  // Visit
  const Visit = () => {
    const days = [
      ['Monday', '11.30am – 10pm'],
      ['Tuesday', '11.30am – 10pm'],
      ['Wednesday', '11.30am – 10pm'],
      ['Thursday', '11.30am – 10pm'],
      ['Friday', '11.30am – late'],
      ['Saturday', '11.30am – late'],
      ['Sunday', '11.30am – 10pm']
    ];
    return React.createElement('section', {
      'data-screen-label': 'Hamsi — Visit',
      style: { padding: '160px 48px', background: 'var(--color-bone)' }
    },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement(HamsiFade, null,
          React.createElement(Eyebrow, { style: { marginBottom: 18 } }, 'Visit'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,5vw,72px)', margin: 0, lineHeight: 1.0, letterSpacing: '-0.012em', textTransform: 'none', marginBottom: 64 }
          }, 'Find us by the water.')
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64, paddingTop: 16, borderTop: '1px solid var(--hairline)' } },
          // Address
          React.createElement(HamsiFade, null,
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 32, marginBottom: 16 } }, 'Address'),
            React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, lineHeight: 1.4, color: 'var(--color-ink)' } },
              'Sydney Fish Market', React.createElement('br'),
              '1 Bridge Rd, Glebe', React.createElement('br'),
              'NSW 2037'
            ),
            React.createElement('a', {
              href: '#',
              style: { display: 'inline-block', marginTop: 20, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 2 }
            }, 'Open in Maps')
          ),
          // Contact
          React.createElement(HamsiFade, { delay: 80 },
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 32, marginBottom: 16 } }, 'Contact'),
            React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, lineHeight: 1.5, color: 'var(--color-ink)' } },
              '(02) 9188 1581', React.createElement('br'),
              'hello@hamsi.com.au'
            ),
            React.createElement('a', {
              href: '#',
              style: { display: 'inline-block', marginTop: 20, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 2 }
            }, '@hamsi.taverna')
          ),
          // Hours
          React.createElement(HamsiFade, { delay: 160 },
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 32, marginBottom: 16 } }, 'Hours'),
            React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
              days.map(([d, h]) => React.createElement('li', {
                key: d,
                style: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--hairline)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-2)' }
              }, React.createElement('span', null, d), React.createElement('span', null, h)))
            ),
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', marginTop: 14, fontStyle: 'italic' } }, 'No break between services.')
          )
        ),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'center', marginTop: 80 }
        }, React.createElement(Button, { variant: 'primary', style: { padding: '18px 36px' } }, 'Book a Table'))
      )
    );
  };

  return React.createElement('div', { 'data-screen-label': 'Hamsi Page' },
    React.createElement(SubNav),
    React.createElement(Hero),
    React.createElement(Intro),
    React.createElement(Montage),
    React.createElement(Gallery),
    React.createElement(MenuCTA),
    React.createElement(Pull),
    React.createElement(Room),
    React.createElement(Street),
    React.createElement(Visit),
    React.createElement(Footer)
  );
}

window.HamsiPage = HamsiPage;
