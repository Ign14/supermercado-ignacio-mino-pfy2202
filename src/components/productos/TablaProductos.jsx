import { useNavigate } from 'react-router-dom'
import BadgeCategoria from '../ui/BadgeCategoria.jsx'
import BadgeStock from '../ui/BadgeStock.jsx'
import { formatearPrecio } from '../../utils/formato.js'

/**
 * Listado del inventario. En escritorio es una tabla; en móvil cada fila se
 * transforma en tarjeta. Al hacer clic en un artículo se abre su detalle.
 */
export default function TablaProductos({ productos }) {
  const navigate = useNavigate()
  const abrir = (id) => navigate(`/inventario/${id}`)
  const alTeclado = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      abrir(id)
    }
  }

  return (
    <>
      {/* Escritorio / tablet */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 md:block">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <caption className="sr-only">Artículos del inventario</caption>
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3">Artículo</th>
              <th scope="col" className="px-4 py-3">Marca</th>
              <th scope="col" className="px-4 py-3">Categoría</th>
              <th scope="col" className="px-4 py-3 text-right">Precio</th>
              <th scope="col" className="px-4 py-3 text-right">Stock</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">Acción</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {productos.map((p) => (
              <tr
                key={p.id}
                tabIndex={0}
                onClick={() => abrir(p.id)}
                onKeyDown={(e) => alTeclado(e, p.id)}
                className="cursor-pointer transition-colors hover:bg-marca-50/60 focus:bg-marca-50 focus:outline-none"
              >
                <td className="px-4 py-3 font-medium text-slate-900">{p.nombre}</td>
                <td className="px-4 py-3 text-slate-600">{p.marca}</td>
                <td className="px-4 py-3"><BadgeCategoria categoria={p.categoria} /></td>
                <td className="px-4 py-3 text-right tabular-nums">{formatearPrecio(p.precio)}</td>
                <td className="px-4 py-3 text-right"><BadgeStock stock={p.stock} /></td>
                <td className="px-4 py-3 text-right font-semibold text-marca-700">Ver detalle →</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <ul className="grid gap-3 md:hidden">
        {productos.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => abrir(p.id)}
              className="w-full rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:ring-marca-500"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{p.nombre}</p>
                  <p className="text-sm text-slate-500">{p.marca}</p>
                </div>
                <p className="font-semibold tabular-nums">{formatearPrecio(p.precio)}</p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <BadgeCategoria categoria={p.categoria} />
                <BadgeStock stock={p.stock} />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
