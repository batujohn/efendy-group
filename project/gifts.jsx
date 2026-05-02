/* @jsx React.createElement */
const { useState, useEffect } = React;

function GiftsPage() {
  const { Footer } = window;
  const { SubPageNav, PageFade } = window;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const products = [
    { name: 'Gift Voucher — Any Venue', price: 'From $50', img: 'assets/images/anason-gallery-2.jpg', tag: 'Gift Cards', desc: 'A gift card redeemable at any Efendy Group venue in Sydney or Istanbul. Delivered digitally or by post.' },
    { name: 'Efendy — A Cookbook', price: '$65', img: 'assets/images/maydanoz-gallery-3.jpg', tag: 'Books', desc: 'Somer Sivrioğlu\'s debut cookbook — 80 recipes from the Turkish table, with stories from the Aegean coast and the Bosphorus.' },
    { name: 'Aegean Kitchen — A Second Cookbook', price: '$65', img: 'assets/images/hamsi-gallery-6.jpg', tag: 'Books', desc: 'Recipes inspired by the olive groves, fishing villages and coastal meze bars of Turkey\'s Aegean shoreline.' },
    { name: 'Anason Olive Oil', price: '$38', img: 'assets/images/maydanoz-gallery-7.jpg', tag: 'Pantry', desc: 'Cold-pressed Turkish olive oil, sourced from small growers in the Aegean. Used in every Efendy Group kitchen.' },
    { name: 'Raki Tasting Set', price: '$120', img: 'assets/images/anason-gallery-4.jpg', tag: 'Pantry', desc: 'Four raki expressions — from the classic Yeni Rakı to a small-batch artisan variety — with tasting notes by Somer.' },
    { name: 'Spice Collection', price: '$55', img: 'assets/images/maydanoz-gallery-4.jpg', tag: 'Pantry', desc: 'Eight Anatolian spices hand-selected by the Efendy Group kitchen team — sumac, Aleppo pepper, dried mint, and more.' }
  ];

  const tags = ['All', 'Gift Cards', 'Books', 'Pantry'];
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? products : products.filter(p => p.tag === filter);

  return React.createElement('div', { style: { background: 'var(--color-bone)' } },
    React.createElement(SubPageNav, { title: 'Gifts & Provisions', scrolled }),
    // Hero
    React.createElement('section', { style: { padding: '160px 80px 80px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' } },
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Books, provisions & gift cards'),
          React.createElement('h1', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px,6vw,88px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-ink)' } }, 'Take a piece', React.createElement('br'), 'of the table home.')
        ),
        React.createElement(PageFade, { delay: 120 },
          React.createElement('p', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--fg-2)', margin: '0 0 32px' } }, 'Cookbooks by Somer Sivrioğlu, pantry provisions from our kitchens, and gift cards for any Efendy Group venue. Shipped from Sydney and Beşiktaş.')
        )
      )
    ),
    // Filter
    React.createElement('section', { style: { padding: '0 80px 48px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 12 } },
        tags.map(t => React.createElement('button', {
          key: t, onClick: () => setFilter(t),
          style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '10px 22px', border: '1px solid var(--color-ink)', cursor: 'pointer', background: filter === t ? 'var(--color-ink)' : 'transparent', color: filter === t ? 'var(--color-bone)' : 'var(--color-ink)', transition: 'all 200ms' }
        }, t))
      )
    ),
    // Products
    React.createElement('section', { style: { padding: '0 80px 140px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 40px' } },
        filtered.map((p, i) => React.createElement(PageFade, { key: p.name, delay: (i % 3) * 80 },
          React.createElement('article', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
            React.createElement('div', { style: { overflow: 'hidden' } },
              React.createElement('img', { src: p.img, style: { width: '100%', height: 360, objectFit: 'cover', display: 'block', transition: 'transform 1200ms cubic-bezier(.22,.61,.36,1)' }, onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.03)', onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)' })
            ),
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)' } }, p.tag),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 } },
              React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 26, margin: 0, letterSpacing: '-0.005em', color: 'var(--color-ink)', lineHeight: 1.2 } }, p.name),
              React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20, color: 'var(--color-ink)', whiteSpace: 'nowrap' } }, p.price)
            ),
            React.createElement('p', { style: { fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0 } }, p.desc),
            React.createElement('button', {
              style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '13px 0', background: 'transparent', border: 0, borderBottom: '1px solid var(--color-ink)', cursor: 'pointer', color: 'var(--color-ink)', textAlign: 'left', marginTop: 8, transition: 'opacity 180ms' },
              onMouseEnter: e => e.currentTarget.style.opacity = '0.6',
              onMouseLeave: e => e.currentTarget.style.opacity = '1'
            }, 'Add to Cart')
          )
        ))
      )
    ),
    // Newsletter CTA
    React.createElement('section', { style: { padding: '120px 80px', background: 'var(--color-ink)', color: 'var(--color-bone)', textAlign: 'center' } },
      React.createElement(PageFade, { style: { maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' } },
        React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,3.4vw,48px)', margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em' } }, 'New books and seasonal provisions — announced first to our mailing list.'),
        React.createElement('div', { style: { display: 'flex', gap: 0, width: '100%', maxWidth: 460, marginTop: 8 } },
          React.createElement('input', { placeholder: 'Email Address', style: { flex: 1, background: 'transparent', border: 0, borderBottom: '1px solid rgba(244,239,230,0.4)', padding: '12px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--color-bone)', outline: 'none' } }),
          React.createElement('button', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '12px 24px', background: 'var(--color-bone)', color: 'var(--color-ink)', border: 0, cursor: 'pointer' } }, 'Subscribe')
        )
      )
    ),
    React.createElement(Footer, null)
  );
}

window.GiftsPage = GiftsPage;
