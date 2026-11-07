import { Link } from 'react-router-dom'
import BadgeCategoria from '../ui/BadgeCategoria.jsx'
import ControlCantidad from '../ui/ControlCantidad.jsx'
import { formatearPrecio } from '../../utils/formato.js'

/** Una línea del carrito: +/− mueve unidades entre carrito e inventario. */
export default function LineaCarrito({ item, onIncrementar, onDecrementar, onQuitar }) {
  return (
    <li className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <Link to={`/inventario/${item.id}`} className="font-semibold text-slate-900 hover:text-marca-700">{item.nombre}</Link>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>{item.marca}</span>
          <BadgeCategoria categoria={item.categoria} />
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {formatearPrecio(item.precio)} c/u · <span className={item.stock === 0 ? 'text-red-600' : ''}>quedan {item.stock} en inventario</span>
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <ControlCantidad
          etiqueta={`Cantidad de ${item.nombre}`}
          valor={item.cantidad}
          onIncrementar={onIncrementar}
          onDecrementar={onDecrementar}
          puedeIncrementar={item.stock > 0}
        />
        <p className="w-24 text-right font-semibold tabular-nums">{formatearPrecio(item.subtotal)}</p>
        <button type="button" onClick={onQuitar} className="text-sm font-medium text-red-600 hover:underline" aria-label={`Quitar ${item.nombre} del carrito`}>
          Quitar
        </button>
      </div>
    </li>
  )
}
