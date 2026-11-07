import { useInventario } from '../context/InventarioContext.jsx'
import { STOCK_BAJO } from '../utils/formato.js'
import Boton from '../components/ui/Boton.jsx'
import Tarjeta from '../components/ui/Tarjeta.jsx'

export default function Inicio() {
  const { productos, totalUnidades, reiniciar } = useInventario()
  const unidades = productos.reduce((t, p) => t + p.stock, 0)
  const criticos = productos.filter((p) => p.stock <= STOCK_BAJO).length

  const indicadores = [
    { etiqueta: 'Artículos en inventario', valor: productos.length },
    { etiqueta: 'Unidades en stock', valor: unidades },
    { etiqueta: 'Con stock bajo o agotado', valor: criticos },
    { etiqueta: 'Unidades en el carrito', valor: totalUnidades },
  ]

  return (
    <>
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-marca-700 to-marca-900 px-6 py-12 text-white sm:px-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-marca-100">Supermercado SuperMaule</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">Gestión de inventario simple, en tiempo real.</h1>
        <p className="mt-4 max-w-xl text-marca-100">Consulta el stock por categoría, revisa el detalle de cada artículo y arma el carrito: el inventario se actualiza con cada movimiento.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Boton tamano="lg" variante="acento" to="/inventario">Ver inventario</Boton>
          <Boton tamano="lg" variante="secundario" to="/inventario/nuevo">Agregar artículo</Boton>
        </div>
      </section>

      <section aria-label="Indicadores" className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {indicadores.map((i) => (
          <Tarjeta key={i.etiqueta} className="p-5">
            <p className="text-sm text-slate-500">{i.etiqueta}</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">{i.valor}</p>
          </Tarjeta>
        ))}
      </section>

      <p className="mt-8 text-center text-sm text-slate-500">
        Los datos se guardan en este navegador.{' '}
        <button type="button" onClick={reiniciar} className="font-medium text-marca-700 underline">Restablecer inventario de ejemplo</button>
      </p>
    </>
  )
}
