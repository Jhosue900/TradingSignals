export default function ContactBar() {
  return (
    <div style={{
      background: '#1A1A1A',
      color: '#FDFAF5',
      padding: 'clamp(12px, 2vw, 18px) clamp(16px, 4vw, 32px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '10px',
    }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#999' }}>
        ¿Tienes preguntas antes de suscribirte? Contáctanos directamente:
      </p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {[
          { display: '+52 553 103 9219', tel: '+525531039219' },
        ].map((phone) => (
          <a
            key={phone.tel}
            href={`tel:${phone.tel}`}
            style={{
              color: '#FDFAF5',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#B5841A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FDFAF5')}
          >
            📞 {phone.display}
          </a>
        ))}
      </div>
    </div>
  );
}