/* @jsx React.createElement */
const { useState, useEffect } = React;

function ContactPage() {
  const { Footer } = window;
  const { SubPageNav, PageFade } = window;
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', venue: '', message: '' });
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const venues = [
    { name: 'Efendy \u0130stanbul', address: 'Nisbetiye Cd. No:13, 34330 Be\u015fikta\u015f / \u0130stanbul', phone: '+90 212 269 86 26', email: 'hello@efendyistanbul.com', hours: 'Mon\u2013Sat, 12pm \u2013 11pm' },
    { name: 'Anason', address: '23 Barangaroo Avenue, Barangaroo NSW 2000', phone: '(02) 9188 1581', email: 'hello@anason.com.au', hours: 'Tue\u2013Sun, 12pm \u2013 late' },
    { name: 'Maydanoz', address: '50 Carrington Street, Sydney CBD NSW 2000', phone: '(02) 9427 9789', email: 'hello@maydanoz.com.au', hours: 'Mon\u2013Sat, 12pm \u2013 10pm' },
    { name: 'Hamsi Taverna', address: 'Sydney Fish Market, 1 Bridge Rd, Glebe NSW 2037', phone: '(02) 9188 1581', email: 'hello@hamsi.com.au', hours: 'Daily, 11.30am \u2013 10pm' }
  ];

  const inputStyle = { width: '100%', background: 'transparent', border: 0, borderBottom: '1px solid rgba(26,26,26,0.2)', padding: '14px 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--color-ink)', outline: 'none', boxSizing: 'border-box' };

  return React.createElement('div', { style: { background: 'var(--color-bone)' } },
    React.createElement(SubPageNav, { title: 'Contact', scrolled }),
    // Hero
    React.createElement('section', { style: { paddingTop: 160, paddingBottom: 80, paddingLeft: 80, paddingRight: 80, background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto' } },
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 20 } }, 'Get in Touch'),
          React.createElement('h1', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px,6vw,88px)', lineHeight: 0.98, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-ink)' } }, 'We\u2019d love to', React.createElement('br'), 'hear from you.')
        )
      )
    ),
    // Form + info
    React.createElement('section', { style: { padding: '0 80px 140px', background: 'var(--color-bone)' } },
      React.createElement('div', { style: { maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' } },
        // Form
        React.createElement(PageFade, null,
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 36 } }, 'Send a Message'),
          sent
            ? React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 28, color: 'var(--color-ink)', lineHeight: 1.3 } }, 'Thank you. We\u2019ll be in touch shortly.')
            : React.createElement('form', {
                onSubmit: e => { e.preventDefault(); if (form.name && form.email) setSent(true); },
                style: { display: 'flex', flexDirection: 'column', gap: 28 }
              },
                React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 } },
                  React.createElement('input', { placeholder: 'Your Name', required: true, value: form.name, onChange: e => setForm({...form, name: e.target.value}), style: inputStyle }),
                  React.createElement('input', { type: 'email', placeholder: 'Email Address', required: true, value: form.email, onChange: e => setForm({...form, email: e.target.value}), style: inputStyle })
                ),
                React.createElement('select', {
                  value: form.venue, onChange: e => setForm({...form, venue: e.target.value}),
                  style: { ...inputStyle, cursor: 'pointer' }
                },
                  React.createElement('option', { value: '' }, 'Select a venue or topic'),
                  ['Efendy \u0130stanbul', 'Anason', 'Maydanoz', 'Hamsi Taverna', 'Event Spaces & Private Dining', 'Efendy Davet (Catering)', 'Press & Media', 'Careers', 'Other'].map(v => React.createElement('option', { key: v }, v))
                ),
                React.createElement('textarea', {
                  placeholder: 'Your message', rows: 6, value: form.message, onChange: e => setForm({...form, message: e.target.value}),
                  style: { ...inputStyle, resize: 'vertical', borderBottom: 0, border: '1px solid rgba(26,26,26,0.2)', padding: '14px' }
                }),
                React.createElement('button', {
                  type: 'submit',
                  style: { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '16px 40px', background: 'var(--color-ink)', color: 'var(--color-bone)', border: 0, cursor: 'pointer', alignSelf: 'flex-start', transition: 'opacity 180ms' },
                  onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
                  onMouseLeave: e => e.currentTarget.style.opacity = '1'
                }, 'Send Message')
              )
        ),
        // Venue info
        React.createElement(PageFade, { delay: 100 },
          React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 36 } }, 'Find Us'),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--hairline)' } },
            venues.map(v => React.createElement('div', {
              key: v.name,
              style: { padding: '28px 0', borderBottom: '1px solid var(--hairline)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }
            },
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, color: 'var(--color-ink)', marginBottom: 8, lineHeight: 1.1 } }, v.name),
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--fg-2)' } }, v.address)
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'flex-start' } },
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-2)' } }, v.phone),
                React.createElement('a', { href: `mailto:${v.email}`, style: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink)' } }, v.email),
                React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', marginTop: 4, letterSpacing: '0.08em' } }, v.hours)
              )
            ))
          ),
          // Group office
          React.createElement('div', { style: { marginTop: 48, padding: 32, background: 'var(--color-ink)', color: 'var(--color-bone)' } },
            React.createElement('div', { style: { fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 12 } }, 'Group Office'),
            React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 20, lineHeight: 1.4, marginBottom: 8 } }, 'Nisbetiye Cd. No:13', React.createElement('br'), '34330 Be\u015fikta\u015f, \u0130stanbul'),
            React.createElement('a', { href: 'mailto:hello@efendygroup.com', style: { fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-bone)' } }, 'hello@efendygroup.com')
          )
        )
      )
    ),
    React.createElement(Footer, null)
  );
}

window.ContactPage = ContactPage;
