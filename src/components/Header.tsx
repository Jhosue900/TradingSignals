import { useMemo, useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = useMemo(() => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const hoy = new Date();
    return dias[hoy.getDay()] + ', ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()] + ' de ' + hoy.getFullYear();
  }, []);

  return (
    <header className="bg-[#FDFAF5] border-b-3 border-[#1A1A1A] border-double">
      {/* Barra superior */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-2 border-b border-[#C8C0B0] font-sans text-xs text-[#6B6B6B] gap-2">
        <span className="text-center sm:text-left">Edición digital · México</span>
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <a href="tel:+5296199677288" className="hover:text-accent transition-colors hide-on-mobile sm:inline">
            📞 +52 961 996 7728
          </a>
          <a href="tel:+525538944850" className="hover:text-accent transition-colors hide-on-mobile sm:inline">
            📞 +52 553 894 4850
          </a>
        </div>
        <span className="text-center text-[0.65rem] sm:text-xs whitespace-nowrap">{today}</span>
      </div>

      {/* Logo y título */}
      <div className="text-center py-4 px-4 sm:py-6 sm:px-10">
        <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink leading-none">
          Trading<span className="text-accent">Signals</span>
        </div>
        <div className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] text-[#6B6B6B] mt-1">
          Inteligencia de Mercados · Señales Profesionales en Tiempo Real
        </div>
      </div>

      {/* Navegación */}
      <nav className="border-t border-[#C8C0B0] relative">
        {/* Botón hamburguesa (solo móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block sm:hidden w-full py-3 text-center font-sans text-sm font-medium uppercase tracking-wider text-ink-mid bg-[#FDFAF5] hover:bg-paper transition-colors"
          aria-expanded={menuOpen}
          aria-label="Menú de navegación"
        >
          {menuOpen ? '✕ Cerrar' : '☰ Menú'}
        </button>

        {/* Enlaces */}
        <div className={`${menuOpen ? 'block' : 'hidden'} sm:flex sm:flex-wrap justify-center gap-0`}>
          {[
            { href: '#hero', label: 'Inicio' },
            { href: '#planes', label: 'Suscripciones' },
            { href: '#reportes', label: 'Reportes' },
            { href: '#como', label: 'Cómo funciona' },
            { href: '#registro', label: 'Suscribirme ahora', accent: true },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`
                block sm:inline-block text-center px-4 py-2.5 sm:px-5 sm:py-3
                font-sans text-[0.7rem] sm:text-xs font-medium uppercase tracking-wider
                border-b sm:border-b-0 sm:border-r border-[#C8C0B0]
                transition-all duration-200
                ${item.accent
                  ? 'bg-accent text-white hover:bg-accent-dk'
                  : 'text-ink-mid hover:bg-ink hover:text-[#FDFAF5] bg-[#FDFAF5]'
                }
              `}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
