import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

import { useState } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Reports from './components/Reports';
import HowItWorks from './components/HowItWorks';
import RegistrationForm from './components/RegistrationForm';
import ContactBar from './components/ContactBar';
import Footer from './components/Footer';

function App() {
  const [selectedPlan, setSelectedPlan] = useState<'Básico' | 'Premium'>('Premium');
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Función interna para validar perfil y estado de suscripción
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('suscriptores')
          .select('*')
          .eq('id', userId)
          .single();

        if (data) {
          setUserProfile(data);
        } else if (error) {
          console.error('Error obteniendo perfil del suscriptor:', error.message);
        }
      } catch (err) {
        console.error('Error de red al consultar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    // Validar sesión inicial al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Escuchar cambios de estado en Auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200 font-mono">
        <p className="animate-pulse">Cargando ecosistema de inversión...</p>
      </div>
    );
  }

  // Helper para validar si el acceso al Dashboard está autorizado
  const isAuthorized = session && userProfile?.estado === 'activo';

  return (
    <div className="bg-slate-950 w-full min-h-screen text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
      <Routes>
        {/* RUTA PÚBLICA: Landing Page */}
        <Route path="/" element={
          <div className="max-w-1100 mx-auto px-4 sm:px-6 lg:px-8">
            <Header />
            <Ticker />
            <Hero />
            <Pricing onSelectPlan={setSelectedPlan} />
            <Reports />
            <HowItWorks />
            <RegistrationForm selectedPlan={selectedPlan} />
            <ContactBar />
            <Footer />
          </div>
        } />

        {/* RUTA PÚBLICA: Autenticación Unificada */}
        <Route path="/login" element={
          isAuthorized ? (
            <Navigate to="/omega" replace />
          ) : (
            <div className="py-12 px-4 max-w-md mx-auto">
              <RegistrationForm selectedPlan={selectedPlan} isOnlyAuthView={true} />
            </div>
          )
        } />

        {/* RUTAS PRIVADAS: Dashboard Protegido por Sesión y Estado Activo */}
        <Route path="/omega" element={
          isAuthorized ? (
            <div className="p-8 text-white">
              <h1 className="text-2xl font-bold mb-4">Zona Omega</h1>
              <p>Créditos disponibles este mes: <span className="text-amber-400 font-bold">{userProfile?.creditos_disponibles ?? 0}</span></p>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        <Route path="/portfolio" element={
          isAuthorized ? (
            <div className="p-8 text-white"><h1>Sección Portafolio (Modelados Financieros)</h1></div>
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        <Route path="/library" element={
          isAuthorized ? (
            <div className="p-8 text-white"><h1>Biblioteca de Reportes Guardados</h1></div>
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        {/* Fallback de seguridad */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;