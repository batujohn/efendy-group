/* @jsx React.createElement */
const { useState } = React;

// ---------------- Primitives ----------------
function Eyebrow({ children, style }) {
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
      fontWeight: 500, color: 'var(--fg-2)', ...style
    }
  }, children);
}

function Button({ children, variant = 'primary', onClick, style }) {
  const base = {
    fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.16em',
    textTransform: 'uppercase', cursor: 'pointer', border: 0,
    padding: '14px 28px', borderRadius: 0,
    transition: 'opacity 180ms cubic-bezier(.22,.61,.36,1), background 180ms'
  };
  const variants = {
    primary: { background: 'var(--color-ink)', color: 'var(--color-bone)' },
    secondary: { background: 'transparent', color: 'var(--color-ink)', border: '1px solid var(--color-ink)', padding: '13px 27px' },
    onDark: { background: 'var(--color-bone)', color: 'var(--color-ink)' },
    ghost: { background: 'transparent', color: 'inherit', borderBottom: '1px solid currentColor', padding: '0 0 2px', letterSpacing: '0.04em' }
  };
  return React.createElement('button', {
    onClick, style: { ...base, ...variants[variant], ...style },
    onMouseEnter: e => e.currentTarget.style.opacity = '0.7',
    onMouseLeave: e => e.currentTarget.style.opacity = '1'
  }, children);
}

function NavLink({ children, onClick, active }) {
  return React.createElement('button', {
    onClick,
    style: {
      background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
      fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.16em',
      textTransform: 'uppercase', color: 'inherit',
      opacity: active ? 1 : 0.95,
      borderBottom: active ? '1px solid currentColor' : '1px solid transparent',
      paddingBottom: 2, transition: 'opacity 180ms'
    },
    onMouseEnter: e => e.currentTarget.style.opacity = '0.6',
    onMouseLeave: e => e.currentTarget.style.opacity = active ? 1 : 0.95
  }, children);
}

// ---------------- Nav ----------------
function Nav({ onNavigate, page, onOpenBook, onDark }) {
  const [venuesOpen, setVenuesOpen] = useState(false);
  const venues = ['Agnes','Biànca','Golden Avenue','hôntô','Idle','Le Royale Bar','LOS Bar','sAme sAme','The French Exit'];
  const color = onDark ? 'var(--color-bone)' : 'var(--color-ink)';
  return React.createElement('nav', {
    style: {
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px', color
    }
  },
    React.createElement('button', {
      onClick: () => onNavigate('home'),
      style: { background: 'transparent', border: 0, cursor: 'pointer', padding: 0 }
    },
      React.createElement('img', {
        src: '../../assets/logos/anyday-wordmark-white.png',
        alt: 'Anyday',
        style: { height: 18, filter: onDark ? 'brightness(0) invert(1)' : 'none' }
      })
    ),
    React.createElement('div', { style: { display: 'flex', gap: 28, alignItems: 'center', position: 'relative' } },
      React.createElement('div', {
        onMouseEnter: () => setVenuesOpen(true),
        onMouseLeave: () => setVenuesOpen(false),
        style: { position: 'relative' }
      },
        React.createElement(NavLink, { active: page.startsWith('venue') }, 'Venues'),
        venuesOpen && React.createElement('div', {
          style: {
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            marginTop: 12, background: 'var(--color-bone)', color: 'var(--color-ink)',
            padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 10,
            minWidth: 200, boxShadow: '0 18px 48px rgba(26,26,26,0.18)'
          }
        }, venues.map(v => React.createElement('button', {
          key: v,
          onClick: () => { setVenuesOpen(false); onNavigate(v === 'Agnes' ? 'venue-agnes' : 'home'); },
          style: {
            background: 'transparent', border: 0, padding: 0, textAlign: 'left',
            fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-ink)',
            cursor: 'pointer'
          }
        }, v)))
      ),
      React.createElement(NavLink, { onClick: () => onNavigate('about'), active: page === 'about' }, 'About'),
      React.createElement(NavLink, {}, "What's On"),
      React.createElement(NavLink, {}, 'Contact'),
      React.createElement(Button, {
        variant: onDark ? 'onDark' : 'primary',
        onClick: onOpenBook,
        style: { padding: '10px 20px', fontSize: 11 }
      }, 'Book a Table')
    )
  );
}

// ---------------- Hero ----------------
function Hero() {
  return React.createElement('section', {
    style: {
      position: 'relative', height: 'min(720px, 92vh)', overflow: 'hidden',
      background: 'var(--color-ink)'
    }
  },
    React.createElement('img', {
      src: '../../assets/images/hero-about.jpg',
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }
    }),
    React.createElement('div', {
      style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 100%)' }
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', left: 40, bottom: 56, color: 'var(--color-bone)',
        maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 18
      }
    },
      React.createElement(Eyebrow, { style: { color: 'var(--color-bone)', opacity: 0.85 } }, 'Brisbane · Since 2014'),
      React.createElement('h1', {
        style: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px,5.5vw,80px)', lineHeight: 1.05, margin: 0, letterSpacing: '-0.005em' }
      }, 'A meal you', React.createElement('br'), 'won\u2019t forget.'),
      React.createElement('div', {
        style: { fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.4, opacity: 0.92, maxWidth: 540 }
      }, 'A collective of restaurants, bars and a bakery, guided by warmth, integrity and humility.')
    )
  );
}

// ---------------- Intro / Editorial ----------------
function EditorialIntro() {
  return React.createElement('section', {
    style: { padding: '120px 40px', background: 'var(--color-bone)', display: 'flex', justifyContent: 'center' }
  },
    React.createElement('div', { style: { maxWidth: 880, textAlign: 'center' } },
      React.createElement(Eyebrow, { style: { marginBottom: 28 } }, 'About Anyday'),
      React.createElement('p', {
        style: {
          fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(22px, 2.4vw, 30px)',
          lineHeight: 1.45, color: 'var(--color-ink)', margin: 0
        }
      }, 'At Anyday, we create places that feel good to be in\u2014spaces shaped by genuine hospitality, a deep love for food and a belief in the quiet power of connection. Our venues are guided by instinct, not formulas, offering warmth, character, and moments that linger long after the table\u2019s been cleared.')
    )
  );
}

// ---------------- Venue Row ----------------
function VenueRow({ venue, onClick, reverse }) {
  return React.createElement('article', {
    style: {
      display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0,
      direction: reverse ? 'rtl' : 'ltr', alignItems: 'stretch'
    }
  },
    React.createElement('img', {
      src: venue.image,
      style: { width: '100%', height: 540, objectFit: 'cover', display: 'block', direction: 'ltr' }
    }),
    React.createElement('div', {
      style: {
        direction: 'ltr', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '40px 56px', gap: 18, background: 'var(--color-bone)'
      }
    },
      React.createElement('h2', {
        style: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, margin: 0, letterSpacing: '-0.005em', color: 'var(--color-ink)', textTransform: 'none' }
      }, venue.name),
      React.createElement('p', {
        style: { fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.45, color: 'var(--color-ink-soft)', margin: 0 }
      }, venue.description),
      React.createElement('div', { style: { display: 'flex', gap: 16, marginTop: 8 } },
        React.createElement(Button, { variant: 'secondary', onClick: () => onClick(venue) }, 'View Venue'),
        React.createElement(Button, { variant: 'primary' }, 'Book Now')
      )
    )
  );
}

// ---------------- Events ----------------
function EventsSection() {
  const events = [
    { title: 'Midday Menu at Golden Avenue', dates: 'Jan 1 \u2013 Dec 31, 2026', venue: 'Golden Avenue', img: '../../assets/images/events-1.jpg' },
    { title: 'Prix Fixe at The French Exit',  dates: 'Jan 1 \u2013 Dec 31, 2026', venue: 'The French Exit', img: '../../assets/images/events-2.jpg' },
    { title: 'Wine Bar Sundays at Agnes',     dates: 'Every Sunday',              venue: 'Agnes',         img: '../../assets/images/agnes-detail.jpg' }
  ];
  return React.createElement('section', {
    style: { padding: '100px 40px', background: 'var(--color-paper)' }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 } },
        React.createElement('div', null,
          React.createElement(Eyebrow, { style: { marginBottom: 12 } }, 'Coming Up at Anyday'),
          React.createElement('h2', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, margin: 0, letterSpacing: '-0.005em', textTransform: 'none' }
          }, 'What\u2019s On')
        ),
        React.createElement(Button, { variant: 'ghost' }, 'See All Upcoming Events')
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 } },
        events.map((e, i) => React.createElement('article', { key: i, style: { display: 'flex', flexDirection: 'column', gap: 14 } },
          React.createElement('img', { src: e.img, style: { width: '100%', height: 320, objectFit: 'cover' } }),
          React.createElement(Eyebrow, {}, e.dates),
          React.createElement('h3', {
            style: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, margin: 0, lineHeight: 1.2 }
          }, e.title),
          React.createElement('div', { style: { fontSize: 14, color: 'var(--fg-3)' } }, e.venue)
        ))
      )
    )
  );
}

// ---------------- Newsletter ----------------
function Newsletter() {
  return React.createElement('section', {
    style: { padding: '110px 40px', background: 'var(--color-cream)', textAlign: 'center' }
  },
    React.createElement('div', { style: { maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' } },
      React.createElement(Eyebrow, {}, 'Newsletter'),
      React.createElement('h2', {
        style: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px,3.2vw,42px)', margin: 0, lineHeight: 1.2, textTransform: 'none' }
      }, 'Receive the latest Anyday news directly to your inbox.'),
      React.createElement('div', { style: { display: 'flex', gap: 0, width: '100%', maxWidth: 480, marginTop: 12 } },
        React.createElement('input', {
          placeholder: 'Email Address',
          style: {
            flex: 1, background: 'transparent', border: 0, borderBottom: '1px solid var(--color-ink)',
            padding: '12px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-1)', outline: 'none'
          }
        }),
        React.createElement(Button, { variant: 'primary', style: { padding: '12px 24px', fontSize: 11 } }, 'Subscribe')
      )
    )
  );
}

// ---------------- Footer ----------------
function Footer() {
  const venues = ['Agnes','Biànca','Golden Avenue','hôntô','Le Royale Bar','LOS Bar','sAme sAme','The French Exit'];
  const links = ['Home','Venues','Event Spaces','Gift Vouchers','About','What\u2019s On','Careers','Contact'];
  return React.createElement('footer', {
    style: { padding: '80px 40px 40px', background: 'var(--color-bone)', color: 'var(--color-ink)' }
  },
    React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, paddingBottom: 56, borderBottom: '1px solid var(--hairline)' } },
      React.createElement('div', null,
        React.createElement(Eyebrow, { style: { marginBottom: 22 } }, 'Find a Table'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 32px' } },
          venues.map(v => React.createElement('a', { key: v, href: '#', style: { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-ink)', borderBottom: 0, padding: 0 } }, v))
        )
      ),
      React.createElement('div', null,
        React.createElement('img', { src: '../../assets/logos/anyday-wordmark-footer.png', style: { height: 36, marginBottom: 28 } }),
        React.createElement('p', { style: { maxWidth: 380, fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' } }, 'Brisbane-based collective of restaurants, bars and a bakery. Founded 2014.'),
        React.createElement('div', { style: { display: 'flex', gap: 14, marginTop: 18 } },
          React.createElement('img', { src: '../../assets/icons/instagram.png', style: { width: 22, height: 22 } }),
          React.createElement('img', { src: '../../assets/icons/facebook.png', style: { width: 22, height: 22 } })
        )
      )
    ),
    React.createElement('div', {
      style: { maxWidth: 1280, margin: '40px auto 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--fg-3)' }
    },
      React.createElement('div', { style: { display: 'flex', gap: 14, flexWrap: 'wrap' } }, links.map(l => React.createElement('a', { key: l, href: '#', style: { color: 'var(--fg-3)', borderBottom: 0 } }, l))),
      React.createElement('div', null, '© 2025 Anyday. All Rights Reserved.')
    )
  );
}

// ---------------- Booking Modal ----------------
function BookingModal({ open, onClose }) {
  if (!open) return null;
  return React.createElement('div', {
    onClick: onClose,
    style: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
    }
  },
    React.createElement('div', {
      onClick: e => e.stopPropagation(),
      style: {
        background: 'var(--color-bone)', maxWidth: 520, width: '100%', padding: 48,
        position: 'relative'
      }
    },
      React.createElement('button', {
        onClick: onClose,
        style: { position: 'absolute', top: 18, right: 22, background: 'transparent', border: 0, fontSize: 22, cursor: 'pointer', color: 'var(--fg-1)' }
      }, '\u00d7'),
      React.createElement(Eyebrow, { style: { marginBottom: 12 } }, 'Reservations'),
      React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 38, margin: '0 0 24px', lineHeight: 1.1, textTransform: 'none' } }, 'Book a Table'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
        React.createElement('select', {
          style: { background: 'transparent', border: 0, borderBottom: '1px solid var(--color-ink)', padding: '10px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-1)' }
        },
          ['Choose a venue','Agnes','Biànca','Golden Avenue','hôntô','Le Royale Bar','sAme sAme','The French Exit']
            .map(v => React.createElement('option', { key: v }, v))
        ),
        React.createElement('input', { type: 'date', style: { background: 'transparent', border: 0, borderBottom: '1px solid var(--color-ink)', padding: '10px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-1)' } }),
        React.createElement('input', { type: 'number', placeholder: 'Number of guests', defaultValue: 2, style: { background: 'transparent', border: 0, borderBottom: '1px solid var(--color-ink)', padding: '10px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-1)' } }),
        React.createElement(Button, { variant: 'primary', style: { marginTop: 16 } }, 'Find a Time')
      )
    )
  );
}

Object.assign(window, { Nav, Hero, EditorialIntro, VenueRow, EventsSection, Newsletter, Footer, BookingModal, Button, Eyebrow });
