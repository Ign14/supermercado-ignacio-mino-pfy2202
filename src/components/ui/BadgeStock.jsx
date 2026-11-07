import { estadoStock } from '../../utils/formato.js'

const ESTILOS = {
  disponible: 'bg-marca-50 text-marca-800 ring-marca-600/20',
  bajo: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  agotado: 'bg-red-50 text-red-700 ring-red-600/20',
}

/** Indicador visual del stock: disponible / stock bajo / agotado. */
export default function BadgeStock({ stock }) {
  const estado = estadoStock(stock)
  const texto = estado === 'agotado' ? 'Agotado' : `${stock} ${estado === 'bajo' ? '· stock bajo' : 'disp.'}`
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${ESTILOS[estado]}`}>
      {texto}
    </span>
  )
}
