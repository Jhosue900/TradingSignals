export default function ContactBar() {
  return (
    <div style={{ background: '#1A1A1A', color: '#FDFAF5', padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#AAA' }}>¿Tienes preguntas antes de suscribirte? Contáctanos directamente:</p>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <a href="tel:+5296199677288" style={{ color: '#FDFAF5', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#B5841A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#FDFAF5')}>📞 +52 961 996 7728</a>
        <a href="tel:+525538944850" style={{ color: '#FDFAF5', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#B5841A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#FDFAF5')}>📞 +52 553 894 4850</a>
      </div>
    </div>
  );
}
