/* @jsx React.createElement */
const { useState, useEffect, useRef } = React;

// ---------------- Scroll-fade in ----------------
function FadeIn({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return React.createElement('div', {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 600ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 600ms cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      ...style
    }
  }, children);
}

// ---------------- Primitives ----------------
function Eyebrow({ children, style }) {
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
      fontWeight: 500, color: 'var(--fg-3)', ...style
    }
  }, children);
}

function Button({ children, variant = 'primary', onClick, style }) {
  const base = {
    fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em',
    textTransform: 'uppercase', cursor: 'pointer', border: 0,
    padding: '15px 30px', borderRadius: 0, fontWeight: 500,
    transition: 'opacity 180ms cubic-bezier(.22,.61,.36,1), background 180ms, color 180ms'
  };
  const variants = {
    primary: { background: 'var(--color-ink)', color: 'var(--color-bone)' },
    secondary: { background: 'transparent', color: 'var(--color-ink)', border: '1px solid var(--color-ink)', padding: '14px 29px' },
    onDark: { background: 'var(--color-bone)', color: 'var(--color-ink)' },
    outlineLight: { background: 'transparent', color: 'var(--color-bone)', border: '1px solid var(--color-bone)', padding: '14px 29px' },
    ghost: { background: 'transparent', color: 'inherit', borderBottom: '1px solid currentColor', padding: '0 0 3px', letterSpacing: '0.12em', fontSize: 11 }
  };
  return React.createElement('button', {
    onClick, style: { ...base, ...variants[variant], ...style },
    onMouseEnter: e => { e.currentTarget.style.opacity = '0.7'; },
    onMouseLeave: e => { e.currentTarget.style.opacity = '1'; }
  }, children);
}

function NavLink({ children, onClick, active }) {
  return React.createElement('button', {
    onClick,
    style: {
      background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
      fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', fontWeight: 500,
      textTransform: 'uppercase', color: 'inherit',
      opacity: active ? 1 : 0.92,
      paddingBottom: 2, transition: 'opacity 180ms'
    },
    onMouseEnter: e => e.currentTarget.style.opacity = '0.55',
    onMouseLeave: e => e.currentTarget.style.opacity = active ? 1 : 0.92
  }, children);
}

// ---------------- Wordmark ----------------
function EfendyWordmark({ color = 'currentColor', size = 18 }) {
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-wordmark)', fontWeight: 500, fontSize: size,
      letterSpacing: '0.42em', textTransform: 'uppercase', color,
      paddingLeft: '0.42em' // optical balance for tracking
    }
  }, 'Efendy Group');
}

// ---------------- Nav ----------------
function Nav({ onDark, scrolled }) {
  const navBg = scrolled ? 'var(--color-bone)' : 'transparent';
  const color = scrolled ? 'var(--color-ink)' : (onDark ? 'var(--color-bone)' : 'var(--color-ink)');
  const borderB = scrolled ? '1px solid var(--hairline)' : '1px solid transparent';
  return React.createElement('nav', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '16px 48px' : '24px 48px',
      color, background: navBg, borderBottom: borderB,
      transition: 'all 320ms cubic-bezier(.22,.61,.36,1)'
    }
  },
    React.createElement('a', {
      href: '#top',
      style: { borderBottom: 0, color: 'inherit', display: 'flex', alignItems: 'center' }
    },
      React.createElement(EfendyWordmark, { size: 14 })
    ),
    React.createElement('div', { style: { display: 'flex', gap: 36, alignItems: 'center' } },
      React.createElement(NavLink, {}, 'Brands'),
      React.createElement(NavLink, {}, 'About'),
      React.createElement(NavLink, {}, 'Sustainability'),
      React.createElement(NavLink, {}, 'News'),
      React.createElement(NavLink, {}, 'Career'),
      React.createElement(NavLink, {}, 'Contact')
    )
  );
}

// ---------------- Hero ----------------
function Hero() {
  return React.createElement('section', {
    'data-screen-label': 'Hero',
    style: {
      position: 'relative', height: 'min(820px, 96vh)', overflow: 'hidden',
      background: 'var(--color-ink)'
    }
  },
    React.createElement('img', {
      src: 'assets/images/hero.jpg',
      style: {
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.86,
        transition: 'transform 1200ms cubic-bezier(.22,.61,.36,1)'
      }
    }),
    React.createElement('div', {
      style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)' }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', left: 48, right: 48, bottom: 72, color: 'var(--color-bone)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 64
      }
    },
      React.createElement(FadeIn, { style: { maxWidth: 760 } },
        React.createElement(Eyebrow, { style: { color: 'var(--color-bone)', opacity: 0.85, marginBottom: 24 } }, 'Sydney · İstanbul · Since 2007'),
        React.createElement('h1', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(44px,6.2vw,92px)', lineHeight: 1.02, margin: 0, letterSpacing: '-0.012em', color: 'rgb(244, 239, 230)' }
        }, 'An Anatolian', React.createElement('br'), 'culinary journey.')
      ),
      React.createElement(FadeIn, { delay: 200, style: { maxWidth: 360, paddingBottom: 8 } },
        React.createElement('div', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, lineHeight: 1.4, opacity: 0.92 }
        }, 'A celebrated hospitality collective of five distinctive brands, rooted in tradition, shaped by innovation.')
      )
    ),
    React.createElement('div', {
      style: {
        position: 'absolute', top: 0, bottom: 0, right: 32, display: 'flex',
        alignItems: 'center', writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        color: 'var(--color-bone)', opacity: 0.55,
        fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase'
      }
    }, 'Scroll to explore')
  );
}

// ---------------- Editorial Intro ----------------
function EditorialIntro() {
  return React.createElement('section', {
    'data-screen-label': 'About',
    style: { padding: '140px 48px 120px', background: 'var(--color-bone)' }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 96, alignItems: 'start' } },
      React.createElement(FadeIn, null,
        React.createElement(Eyebrow, { style: { marginBottom: 24 } }, 'About Efendy Group'),
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, lineHeight: 1.08, letterSpacing: '-0.005em', textTransform: 'none', color: 'var(--color-ink)' }
        }, 'Rooted in tradition,', React.createElement('br'), 'shaped by innovation.')
      ),
      React.createElement(FadeIn, { delay: 120, style: { display: 'flex', flexDirection: 'column', gap: 28 } },
        React.createElement('p', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 24, lineHeight: 1.5, color: 'var(--color-ink)', margin: 0 }
        }, 'Founded in 2007 in Sydney by Somer Sivrioğlu, Efendy Group has grown into a celebrated hospitality collective with five distinctive brands.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 620 }
        }, 'Inspired by the rich heritage of Turkish cuisine and the spirit of Anatolian hospitality, our mission is to share Türkiye\u2019s diverse culinary culture with both local and international audiences. Each brand reflects a unique interpretation of this vision—combining seasonal, locally sourced ingredients with traditional techniques and contemporary flair.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 620 }
        }, 'Driven by a dynamic team led by Berk Cemail and Fatih Kulle, Efendy Group proudly represents the evolving face of Turkish gastronomy on the global stage.'),
        React.createElement('div', { style: { marginTop: 8 } },
          React.createElement(Button, { variant: 'ghost' }, 'Read Our Story')
        )
      )
    )
  );
}

// ---------------- Venue Row (alternating layout) ----------------
function VenueRow({ venue, reverse, index, total }) {
  const [hovered, setHovered] = useState(false);
  return React.createElement('article', {
    'data-screen-label': `Venue — ${venue.name}`,
    style: {
      display: 'grid',
      gridTemplateColumns: reverse ? '1fr 1.15fr' : '1.15fr 1fr',
      gap: 0, alignItems: 'stretch', background: 'var(--color-bone)',
      borderTop: '1px solid var(--hairline)'
    }
  },
    // Image
    React.createElement('div', {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        position: 'relative', overflow: 'hidden',
        gridColumn: reverse ? 2 : 1, gridRow: 1,
        background: 'var(--color-cream)'
      }
    },
      React.createElement('img', {
        src: venue.image,
        style: {
          width: '100%', height: '100%', minHeight: 580, objectFit: 'cover', display: 'block',
          transform: hovered ? 'scale(1.03)' : 'scale(1.0)',
          transition: 'transform 1200ms cubic-bezier(.22,.61,.36,1)'
        }
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', top: 24, left: 24, color: 'var(--color-bone)',
          fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.9
        }
      }, venue.location)
    ),
    // Text
    React.createElement('div', {
      style: {
        gridColumn: reverse ? 1 : 2, gridRow: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '72px 88px', gap: 22
      }
    },
      React.createElement(FadeIn, null,
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 } },
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--fg-3)' } },
            String(index + 1).padStart(2, '0'), ' / ', String(total).padStart(2, '0')
          ),
          React.createElement('div', { style: { width: 40, height: 1, background: 'var(--color-line)' } }),
          React.createElement(Eyebrow, null, venue.year)
        ),
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px,5vw,76px)', margin: '14px 0 6px', letterSpacing: '-0.012em', color: 'var(--color-ink)', textTransform: 'none', lineHeight: 1.0 }
        }, venue.name),
        React.createElement('div', {
          style: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 18, color: 'var(--fg-3)', margin: '0 0 12px' }
        }, venue.tagline),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 480 }
        }, venue.description),
        React.createElement('div', { style: { display: 'flex', gap: 18, marginTop: 22, alignItems: 'center' } },
          React.createElement('a', { href: venue.id === 'hamsi' ? 'hamsi.html' : venue.id === 'maydanoz' ? 'maydanoz.html' : venue.id === 'anason' ? 'anason.html' : '#', style: { borderBottom: 0 } },
            React.createElement(Button, { variant: 'secondary' }, 'Discover')
          ),
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.08em' } }, venue.cuisine)
        )
      )
    )
  );
}

// ---------------- Venues — Grid layout (tweak option) ----------------
function VenueGrid({ venues }) {
  return React.createElement('section', {
    'data-screen-label': 'Brands',
    style: { padding: '0 48px 120px', background: 'var(--color-bone)' }
  },
    React.createElement('div', {
      style: { maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '64px 48px' }
    },
      venues.map((v, i) => React.createElement(FadeIn, { key: v.id, delay: (i % 2) * 80 },
        React.createElement('article', {
          style: { display: 'flex', flexDirection: 'column', gap: 18 }
        },
          React.createElement('div', { style: { position: 'relative', overflow: 'hidden' } },
            React.createElement('img', {
              src: v.image,
              style: { width: '100%', height: 460, objectFit: 'cover', display: 'block' }
            }),
            React.createElement('div', {
              style: {
                position: 'absolute', top: 18, left: 18, color: 'var(--color-bone)',
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.9
              }
            }, v.location)
          ),
          React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 16 } },
            React.createElement('h3', {
              style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 44, margin: 0, letterSpacing: '-0.01em', color: 'var(--color-ink)', lineHeight: 1 }
            }, v.name),
            React.createElement(Eyebrow, null, v.year)
          ),
          React.createElement('p', {
            style: { fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0, maxWidth: 520 }
          }, v.description),
          React.createElement('div', null,
            React.createElement('a', { href: v.id === 'hamsi' ? 'hamsi.html' : v.id === 'maydanoz' ? 'maydanoz.html' : v.id === 'anason' ? 'anason.html' : '#', style: { borderBottom: 0 } },
              React.createElement(Button, { variant: 'ghost' }, 'Discover')
            )
          )
        )
      ))
    )
  );
}

// ---------------- Awards ----------------
function Awards() {
  const awards = [
    { name: 'Michelin Guide Bib Gourmand', venue: 'Efendy İstanbul', years: '2024–2025' },
    { name: 'Gault & Millau Chef Table 2 Toques', venue: 'Efendy İstanbul', years: '2024–2025' },
    { name: 'One Hat, Good Food Guide', venue: 'Maydanoz', years: '2023–2025' },
    { name: 'İncili Gastronomi Guide 4 Pearls', venue: 'Efendy İstanbul', years: '2023–2025' },
    { name: 'One Hat, Good Food Guide', venue: 'Maydanoz', years: '2022–2025' },
    { name: 'RCNSW Awards of Excellence — Best Specialty Restaurant', venue: 'Anason', years: '2021–2025' }
  ];
  return React.createElement('section', {
    'data-screen-label': 'Awards',
    style: { padding: '140px 48px', background: 'var(--color-cream)' }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
      React.createElement(FadeIn, null,
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 40, flexWrap: 'wrap' } },
          React.createElement('div', null,
            React.createElement(Eyebrow, { style: { marginBottom: 18 } }, 'Recognition'),
            React.createElement('h2', {
              style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, letterSpacing: '-0.005em', textTransform: 'none', lineHeight: 1.05 }
            }, 'Awards & accolades.')
          ),
          React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 19, lineHeight: 1.5, color: 'var(--fg-2)', maxWidth: 460 } },
            'A quiet shelf of honours from guides we admire, across two cities and two decades of cooking.')
        )
      ),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--hairline)' }
      },
        awards.map((a, i) => React.createElement('div', {
          key: i,
          style: {
            padding: '32px 32px 32px 0',
            borderBottom: '1px solid var(--hairline)',
            borderRight: (i % 3 !== 2) ? '1px solid var(--hairline)' : 'none',
            paddingLeft: (i % 3 !== 0) ? 32 : 0,
            display: 'flex', flexDirection: 'column', gap: 8
          }
        },
          React.createElement(Eyebrow, { style: { color: 'var(--color-ember)' } }, a.years),
          React.createElement('div', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, color: 'var(--color-ink)', lineHeight: 1.25 }
          }, a.name),
          React.createElement('div', {
            style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 4 }
          }, a.venue)
        ))
      )
    )
  );
}

// ---------------- News / What's On ----------------
function News() {
  const items = [
    { eyebrow: 'New Opening', title: 'Hamsi Taverna arrives at Sydney Fish Market.', meta: 'Pyrmont · January 2026', img: 'assets/images/hamsi.jpg' },
    { eyebrow: 'Press', title: '"Taking Turkish food global without losing its soul." — Broadsheet.', meta: 'Broadsheet Sydney · February 2026', img: 'assets/images/anason.jpg' },
    { eyebrow: 'Now Serving', title: 'New winter menu at Efendy İstanbul.', meta: 'Beşiktaş · Seasonal', img: 'assets/images/efendy-istanbul.jpg' }
  ];
  return React.createElement('section', {
    'data-screen-label': 'News',
    style: { padding: '140px 48px', background: 'var(--color-bone)' }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
      React.createElement(FadeIn, null,
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, gap: 40 } },
          React.createElement('div', null,
            React.createElement(Eyebrow, { style: { marginBottom: 18 } }, 'Latest from the group'),
            React.createElement('h2', {
              style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, letterSpacing: '-0.005em', textTransform: 'none' }
            }, 'News & openings.')
          ),
          React.createElement(Button, { variant: 'ghost' }, 'All News')
        )
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 } },
        items.map((it, i) => React.createElement(FadeIn, { key: i, delay: i * 90 },
          React.createElement('article', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
            React.createElement('div', { style: { overflow: 'hidden' } },
              React.createElement('img', {
                src: it.img,
                style: { width: '100%', height: 320, objectFit: 'cover', display: 'block', transition: 'transform 1200ms cubic-bezier(.22,.61,.36,1)' },
                onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.03)',
                onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)'
              })
            ),
            React.createElement(Eyebrow, null, it.eyebrow),
            React.createElement('h3', {
              style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 26, margin: 0, lineHeight: 1.25, letterSpacing: '-0.005em', color: 'var(--color-ink)' }
            }, it.title),
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.08em' } }, it.meta)
          )
        ))
      )
    )
  );
}

// ---------------- Cookbooks & Products ----------------
function Cookbooks() {
  return React.createElement('section', {
    'data-screen-label': 'Cookbooks',
    style: { padding: '0', background: 'var(--color-ink)', color: 'var(--color-bone)' }
  },
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }
    },
      React.createElement('div', { style: { padding: '120px 88px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 } },
        React.createElement(FadeIn, null,
          React.createElement(Eyebrow, { style: { color: 'var(--color-bone)', opacity: 0.6, marginBottom: 8 } }, 'Books & Provisions'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,4.6vw,68px)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.012em', textTransform: 'none', color: 'var(--color-bone)' }
          }, 'Take a piece of', React.createElement('br'), 'the table home.'),
          React.createElement('p', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 19, lineHeight: 1.55, opacity: 0.78, margin: 0, maxWidth: 460 }
          }, 'Cookbooks by Somer Sivrioğlu, signed editions, pantry provisions and gift cards. Shipped from Sydney and Beşiktaş.'),
          React.createElement('div', { style: { display: 'flex', gap: 18, marginTop: 12 } },
            React.createElement(Button, { variant: 'onDark' }, 'Shop the Pantry'),
            React.createElement(Button, { variant: 'outlineLight' }, 'Browse Cookbooks')
          )
        )
      ),
      React.createElement('div', { style: { position: 'relative', minHeight: 580, overflow: 'hidden' } },
        React.createElement('img', {
          src: 'assets/images/about-2.jpg',
          style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
        })
      )
    )
  );
}

// ---------------- Private Dining / Davet ----------------
function PrivateDining() {
  return React.createElement('section', {
    'data-screen-label': 'Private Dining',
    style: { padding: '140px 48px', background: 'var(--color-paper)' }
  },
    React.createElement('div', {
      style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }
    },
      React.createElement(FadeIn, null,
        React.createElement('img', {
          src: 'assets/images/efendy-davet.jpg',
          style: { width: '100%', height: 540, objectFit: 'cover', display: 'block' }
        })
      ),
      React.createElement(FadeIn, { delay: 100, style: { display: 'flex', flexDirection: 'column', gap: 22 } },
        React.createElement(Eyebrow, null, 'Efendy Davet · Private Events'),
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: 0, lineHeight: 1.08, letterSpacing: '-0.005em', textTransform: 'none', color: 'var(--color-ink)' }
        }, 'A long table, set wherever you need it.'),
        React.createElement('p', {
          style: { fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 480 }
        }, 'Our team brings the flavour experiences of Efendy Group brands beyond the venue — special invitation menus, weddings, corporate dinners, and chef collaborations across both cities.'),
        React.createElement('ul', {
          style: { listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--hairline)' }
        },
          ['Private dining rooms at every venue', 'Off-site catering across NSW & İstanbul', 'Bespoke chef\u2019s table experiences', 'Cooking classes & cultural programs']
            .map((t, i) => React.createElement('li', {
              key: i,
              style: { padding: '14px 0', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-2)' }
            }, React.createElement('span', null, t),
               React.createElement('span', { style: { color: 'var(--fg-3)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' } }, '→')
            ))
        ),
        React.createElement('div', { style: { marginTop: 12 } },
          React.createElement(Button, { variant: 'secondary' }, 'Enquire')
        )
      )
    )
  );
}

// ---------------- Newsletter ----------------
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return React.createElement('section', {
    'data-screen-label': 'Newsletter',
    style: { padding: '130px 48px', background: 'var(--color-cream)', textAlign: 'center' }
  },
    React.createElement(FadeIn, { style: { maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' } },
      React.createElement(Eyebrow, null, 'Newsletter'),
      React.createElement('h2', {
        style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.4vw,48px)', margin: 0, lineHeight: 1.15, textTransform: 'none', letterSpacing: '-0.005em' }
      }, 'Sign up for special offers, events and updates from across the group.'),
      submitted
        ? React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-ink)', marginTop: 12 } }, 'Thank you. Welcome to the table.')
        : React.createElement('form', {
            onSubmit: e => { e.preventDefault(); if (email.trim()) setSubmitted(true); },
            style: { display: 'flex', gap: 0, width: '100%', maxWidth: 480, marginTop: 12 }
          },
          React.createElement('input', {
            value: email,
            onChange: e => setEmail(e.target.value),
            placeholder: 'Email Address',
            style: {
              flex: 1, background: 'transparent', border: 0, borderBottom: '1px solid var(--color-ink)',
              padding: '14px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-1)', outline: 'none'
            }
          }),
          React.createElement(Button, { variant: 'primary', style: { padding: '14px 26px', fontSize: 11 } }, 'Submit')
        )
    )
  );
}

// ---------------- Footer ----------------
function Footer() {
  const venues = [
    { name: 'Efendy İstanbul', address: 'Levent, Nisbetiye Cd No:13, 34330 Beşiktaş/İstanbul', phone: '+90 212 269 86 26', ig: '@efendy_istanbul' },
    { name: 'Anason Meze Bar', address: '23 Barangaroo Avenue, Barangaroo NSW 2000', phone: '(02) 9188 1581', ig: '@anasonmezebar' },
    { name: 'Maydanoz Sydney', address: 'Tower 2, 200 Barangaroo Avenue, Barangaroo NSW', phone: '(02) 9188 1581', ig: '@maydanoz.sydney' },
    { name: 'Hamsi Taverna', address: 'Sydney Fish Market, 1 Bridge Rd, Glebe NSW', phone: '(02) 9188 1581', ig: '@hamsi.taverna' }
  ];
  return React.createElement('footer', {
    style: { padding: '88px 48px 36px', background: 'var(--color-ink)', color: 'var(--color-bone)' }
  },
    React.createElement('div', { style: { maxWidth: 1320, margin: '0 auto' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 56, borderBottom: '1px solid rgba(244,239,230,0.18)' } },
        React.createElement('h2', {
          style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,5vw,72px)', margin: 0, lineHeight: 1.0, letterSpacing: '-0.012em', textTransform: 'none', color: 'var(--color-bone)' }
        }, 'Find us at the table.'),
        React.createElement(EfendyWordmark, { color: 'var(--color-bone)', size: 14 })
      ),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, padding: '56px 0', borderBottom: '1px solid rgba(244,239,230,0.18)' }
      },
        venues.map(v => React.createElement('div', { key: v.name, style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          React.createElement('div', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 24, lineHeight: 1.1, color: 'var(--color-bone)', marginBottom: 6 }
          }, v.name),
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'rgba(244,239,230,0.7)' } }, v.address),
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(244,239,230,0.7)' } }, v.phone),
          React.createElement('a', { href: '#', style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-bone)', borderBottom: '1px solid rgba(244,239,230,0.4)', alignSelf: 'flex-start', marginTop: 6, paddingBottom: 1 } }, v.ig)
        ))
      ),
      React.createElement('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, padding: '48px 0 32px' }
      },
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 6 } }, 'Visit'),
          [['Home','index.html'],['What\'s On','whats-on.html'],['Event Spaces','event-spaces.html'],['Gifts','gifts.html'],['Careers','careers.html'],['Contact','contact.html']].map(([l,h]) =>
            React.createElement('a', { key: l, href: h, style: { color: 'var(--color-bone)', fontSize: 14, borderBottom: 0, fontFamily: 'var(--font-body)' } }, l))
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 6 } }, 'Group Office'),
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'rgba(244,239,230,0.85)' } },
            'Levent, Nisbetiye Cd No:13', React.createElement('br'),
            '34330 Beşiktaş / İstanbul'),
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(244,239,230,0.85)' } }, 'hello@efendygroup.com')
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 6 } }, 'Follow'),
          React.createElement('div', { style: { display: 'flex', gap: 16 } },
            React.createElement('img', { src: 'assets/icons/instagram.png', style: { width: 22, height: 22, filter: 'brightness(0) invert(1)', opacity: 0.75 } }),
            React.createElement('img', { src: 'assets/icons/facebook.png', style: { width: 22, height: 22, filter: 'brightness(0) invert(1)', opacity: 0.75 } })
          )
        )
      ),
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 24, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)' }
      },
        React.createElement('div', null, '© 2026 Efendy Group. All rights reserved.'),
        React.createElement('div', { style: { display: 'flex', gap: 24 } },
          React.createElement('a', { href: '#', style: { color: 'inherit', borderBottom: 0 } }, 'Privacy'),
          React.createElement('a', { href: '#', style: { color: 'inherit', borderBottom: 0 } }, 'Terms'),
          React.createElement('a', { href: '#', style: { color: 'inherit', borderBottom: 0 } }, 'Site by Busy Istanbul')
        )
      )
    )
  );
}

Object.assign(window, {
  FadeIn, Eyebrow, Button, NavLink, EfendyWordmark,
  Nav, Hero, EditorialIntro, VenueRow, VenueGrid,
  Awards, News, Cookbooks, PrivateDining, Newsletter, Footer
});
