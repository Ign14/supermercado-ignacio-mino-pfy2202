import { CATEGORIAS, ICONO_CATEGORIA, TODAS } from '../../data/categorias.js'

/**
 * Chips de categoría. Componente controlado: no guarda estado propio, recibe
 * la categoría activa y avisa el cambio al padre mediante `onCambiar`.
 */
export default function FiltroCategoria({ activa, onCambiar, conteos }) {
  const opciones = [TODAS, ...CATEGORIAS]
  return (
    <div role="group" aria-label="Filtrar por categoría" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {opciones.map((cat) => {
        const seleccionada = cat === activa
        return (
          <button
            key={cat}
            type="button"
            aria-pressed={seleccionada}
            onClick={() => onCambiar(cat)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
              seleccionada ? 'bg-marca-700 text-white ring-marca-700' : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat !== TODAS && <span aria-hidden="true">{ICONO_CATEGORIA[cat]}</span>}
            {cat}
            <span className={`rounded-full px-1.5 text-xs tabular-nums ${seleccionada ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
              {conteos[cat] ?? 0}
            </span>
          </button>
        )
      })}
    </div>
  )
}
