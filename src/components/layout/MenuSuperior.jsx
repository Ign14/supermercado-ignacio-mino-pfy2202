import { Link, NavLink } from 'react-router-dom'
import { useInventario } from '../../context/InventarioContext.jsx'

const ENLACES = [
  { to: '/inventario', texto: 'Inventario' },
  { to: '/inventario/nuevo', texto: 'Agregar artículo' },
]

/** Menú de gestión (Semana 2): inventario, alta de artículos y carrito. */
export default function MenuSuperior() {
  const { totalUnidades } = useInventario()
  const claseEnlace = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-marca-800 text-white' : 'text-marca-50 hover:bg-marca-800/60'}`

  return (
    <header className="sticky top-0 z-30 bg-marca-700 shadow">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-white">
          <img src="./favicon.svg" alt="" className="h-8 w-8" />
          <span className="text-lg tracking-tight">SuperMaule</span>
        </Link>
        <nav aria-label="Gestión" className="flex items-center gap-1">
          <div className="hidden gap-1 sm:flex">
            {ENLACES.map((e) => (
              <NavLink key={e.to} to={e.to} end className={claseEnlace}>{e.texto}</NavLink>
            ))}
          </div>
          <NavLink to="/carrito" className={claseEnlace} aria-label={`Carrito, ${totalUnidades} unidades`}>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">🛒</span>
              <span className="hidden sm:inline">Carrito</span>
              <span className="grid min-w-6 place-items-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-slate-900 tabular-nums">{totalUnidades}</span>
            </span>
          </NavLink>
        </nav>
      </div>
      {/* En móvil los enlaces de gestión pasan a una segunda fila desplazable */}
      <nav aria-label="Gestión (móvil)" className="flex gap-1 overflow-x-auto px-4 pb-2 sm:hidden">
        {ENLACES.map((e) => (
          <NavLink key={e.to} to={e.to} end className={claseEnlace}>{e.texto}</NavLink>
        ))}
      </nav>
    </header>
  )
}
