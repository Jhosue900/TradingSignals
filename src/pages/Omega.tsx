import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Omega() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from('suscriptores')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  if (loading) return <div className="p-8 text-slate-400 font-mono">Cargando terminal Omega...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header interno */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-serif">Sección Omega</h1>
          <p className="text-sm text-slate-400 mt-1">Análisis institucional y seguimiento estratégico de empresas financieras.</p>
        </div>
        <div className="bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-xl">📊</span>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Créditos Mensuales</p>
            <p className="text-lg font-bold text-amber-400 font-mono">{profile?.creditos_disponibles ?? 0} Disponibles</p>
          </div>
        </div>
      </div>

      {/* Grid de Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4 font-serif">Empresas en Seguimiento Activo</h2>
          <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
            Aún no estás siguiendo ninguna empresa este mes. Utiliza un crédito abajo para comenzar.
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-md font-semibold text-slate-200 font-serif">Panel de Control de Membresía</h3>
          <div className="space-y-2 text-xs text-slate-400">
            <p>• <strong className="text-slate-300">Usuario:</strong> {profile?.nombre}</p>
            <p>• <strong className="text-slate-300">Email:</strong> {profile?.email}</p>
            <p>• <strong className="text-slate-300">Plan Actual:</strong> <span className="uppercase text-amber-500 font-semibold">{profile?.plan}</span></p>
          </div>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="w-full py-2 bg-slate-800 hover:bg-red-950 border border-slate-700 hover:border-red-800 text-slate-300 hover:text-red-200 text-xs font-semibold rounded transition-colors uppercase tracking-wider"
          >
            Cerrar Sesión Segura
          </button>
        </div>
      </div>
    </div>
  );
}