/* @jsx React.createElement */
const { useState, useEffect } = React;

function EventSpacesPage() {
  const { Footer } = window;
  const { SubPageNav, PageFade } = window;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const spaces = [
    {
      venue: 'Anason', name: 'The Meyhane Room', img: 'assets/images/anason-gallery-2.jpg',
      capacity: 'Up to 80 seated · 120 standing', location: 'Barangaroo, Sydney',
      desc: 'The full Anason dining room, dressed for a private evening. Hire includes raki service, a custom meze menu, and a dedicated events team. The harbour is right outside.'
    },
    {
      venue: 'Maydanoz', name: 'The Marble Room', img: 'assets/images/maydanoz-gallery-1.jpg',
      capacity: 'Up to 60 seated · 90 standing', location: '50 Carrington St, Sydney CBD',
      desc: 'The emerald marble bar and its surrounds, for intimate corporate dinners, product launches, and private celebrations. Chef-led menu, natural wine list.'
    },
    {
      venue: 'Maydanoz', name: "Chef's Table", img: 'assets/images/maydanoz-chefstable.jpg',
      capacity: 'Up to 10 guests', location: '50 Carrington St, Sydney CBD',
      desc: 'A semi-private perch at the pass. The chef builds your menu that evening — seasonal, interactive, and entirely bespoke.'
    },
    {
      venue: 'Hamsi Taverna', name: 'The Wharf Room', img: 'assets/images/hamsi-gallery-2.jpg',
      capacity: 'Up to 22 seated · 40 standing', location: 'Sydney Fish Market, Pyrmont',
      desc: 'A private room with water views and the sounds of the market. Perfect for long lunches, team events and media occasions.'
    },
    {
      venue: 'Efendy İstanbul', name: 'Private Dining, Levent', img: 'assets/images/efendy-istanbul.jpg',
      capacity: 'Up to 30 seated', location: 'Beşiktaş, İstanbul',
      desc: 'A private dining room in the heart of Levent. For corporate visitors, cultural delegations and intimate celebrations in Istanbul. Available with sommelier and translator service.'
    },
    {
      venue: 'All Venues', name: 'Efendy Davet — Off-Site Catering', img: 'assets/images/anason-hero.jpg',
      capacity: 'From 20 to 500 guests', location: 'Sydney, Melbourne, İstanbul',
      desc: 'The Efendy Group kitchen comes to you. Wedding dinners, corporate receptions, cultural galas — anywhere in Australia or Turkey. Full crew, custom menu, raki service.'
    }
  ];

  return React.createElement('div', { style: { background: 'var(--color-bone)' } },
    React.createElement(SubPageNav, { title: 'Event Spaces', scrolled }),
    // Hero
    React.createElement('section', { style: { padding: '160px 80px 80px', background: 'var(--color-ink)', color: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' } },
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 20 } }, 'Private Dining & Events'),
          React.createElement('h1', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px,6vw,88px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-bone)' } }, 'A long table,', React.createElement('br'), 'set for you.')
        ),
        React.createElement(PageFade, { delay: 120 },
          React.createElement('p', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'rgba(244,239,230,0.85)', margin: '0 0 32px' } }, 'Five venues, two cities. Each space brings the warmth and generosity of Anatolian hospitality to your event — from an intimate Chef\'s Table to a harbour-side reception for 500.'),
          React.createElement('a', {
            href: 'contact.html',
            style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '15px 32px', background: 'var(--color-bone)', color: 'var(--color-ink)', textDecoration: 'none', display: 'inline-block', transition: 'opacity 180ms' },
            onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
            onMouseLeave: e => e.currentTarget.style.opacity = '1'
          }, 'Enquire Now')
        )
      )
    ),
    // Spaces
    React.createElement('section', { style: { padding: '120px 80px 140px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '72px 56px' } },
        spaces.map((sp, i) => React.createElement(PageFade, { key: i, delay: (i % 2) * 80 },
          React.createElement('article', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
            React.createElement('div', { style: { overflow: 'hidden' } },
              React.createElement('img', { src: sp.img, style: { width: '100%', height: 420, objectFit: 'cover', display: 'block', transition: 'transform 1200ms cubic-bezier(.22,.61,.36,1)' }, onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.03)', onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)' })
            ),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 } },
              React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 36, margin: 0, letterSpacing: '-0.01em', color: 'var(--color-ink)', lineHeight: 1.1 } }, sp.name),
              React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', whiteSpace: 'nowrap' } }, sp.venue)
            ),
            React.createElement('p', { style: { fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0 } }, sp.desc),
            React.createElement('div', { style: { display: 'flex', gap: 32, paddingTop: 16, borderTop: '1px solid var(--hairline)' } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 } }, 'Capacity'),
                React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 16, color: 'var(--color-ink)' } }, sp.capacity)
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 } }, 'Location'),
                React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 16, color: 'var(--color-ink)' } }, sp.location)
              )
            ),
            React.createElement('a', {
              href: 'contact.html',
              style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 2, textDecoration: 'none', alignSelf: 'flex-start' }
            }, 'Enquire')
          )
        ))
      )
    ),
    // Quote
    React.createElement('section', { style: { padding: '120px 80px', background: 'var(--color-cream)', textAlign: 'center' } },
      React.createElement(PageFade, { style: { maxWidth: 800, margin: '0 auto' } },
        React.createElement('blockquote', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(24px,2.8vw,40px)', lineHeight: 1.3, letterSpacing: '-0.005em', color: 'var(--color-ink)', margin: 0 } },
          '\u201cHospitality is not a service. It is a feeling you carry with you long after the table has been cleared.\u201d'
        ),
        React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 32 } }, 'Somer Sivrioğlu — Founder, Efendy Group')
      )
    ),
    React.createElement(Footer, null)
  );
}

window.EventSpacesPage = EventSpacesPage;
