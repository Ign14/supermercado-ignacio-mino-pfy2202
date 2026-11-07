import { NavLink } from 'react-router-dom'

const ENLACES = [
  { to: '/', texto: 'Inicio', icono: '🏠' },
  { to: '/quienes-somos', texto: 'Quiénes somos', icono: '👥' },
  { to: '/nuestras-tiendas', texto: 'Nuestras tiendas', icono: '📍' },
]

/** Menú inferior fijo (Semana 1): navegación institucional del sitio. */
export default function MenuInferior() {
  return (
    <nav aria-label="Principal" className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur">
      <ul className="mx-auto grid h-16 max-w-md grid-cols-3">
        {ENLACES.map((e) => (
          <li key={e.to}>
            <NavLink
              to={e.to}
              end
              className={({ isActive }) =>
                `flex h-full flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${isActive ? 'text-marca-700' : 'text-slate-500 hover:text-slate-900'}`
              }
            >
              <span className="text-lg" aria-hidden="true">{e.icono}</span>
              {e.texto}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
