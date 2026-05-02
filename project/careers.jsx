/* @jsx React.createElement */
const { useState, useEffect } = React;

function CareersPage() {
  const { Footer } = window;
  const { SubPageNav, PageFade } = window;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const roles = [
    { title: 'Head Chef', venue: 'Hamsi Taverna', location: 'Sydney Fish Market, Pyrmont', type: 'Full-time', desc: 'We are looking for an experienced head chef to lead the Hamsi kitchen. You will drive the menu — charcoal-focused, seafood-led, Turkish in spirit. Experience with live-fire cooking essential.' },
    { title: 'Floor Manager', venue: 'Anason', location: 'Barangaroo, Sydney', type: 'Full-time', desc: 'Lead the floor at one of Sydney\'s most recognisable Turkish restaurants. You are warm, exacting, and fluent in the rhythms of a busy harbour-side service.' },
    { title: 'Sous Chef', venue: 'Maydanoz', location: '50 Carrington St, Sydney CBD', type: 'Full-time', desc: 'Support the head chef in building a produce-driven, Aegean-inspired menu. Strong understanding of vegetable cookery and olive oil-based dishes preferred.' },
    { title: 'Waiter / Waitress', venue: 'All Sydney Venues', location: 'Sydney CBD & Pyrmont', type: 'Casual & Full-time', desc: 'We are always looking for passionate, warm hospitality professionals across all venues. Previous restaurant experience required; knowledge of Turkish cuisine is a bonus.' },
    { title: 'Bar Manager', venue: 'Anason', location: 'Barangaroo, Sydney', type: 'Full-time', desc: 'Build and lead the bar programme at Anason — raki, natural wine, and seasonal cocktails. Deep interest in Turkish spirits culture and natural wine essential.' },
    { title: 'Events Coordinator', venue: 'Efendy Group', location: 'Sydney (Group Office)', type: 'Full-time', desc: 'Coordinate private dining, off-site catering, and group events across all five venues. Bilingual (English/Turkish) preferred. Strong organisational skills essential.' }
  ];

  return React.createElement('div', { style: { background: 'var(--color-bone)' } },
    React.createElement(SubPageNav, { title: 'Careers', scrolled }),
    // Hero
    React.createElement('section', { style: { position: 'relative', minHeight: 520, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' } },
      React.createElement('img', { src: 'assets/images/anason-gallery-6.jpg', style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 } }),
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)' } }),
      React.createElement('div', { style: { position: 'relative', padding: '80px', color: 'var(--color-bone)', maxWidth: 800 } },
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.7)', marginBottom: 20 } }, 'Work with us'),
          React.createElement('h1', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px,6vw,80px)', lineHeight: 1.0, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-bone)' } }, 'Join the table.'),
          React.createElement('p', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: 'rgba(244,239,230,0.9)', margin: '24px 0 0', maxWidth: 560 } }, 'We are a group of people who care deeply about food, hospitality and each other. If that sounds like you, we\'d love to hear from you.')
        )
      )
    ),
    // Values
    React.createElement('section', { style: { padding: '120px 80px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 } },
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Why Efendy Group'),
          React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,3.6vw,52px)', lineHeight: 1.08, letterSpacing: '-0.01em', margin: '0 0 28px', color: 'var(--color-ink)' } }, 'Guided by warmth, driven by craft.'),
          React.createElement('p', { style: { fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0, maxWidth: 480 } }, 'Efendy Group is built on the belief that genuine hospitality begins with the people who deliver it. We invest in our team — through mentorship, travel, culinary education and fair conditions — because we know that a great restaurant is only as good as the people in it.')
        ),
        React.createElement(PageFade, { delay: 100 },
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--hairline)' } },
            [
              ['Culture', 'A warm, professional environment where Turkish hospitality shapes every interaction.'],
              ['Growth', 'Clear pathways from junior to senior roles, with mentorship from some of Australia\'s leading chefs.'],
              ['Travel', 'Annual opportunities to spend time in Istanbul, working alongside the Efendy Istanbul team.'],
              ['Benefits', 'Meals during service, staff discounts, access to group events and tastings.']
            ].map(([k, v]) => React.createElement('div', {
              key: k,
              style: { padding: '24px 0', borderBottom: '1px solid var(--hairline)', display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24 }
            },
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)', paddingTop: 2 } }, k),
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)' } }, v)
            ))
          )
        )
      )
    ),
    // Open roles
    React.createElement('section', { style: { padding: '0 80px 140px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Open Positions'),
          React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4vw,56px)', margin: '0 0 64px', lineHeight: 1.05, letterSpacing: '-0.01em', color: 'var(--color-ink)' } }, "Current openings.")
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--hairline)' } },
          roles.map((r, i) => React.createElement('div', {
            key: i,
            style: { borderBottom: '1px solid var(--hairline)', overflow: 'hidden' }
          },
            React.createElement('button', {
              onClick: () => setOpen(open === i ? null : i),
              style: {
                width: '100%', background: 'transparent', border: 0, padding: '28px 0', cursor: 'pointer',
                display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 32, alignItems: 'center', textAlign: 'left',
                transition: 'opacity 180ms'
              },
              onMouseEnter: e => e.currentTarget.style.opacity = '0.7',
              onMouseLeave: e => e.currentTarget.style.opacity = '1'
            },
              React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28, color: 'var(--color-ink)', letterSpacing: '-0.005em' } }, r.title),
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.08em' } }, r.venue),
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.08em' } }, r.type),
              React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-ink)', transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 300ms cubic-bezier(.22,.61,.36,1)' } }, '+')
            ),
            open === i && React.createElement('div', {
              style: { padding: '0 0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }
            },
              React.createElement('div', null,
                React.createElement('p', { style: { fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', margin: '0 0 24px' } }, r.desc),
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 } }, r.location)
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'flex-start' } },
                React.createElement('a', {
                  href: 'mailto:careers@efendygroup.com',
                  style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '15px 32px', background: 'var(--color-ink)', color: 'var(--color-bone)', textDecoration: 'none', display: 'inline-block', textAlign: 'center', transition: 'opacity 180ms' },
                  onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
                  onMouseLeave: e => e.currentTarget.style.opacity = '1'
                }, 'Apply Now'),
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5 } }, 'Send your CV and a brief note to', React.createElement('br'), React.createElement('a', { href: 'mailto:careers@efendygroup.com', style: { color: 'var(--color-ink)' } }, 'careers@efendygroup.com'))
              )
            )
          ))
        )
      )
    ),
    React.createElement(Footer, null)
  );
}

window.CareersPage = CareersPage;
