import { ICONO_CATEGORIA } from '../../data/categorias.js'

export default function BadgeCategoria({ categoria }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 whitespace-nowrap">
      <span aria-hidden="true">{ICONO_CATEGORIA[categoria] ?? '📦'}</span>
      {categoria}
    </span>
  )
}
