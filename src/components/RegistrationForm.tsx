import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

interface RegistrationFormProps {
  selectedPlan: 'Básico' | 'Premium';
  isOnlyAuthView?: boolean; // Nueva prop opcional para cuando se renderice en la ruta /login
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

export default function RegistrationForm({ selectedPlan, isOnlyAuthView = false }: RegistrationFormProps) {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(isOnlyAuthView);
  const [plan, setPlan] = useState<'Básico' | 'Premium'>(selectedPlan);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState(''); // Campo requerido para Supabase Auth
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

  const submitForm = async () => {
    setError(null);
    
    // Validaciones comunes
    if (!email.trim() || !password.trim()) {
      setError('El correo electrónico y la contraseña son obligatorios.');
      return;
    }

    setLoading(true);

    try {
      if (isLoginMode) {
        // --- FLUJO DE INICIO DE SESIÓN ---
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (loginError) throw loginError;
        
        // Al iniciar sesión de manera exitosa, App.tsx detectará el cambio de estado y redirigirá.
      } else {
        // --- FLUJO DE REGISTRO COMPLETO ---
        if (!nombre.trim() || !fecha || !telefono.trim()) {
          setError('Por favor completa todos los campos obligatorios del registro.');
          setLoading(false);
          return;
        }
        if (selectedInstruments.length === 0) {
          setError('Selecciona al menos un instrumento que operas.');
          setLoading(false);
          return;
        }

        // 1. Crear el usuario en el módulo de Autenticación de Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // 2. Vincular los metadatos extendidos del formulario en tu tabla de uso público
          const { error: dbError } = await supabase
            .from('suscriptores')
            .insert([
              {
                id: authData.user.id, // Sincroniza el ID único generado por Auth
                nombre: nombre.trim(),
                email: email.trim().toLowerCase(),
                plan: plan === 'Básico' ? 'basico' : 'premium', // Mapeo exacto a las restricciones CHECK de tu BD
                estado: 'activo', // Activo por defecto para pruebas iniciales
                creditos_disponibles: plan === 'Básico' ? 5 : 10,
              }
            ]);

          if (dbError) throw dbError;
          setSuccess(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado durante el proceso.');
    } finally {
      setLoading(false);
    }
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
          {isLoginMode ? 'Iniciar sesión' : 'Crear mi suscripción'}
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
            {/* Campos que se ocultan si es solo Login para limpiar la interfaz */}
            {!isLoginMode && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={labelStyle}>Nombre completo</label>
                  <input
                    type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Carlos Méndez García" style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={labelStyle}>Fecha de nacimiento</label>
                  <input
                    type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={labelStyle}>Correo electrónico</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com" style={inputStyle}
              />
            </div>

            {/* Campo unificado de Contraseña */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={labelStyle}>Contraseña</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#B5841A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#C8C0B0')}
              />
            </div>

            {!isLoginMode && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={labelStyle}>Número de teléfono</label>
                  <input
                    type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+52 555 000 0000" style={inputStyle}
                  />
                </div>

                <div className="ts-form-full" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ ...labelStyle, marginBottom: '2px' }}>
                    Instrumentos que operas <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px' }}>(selecciona todos los que apliquen)</span>
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
                            fontSize: '11px',
                            color: isChecked ? '#8A6010' : '#3D3D3D',
                          }}
                        >
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
                    style={inputStyle}
                  >
                    <option value="Básico">Básico — $150 MXN / mes</option>
                    <option value="Premium">Premium — $300 MXN / mes</option>
                  </select>
                </div>
              </>
            )}
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
            }}
          >
            {loading ? 'Procesando...' : isLoginMode ? 'Ingresar al Dashboard →' : 'Activar suscripción →'}
          </button>


          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              style={{ background: 'none', border: 'none', color: '#B5841A', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', fontFamily: "'Inter', sans-serif" }}
            >
              {isLoginMode ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes una cuenta? Inicia sesión'}
            </button>
          </div>

          <p style={{ fontSize: '11px', color: '#6B6B6B', textAlign: 'center', marginTop: '10px', fontStyle: 'italic' }}>
            🔒 Tu información es confidencial y nunca será compartida con terceros. · ¿Dudas?{' '}
            <a href="tel:+5296199677288" style={{ color: '#B5841A', textDecoration: 'none' }}>+52 961 996 7728</a>
          </p>



        </div>
      </div>
    </section>
  );
}