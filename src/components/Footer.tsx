export default function Footer() {
  return (
    <footer style={{
      background: '#1A1A1A',
      color: '#888',
      textAlign: 'center',
      padding: 'clamp(12px, 2vw, 18px) clamp(16px, 4vw, 32px)',
      fontFamily: "'Inter', sans-serif",
      fontSize: '11px',
      borderTop: '1px solid #2A2A2A',
      lineHeight: 1.8,
    }}>
      <p>
        © 2025 <span style={{ color: '#B5841A' }}>TradingSignals</span> · Todos los derechos reservados · México
      </p>
      <p>
        Las señales y reportes son de carácter informativo y no constituyen asesoría financiera. Operar en mercados financieros implica riesgos. Consulta a un asesor certificado.
      </p>
    </footer>
  );
}