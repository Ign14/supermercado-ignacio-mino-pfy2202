import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'
import { ICONO_CATEGORIA } from '../data/categorias.js'
import { formatearPrecio } from '../utils/formato.js'
import BadgeCategoria from '../components/ui/BadgeCategoria.jsx'
import BadgeStock from '../components/ui/BadgeStock.jsx'
import Boton from '../components/ui/Boton.jsx'
import ControlCantidad from '../components/ui/ControlCantidad.jsx'
import EstadoVacio from '../components/ui/EstadoVacio.jsx'
import Tarjeta from '../components/ui/Tarjeta.jsx'

export default function DetalleProducto() {
  const { id } = useParams()
  const { productos, agregarAlCarrito, cantidadEnCarrito } = useInventario()
  const producto = productos.find((p) => p.id === Number(id))
  const [cantidad, setCantidad] = useState(1)
  const [aviso, setAviso] = useState(null)

  if (!producto) {
    return (
      <EstadoVacio icono="🤷" titulo="Artículo no encontrado" descripcion="El artículo que buscas no existe en el inventario.">
        <Boton to="/inventario">Volver al inventario</Boton>
      </EstadoVacio>
    )
  }

  const agotado = producto.stock === 0
  // Si el stock bajó (por ejemplo, tras agregar), la cantidad elegida se ajusta.
  const cantidadValida = Math.min(Math.max(cantidad, 1), Math.max(producto.stock, 1))
  const enCarrito = cantidadEnCarrito(producto.id)

  const agregar = () => {
    agregarAlCarrito(producto.id, cantidadValida)
    setAviso(`Agregaste ${cantidadValida} × ${producto.nombre} al carrito.`)
    setCantidad(1)
  }

  return (
    <>
      <nav aria-label="Ruta" className="mb-4 text-sm text-slate-500">
        <Link to="/inventario" className="hover:text-marca-700">Inventario</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link to={`/inventario?categoria=${encodeURIComponent(producto.categoria)}`} className="hover:text-marca-700">{producto.categoria}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-900">{producto.nombre}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-5">
        <Tarjeta className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-marca-50 to-amber-50 lg:col-span-2">
          <span className="text-8xl" aria-hidden="true">{ICONO_CATEGORIA[producto.categoria] ?? '📦'}</span>
        </Tarjeta>

        <Tarjeta className="p-6 lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2">
            <BadgeCategoria categoria={producto.categoria} />
            <BadgeStock stock={producto.stock} />
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{producto.nombre}</h1>
          <p className="text-slate-500">{producto.marca}</p>
          <p className="mt-4 text-3xl font-bold text-marca-700 tabular-nums">{formatearPrecio(producto.precio)}</p>
          {producto.descripcion && <p className="mt-4 text-slate-700">{producto.descripcion}</p>}

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-3">
            <div><dt className="text-slate-500">Stock disponible</dt><dd className="text-lg font-semibold tabular-nums">{producto.stock}</dd></div>
            <div><dt className="text-slate-500">En tu carrito</dt><dd className="text-lg font-semibold tabular-nums">{enCarrito}</dd></div>
            <div><dt className="text-slate-500">Código</dt><dd className="text-lg font-semibold tabular-nums">#{String(producto.id).padStart(4, '0')}</dd></div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ControlCantidad
              valor={agotado ? 0 : cantidadValida}
              onIncrementar={() => setCantidad(cantidadValida + 1)}
              onDecrementar={() => setCantidad(cantidadValida - 1)}
              puedeIncrementar={!agotado && cantidadValida < producto.stock}
              puedeDecrementar={!agotado && cantidadValida > 1}
            />
            <Boton tamano="lg" onClick={agregar} disabled={agotado}>
              {agotado ? 'Sin stock' : 'Agregar al carrito'}
            </Boton>
          </div>

          {aviso && (
            <div role="status" className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-marca-50 px-4 py-3 text-sm text-marca-900 ring-1 ring-marca-600/20">
              <span>✓ {aviso} Stock actualizado.</span>
              <Link to="/carrito" className="font-semibold underline">Ir al carrito</Link>
            </div>
          )}
        </Tarjeta>
      </div>

      <div className="mt-6">
        <Boton variante="fantasma" to="/inventario">← Volver al inventario</Boton>
      </div>
    </>
  )
}
