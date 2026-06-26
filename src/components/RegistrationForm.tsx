import { useState, useEffect, useRef } from 'react';

interface RegistrationFormProps {
  selectedPlan: 'Básico' | 'Premium';
}

const INSTRUMENTS = [
  { icon: '📊', label: 'Índices' },
  { icon: '₿', label: 'Crypto' },
  { icon: '🛢️', label: 'Materias primas' },
  { icon: '💱', label: 'Forex' },
  { icon: '📈', label: 'Acciones' },
  { icon: '📑', label: 'Bonos' },
  { icon: '🥇', label: 'Metales' },
  { icon: '📦', label: 'ETFs' },
];

export default function RegistrationForm({ selectedPlan }: RegistrationFormProps) {
  const [plan, setPlan] = useState<'Básico' | 'Premium'>(selectedPlan);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlan(selectedPlan);
  }, [selectedPlan]);

  const toggleInstrument = (label: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const submitForm = () => {
    setError(null);
    if (!nombre.trim() || !email.trim() || !fecha || !telefono.trim()) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }
    if (!email.includes('@')) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }
    if (selectedInstruments.length === 0) {
      setError('Selecciona al menos un instrumento que operas.');
      return;
    }

    setLoading(true);
    // Client-side mock: just show success after a brief delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 800);
  };

  if (success) {
    return (
      <section id="registro" style={{ background: '#F5F1EA', borderTop: '3px double #C8C0B0', padding: '3.5rem 2.5rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', padding: '2.5rem', background: '#FDFAF5', border: '1px solid #C8C0B0', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1A1A1A' }}>¡Bienvenido a TradingSignals!</h3>
          <p style={{ color: '#6B6B6B', fontSize: '0.9rem' }}>Tu suscripción ha sido registrada. Revisa tu correo electrónico para confirmar y activar tus alertas y reportes de mercado.</p>
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>¿Necesitas ayuda? <a href="tel:+5296199677288" style={{ color: '#B5841A', textDecoration: 'none' }}>+52 961 996 7728</a></p>
        </div>
      </section>
    );
  }

  return (
    <section id="registro" style={{ background: '#F5F1EA', borderTop: '3px double #C8C0B0', padding: '3.5rem 2.5rem' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '0.4rem' }}>Crear mi suscripción</h2>
        <p style={{ fontSize: '0.95rem', color: '#6B6B6B', marginBottom: '2rem' }}>Completa tu perfil para empezar a recibir señales y reportes personalizados en tu correo electrónico.</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FDFAF5', border: '1px solid #C8C0B0', padding: '0.6rem 1rem', marginBottom: '1.75rem', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem' }}>
          <span>Plan seleccionado:</span>
          <strong style={{ color: '#B5841A' }}>{plan}</strong>
        </div>

        <div ref={formRef}>
          {error && (
            <div style={{ background: '#f8e3e3', border: '1px solid #d4a0a0', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#b00000', borderRadius: '2px' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B' }}>Nombre completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Carlos Méndez García"
                style={{ background: '#FDFAF5', border: '1px solid #C8C0B0', color: '#1A1A1A', padding: '0.7rem 0.85rem', fontSize: '0.92rem', fontFamily: "'Source Serif 4', serif", outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B' }}>Fecha de nacimiento</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={{ background: '#FDFAF5', border: '1px solid #C8C0B0', color: '#1A1A1A', padding: '0.7rem 0.85rem', fontSize: '0.92rem', fontFamily: "'Source Serif 4', serif", outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B' }}>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                style={{ background: '#FDFAF5', border: '1px solid #C8C0B0', color: '#1A1A1A', padding: '0.7rem 0.85rem', fontSize: '0.92rem', fontFamily: "'Source Serif 4', serif", outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B' }}>Número de teléfono</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+52 555 000 0000"
                style={{ background: '#FDFAF5', border: '1px solid #C8C0B0', color: '#1A1A1A', padding: '0.7rem 0.85rem', fontSize: '0.92rem', fontFamily: "'Source Serif 4', serif", outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '0.5rem' }}>
                Instrumentos que operas <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(selecciona todos los que apliquen)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
                {INSTRUMENTS.map((inst) => {
                  const isChecked = selectedInstruments.includes(inst.label);
                  return (
                    <div
                      key={inst.label}
                      onClick={() => toggleInstrument(inst.label)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '7px',
                        background: isChecked ? 'rgba(181,132,26,0.07)' : '#FDFAF5',
                        border: isChecked ? '1px solid #B5841A' : '1px solid #C8C0B0',
                        padding: '0.55rem 0.85rem', cursor: 'pointer', transition: 'all 0.15s', userSelect: 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isChecked) e.currentTarget.style.borderColor = '#B5841A';
                      }}
                      onMouseLeave={(e) => {
                        if (!isChecked) e.currentTarget.style.borderColor = '#C8C0B0';
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{inst.icon}</span>
                      <span style={{ fontSize: '0.82rem', fontFamily: "'Inter', sans-serif", color: isChecked ? '#8A6010' : '#3D3D3D', fontWeight: isChecked ? 500 : 400 }}>{inst.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: '1 / -1' }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B' }}>Plan a contratar</label>
              <select
                value={plan}
                onChange={(e) => {
                  const v = e.target.value as 'Básico' | 'Premium';
                  setPlan(v);
                }}
                style={{ background: '#FDFAF5', border: '1px solid #C8C0B0', color: '#1A1A1A', padding: '0.7rem 0.85rem', fontSize: '0.92rem', fontFamily: "'Source Serif 4', serif", outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              >
                <option value="Básico">Básico — $150 MXN / mes</option>
                <option value="Premium">Premium — $300 MXN / mes</option>
              </select>
            </div>
          </div>
          <button
            onClick={submitForm}
            disabled={loading}
            style={{ width: '100%', padding: '1rem', background: '#B5841A', border: 'none', color: '#FDFAF5', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '1.5rem', transition: 'background 0.2s', opacity: loading ? 0.7 : 1 }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#8A6010'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#B5841A'; }}
          >
            {loading ? 'Procesando...' : 'Activar suscripción →'}
          </button>
          <p style={{ fontSize: '0.78rem', color: '#6B6B6B', textAlign: 'center', marginTop: '0.75rem', fontStyle: 'italic' }}>
            🔒 Tu información es confidencial y nunca será compartida con terceros. · ¿Dudas? <a href="tel:+5296199677288" style={{ color: '#B5841A', textDecoration: 'none' }}>+52 961 996 7728</a>
          </p>
        </div>
      </div>
    </section>
  );
}
