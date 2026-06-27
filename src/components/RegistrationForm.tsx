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

const inputStyle: React.CSSProperties = {
  background: '#FDFAF5',
  border: '1px solid #C8C0B0',
  color: '#1A1A1A',
  padding: '10px 12px',
  fontSize: '13px',
  fontFamily: "'Source Serif 4', Georgia, serif",
  outline: 'none',
  transition: 'border-color 0.15s',
  width: '100%',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#6B6B6B',
};

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

  useEffect(() => { setPlan(selectedPlan); }, [selectedPlan]);

  const toggleInstrument = (label: string) =>
    setSelectedInstruments((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

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
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  };

  if (success) {
    return (
      <section id="registro" style={{ background: '#F5F1EA', borderTop: '3px double #C8C0B0', padding: 'clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center', padding: '40px 24px', background: '#FDFAF5', border: '1px solid #C8C0B0' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>✅</div>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
            ¡Bienvenido a TradingSignals!
          </h3>
          <p style={{ color: '#6B6B6B', fontSize: '13px' }}>
            Tu suscripción ha sido registrada. Revisa tu correo electrónico para confirmar y activar tus alertas y reportes de mercado.
          </p>
          <p style={{ marginTop: '10px', fontSize: '12px' }}>
            ¿Necesitas ayuda?{' '}
            <a href="tel:+5296199677288" style={{ color: '#B5841A', textDecoration: 'none' }}>+52 961 996 7728</a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="registro" style={{ background: '#F5F1EA', borderTop: '3px double #C8C0B0', padding: 'clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)' }}>
      <style>{`
        .ts-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .ts-form-full {
          grid-column: 1 / -1;
        }
        .ts-instruments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 8px;
          margin-top: 6px;
        }
        @media (max-width: 480px) {
          .ts-form-grid {
            grid-template-columns: 1fr;
          }
          .ts-form-full {
            grid-column: 1;
          }
        }
      `}</style>

      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A1A1A' }}>
          Crear mi suscripción
        </h2>
        <p style={{ fontSize: '13px', color: '#6B6B6B', marginTop: '6px' }}>
          Completa tu perfil para empezar a recibir señales y reportes personalizados en tu correo electrónico.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FDFAF5',
          border: '1px solid #C8C0B0',
          padding: '8px 14px',
          margin: '18px 0',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
        }}>
          <span>Plan seleccionado:</span>
          <strong style={{ color: '#B5841A' }}>{plan}</strong>
        </div>

        <div ref={formRef}>
          {error && (
            <div style={{ background: '#f8e3e3', border: '1px solid #d4a0a0', padding: '10px 14px', marginBottom: '14px', fontSize: '12px', color: '#b00000' }}>
              {error}
            </div>
          )}

          <div className="ts-form-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={labelStyle}>Nombre completo</label>
              <input
                type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Carlos Méndez García" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={labelStyle}>Fecha de nacimiento</label>
              <input
                type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={labelStyle}>Correo electrónico</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={labelStyle}>Número de teléfono</label>
              <input
                type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                placeholder="+52 555 000 0000" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>

            <div className="ts-form-full" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ ...labelStyle, marginBottom: '2px' }}>
                Instrumentos que operas{' '}
                <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px' }}>
                  (selecciona todos los que apliquen)
                </span>
              </div>
              <div className="ts-instruments-grid">
                {INSTRUMENTS.map((inst) => {
                  const isChecked = selectedInstruments.includes(inst.label);
                  return (
                    <div
                      key={inst.label}
                      onClick={() => toggleInstrument(inst.label)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: isChecked ? 'rgba(181,132,26,0.07)' : '#FDFAF5',
                        border: `1px solid ${isChecked ? '#B5841A' : '#C8C0B0'}`,
                        padding: '8px 10px',
                        cursor: 'pointer',
                        transition: 'all 0.12s',
                        userSelect: 'none',
                        fontSize: '11px',
                        fontFamily: "'Inter', sans-serif",
                        color: isChecked ? '#8A6010' : '#3D3D3D',
                        fontWeight: isChecked ? 500 : 400,
                      }}
                      onMouseEnter={(e) => { if (!isChecked) e.currentTarget.style.borderColor = '#B5841A'; }}
                      onMouseLeave={(e) => { if (!isChecked) e.currentTarget.style.borderColor = '#C8C0B0'; }}
                    >
                      <span style={{ fontSize: '14px' }}>{inst.icon}</span>
                      {inst.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="ts-form-full" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={labelStyle}>Plan a contratar</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as 'Básico' | 'Premium')}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%236B6B6B' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  paddingRight: '28px',
                }}
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
            style={{
              width: '100%',
              padding: '14px',
              background: '#B5841A',
              border: 'none',
              color: '#FDFAF5',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: loading ? 'default' : 'pointer',
              marginTop: '18px',
              transition: 'background 0.15s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#8A6010'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#B5841A'; }}
          >
            {loading ? 'Procesando...' : 'Activar suscripción →'}
          </button>

          <p style={{ fontSize: '11px', color: '#6B6B6B', textAlign: 'center', marginTop: '10px', fontStyle: 'italic' }}>
            🔒 Tu información es confidencial y nunca será compartida con terceros. · ¿Dudas?{' '}
            <a href="tel:+5296199677288" style={{ color: '#B5841A', textDecoration: 'none' }}>+52 961 996 7728</a>
          </p>
        </div>
      </div>
    </section>
  );
}