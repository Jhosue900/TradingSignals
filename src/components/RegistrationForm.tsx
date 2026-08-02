import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

interface RegistrationFormProps {
  selectedPlan: "Básico" | "Premium";
  isOnlyAuthView?: boolean; // Nueva prop opcional para cuando se renderice en la ruta /login
}

const INSTRUMENTS = [
  { icon: "📊", label: "Índices" },
  { icon: "₿", label: "Crypto" },
  { icon: "🛢️", label: "Materias primas" },
  { icon: "💱", label: "Forex" },
  { icon: "📈", label: "Acciones" },
  { icon: "📑", label: "Bonos" },
  { icon: "🥇", label: "Metales" },
  { icon: "📦", label: "ETFs" },
];

const inputStyle: React.CSSProperties = {
  background: "#FDFAF5",
  border: "1px solid #C8C0B0",
  color: "#1A1A1A",
  padding: "10px 12px",
  fontSize: "13px",
  fontFamily: "'Source Serif 4', Georgia, serif",
  outline: "none",
  transition: "border-color 0.15s",
  width: "100%",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#6B6B6B",
};

export default function RegistrationForm({
  selectedPlan,
  isOnlyAuthView = false,
}: RegistrationFormProps) {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(isOnlyAuthView);
  const [plan, setPlan] = useState<"Básico" | "Premium">(selectedPlan);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState(""); // Campo requerido para Supabase Auth
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const server = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

  useEffect(() => {
    setPlan(selectedPlan);
  }, [selectedPlan]);

  const toggleInstrument = (label: string) =>
    setSelectedInstruments((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );

  const submitForm = async () => {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("El correo electrónico y la contraseña son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      if (isLoginMode) {
        console.log("👉 1. Iniciando Login...");
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
          });

        if (loginError) throw loginError;

        // Verificar estado del suscriptor
        const { data: profile } = await supabase
          .from("suscriptores")
          .select("estado, plan")
          .eq("id", loginData.user.id)
          .single();

        if (profile?.estado === "activo") {
          navigate("/omega");
        } else {
          // Reintentar pago si no está activo
          const response = await fetch(
            `${server}/api/checkout/create-session`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginData.session?.access_token}`,
              },
              body: JSON.stringify({ plan: profile?.plan || "basico" }),
            },
          );
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          window.location.href = data.url;
        }
      } else {
        // --- REGISTRO ---
        if (!nombre.trim() || !fecha || !telefono.trim()) {
          setError(
            "Por favor completa todos los campos obligatorios del registro.",
          );
          setLoading(false);
          return;
        }
        if (selectedInstruments.length === 0) {
          setError("Selecciona al menos un instrumento que operas.");
          setLoading(false);
          return;
        }
        if (selectedInstruments.length > 5 && plan === "Básico") {
          setError(
            "Para elegir más de 5 instrumentos debes seleccionar la suscripción premium.",
          );
          setLoading(false);
          return;
        }

        // console.log(" 1. Creando usuario en Supabase Auth...");


        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: email.trim(),
            password: password,
          },
        );

        if (authError) throw authError;

        if (!authData.user || !authData.session) {
          throw new Error(
            "No se obtuvo sesión activa de Supabase. Revisa si tienes 'Confirm Email' activado en Supabase Dashboard.",
          );
        }

        // console.log(" 2. Usuario creado:", authData.user.id);

        // console.log("3. Insertando en tabla suscriptores...");
        const { error: dbError } = await supabase.from("suscriptores").insert([
          {
            id: authData.user.id,
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            plan: plan === "Básico" ? "basico" : "premium",
            estado: "inactivo", // O 'pendiente_pago' si ajustaste el CHECK constraint
            creditos_disponibles: 0,
          },
        ]);

        if (dbError) throw dbError;

        /*console.log(
          " 4. Enviando petición al Backend:",
          `${server}/api/checkout/create-session`,
        ); */

        // Petición al backend enviando el JWT y el plan
        /*console.log(
          "4. Enviando petición al Backend:",
          `${server}/api/checkout/create-session`,
        ); */

        try {
          const token = authData.session?.access_token;
          if (!token) {
            throw new Error(
              "No se obtuvo el access_token de la sesión de Supabase.",
            );
          }

          const response = await fetch(
            `${server}/api/checkout/create-session`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                plan: plan === "Básico" ? "basico" : "premium",
              }),
            },
          );

          //console.log("STATUS HTTP:", response.status);

          const checkoutData = await response.json();

          if (!response.ok) {
            throw new Error(
              checkoutData.error || "Error devuelto por el backend.",
            );
          }

          //console.log("5. Redirigiendo a Stripe:", checkoutData.url);
          window.location.href = checkoutData.url;
        } catch (fetchErr: any) {
          //console.error(" ERROR ESPECÍFICO DEL FETCH:", fetchErr);
          throw fetchErr; // Lo atrapa el catch principal de submitForm
        }
      }
    } catch (err: any) {
      console.error(" Error en submitForm:", err);
      setError(
        err.message || "Ocurrió un error inesperado durante el proceso.",
      );
    } finally {
      setLoading(false); 
    }
  };
  if (success) {
    return (
      <section
        id="registro"
        style={{
          background: "#F5F1EA",
          borderTop: "3px double #C8C0B0",
          padding: "clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)",
        }}
      >
        <div
          style={{
            maxWidth: "620px",
            margin: "0 auto",
            textAlign: "center",
            padding: "40px 24px",
            background: "#FDFAF5",
            border: "1px solid #C8C0B0",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#1A1A1A",
              marginBottom: "8px",
            }}
          >
            ¡Bienvenido a TradingSignals!
          </h3>
          <p style={{ color: "#6B6B6B", fontSize: "13px", width: "250px" }}>
            Tu suscripción ha sido registrada. Revisa tu correo electrónico para
            confirmar y activar tus alertas y reportes de mercado.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="registro"
      style={{
        background: "#F5F1EA",
        borderTop: "3px double #C8C0B0",
        padding: "clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)",
      }}
    >
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

      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 700,
            color: "#1A1A1A",
          }}
        >
          {isLoginMode ? "Iniciar sesión" : "Crear mi suscripción"}
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#6B6B6B",
            marginTop: "6px",
            marginBottom: "20px",
          }}
        >
          {isLoginMode
            ? "Bienvenido de nuevo, inicia sesión con tus credenciales"
            : "Completa tu perfil para empezar a recibir señales y reportes personalizados en tu correo electrónico."}
        </p>

        {!isLoginMode && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "#FDFAF5",
              border: "1px solid #C8C0B0",
              padding: "8px 14px",
              margin: "18px 0",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
            }}
          >
            <span style={{ color: "#6B6B6B" }}>Plan seleccionado:</span>
            <strong style={{ color: "#B5841A" }}>{plan}</strong>
          </div>
        )}
        <div ref={formRef}>
          {error && (
            <div
              style={{
                background: "#f8e3e3",
                border: "1px solid #d4a0a0",
                padding: "10px 14px",
                marginBottom: "14px",
                fontSize: "12px",
                color: "#b00000",
              }}
            >
              {error}
            </div>
          )}

          <div className="ts-form-grid">
            {/* Campos que se ocultan si es solo Login para limpiar la interfaz */}
            {!isLoginMode && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label style={labelStyle}>Nombre completo</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Carlos Méndez García"
                    style={inputStyle}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label style={labelStyle}>Fecha de nacimiento</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={labelStyle}>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                style={inputStyle}
              />
            </div>

            {/* Campo unificado de Contraseña */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label style={labelStyle}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#B5841A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#C8C0B0")}
              />
            </div>

            {!isLoginMode && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label style={labelStyle}>Número de teléfono</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+52 555 000 0000"
                    style={inputStyle}
                  />
                </div>

                <div
                  className="ts-form-full"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ ...labelStyle, marginBottom: "2px" }}>
                    Instrumentos que operas{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        textTransform: "none",
                        letterSpacing: 0,
                        fontSize: "11px",
                      }}
                    >
                      (selecciona todos los que apliquen)
                    </span>
                  </div>
                  <div className="ts-instruments-grid">
                    {INSTRUMENTS.map((inst) => {
                      const isChecked = selectedInstruments.includes(
                        inst.label,
                      );
                      return (
                        <div
                          key={inst.label}
                          onClick={() => toggleInstrument(inst.label)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: isChecked
                              ? "rgba(181,132,26,0.07)"
                              : "#FDFAF5",
                            border: `1px solid ${isChecked ? "#B5841A" : "#C8C0B0"}`,
                            padding: "8px 10px",
                            cursor: "pointer",
                            fontSize: "11px",
                            color: isChecked ? "#8A6010" : "#3D3D3D",
                          }}
                        >
                          {inst.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="ts-form-full"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label style={labelStyle}>Plan a contratar</label>
                  <select
                    value={plan}
                    onChange={(e) =>
                      setPlan(e.target.value as "Básico" | "Premium")
                    }
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
              width: "100%",
              padding: "14px",
              background: "#B5841A",
              border: "none",
              color: "#FDFAF5",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: loading ? "default" : "pointer",
              marginTop: "18px",
            }}
          >
            {loading
              ? "Procesando..."
              : isLoginMode
                ? "Ingresar al Dashboard →"
                : "Activar suscripción →"}
          </button>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              style={{
                background: "none",
                border: "none",
                color: "#B5841A",
                fontSize: "13px",
                cursor: "pointer",
                textDecoration: "underline",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {isLoginMode
                ? "¿No tienes cuenta? Regístrate aquí"
                : "¿Ya tienes una cuenta? Inicia sesión"}
            </button>
          </div>

          <p
            style={{
              fontSize: "11px",
              color: "#6B6B6B",
              textAlign: "center",
              marginTop: "10px",
              fontStyle: "italic",
            }}
          >
            Tu información es confidencial y nunca será compartida con terceros.
            · ¿Dudas?{" "}
            <a
              href="tel:+5296199677288"
              style={{ color: "#B5841A", textDecoration: "none" }}
            >
              +52 961 996 7728
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
