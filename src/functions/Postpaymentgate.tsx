import { useEffect, useState, ReactNode } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';

interface PostPaymentGateProps {
  userId: string;
  isAuthorized: boolean;
  refreshProfile: (userId: string) => Promise<any>;
  children: ReactNode;
}

const MAX_ATTEMPTS = 8;       // ~12s de reintentos totales
const POLL_INTERVAL_MS = 1500;

/**
 * Envuelve la ruta /omega. Si el usuario llega con ?session_id=... (redirect de Stripe)
 * y todavía no está autorizado, reintenta consultar el perfil unos segundos en vez de
 * mandarlo a /login de inmediato — le da tiempo al webhook de Stripe a procesar el pago
 * y actualizar `estado: 'activo'` en Supabase.
 */
export default function PostPaymentGate({
  userId,
  isAuthorized,
  refreshProfile,
  children,
}: PostPaymentGateProps) {
  const [searchParams] = useSearchParams();
  const hasSessionId = !!searchParams.get('session_id');

  const [attempts, setAttempts] = useState(0);
  const [gaveUp, setGaveUp] = useState(false);

  const shouldPoll = hasSessionId && !isAuthorized && !gaveUp;

  useEffect(() => {
    if (!shouldPoll) return;

    if (attempts >= MAX_ATTEMPTS) {
      setGaveUp(true);
      return;
    }

    const timer = setTimeout(async () => {
      await refreshProfile(userId);
      setAttempts((a) => a + 1);
    }, POLL_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [attempts, shouldPoll, refreshProfile, userId]);

  if (isAuthorized) {
    return <>{children}</>;
  }

  // Llegó con session_id y seguimos dentro de la ventana de reintentos
  if (hasSessionId && !gaveUp) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200 font-mono px-4">
        <div className="text-center space-y-3">
          <p className="animate-pulse">Confirmando tu pago con Stripe...</p>
          <p className="text-xs text-slate-500">Esto puede tardar unos segundos, no cierres esta pestaña.</p>
        </div>
      </div>
    );
  }

  // Se agotaron los intentos y el webhook nunca activó la cuenta
  if (gaveUp) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200 font-mono px-4">
        <div className="text-center space-y-3 max-w-sm">
          <p>No pudimos confirmar tu pago todavía.</p>
          <p className="text-xs text-slate-500">
            Si ya pagaste, esperá un momento y recargá esta página. Si el problema persiste, escribinos.
          </p>
        </div>
      </div>
    );
  }

  // No hay session_id y no está autorizado: caso normal, a /login
  return <Navigate to="/login" replace />;
}