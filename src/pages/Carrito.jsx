import { useState } from 'react'
import { useInventario } from '../context/InventarioContext.jsx'
import { formatearPrecio } from '../utils/formato.js'
import LineaCarrito from '../components/carrito/LineaCarrito.jsx'
import Boton from '../components/ui/Boton.jsx'
import EncabezadoPagina from '../components/ui/EncabezadoPagina.jsx'
import EstadoVacio from '../components/ui/EstadoVacio.jsx'
import Tarjeta from '../components/ui/Tarjeta.jsx'

export default function Carrito() {
  const { itemsCarrito, totalUnidades, totalCarrito, incrementar, decrementar, quitarDelCarrito, vaciarCarrito, confirmarCompra } = useInventario()
  const [compraOk, setCompraOk] = useState(false)

  const confirmar = () => {
    confirmarCompra()
    setCompraOk(true)
  }

  if (!itemsCarrito.length) {
    return compraOk ? (
      <EstadoVacio icono="✅" titulo="¡Compra confirmada!" descripcion="Los artículos fueron descontados definitivamente del inventario.">
        <Boton to="/inventario">Seguir comprando</Boton>
      </EstadoVacio>
    ) : (
      <EstadoVacio icono="🛒" titulo="Tu carrito está vacío" descripcion="Abre un artículo del inventario y agrégalo al carrito.">
        <Boton to="/inventario">Ir al inventario</Boton>
      </EstadoVacio>
    )
  }

  return (
    <>
      <EncabezadoPagina titulo="Carrito de compras" descripcion="Cada cambio de cantidad actualiza el stock del inventario general.">
        <Boton variante="peligro" onClick={vaciarCarrito}>Vaciar carrito</Boton>
      </EncabezadoPagina>

      <div className="grid gap-6 lg:grid-cols-3">
        <Tarjeta className="lg:col-span-2">
          <ul className="divide-y divide-slate-100">
            {itemsCarrito.map((item) => (
              <LineaCarrito
                key={item.id}
                item={item}
                onIncrementar={() => incrementar(item.id)}
                onDecrementar={() => decrementar(item.id)}
                onQuitar={() => quitarDelCarrito(item.id)}
              />
            ))}
          </ul>
        </Tarjeta>

        <Tarjeta className="h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Resumen</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Artículos distintos</dt><dd className="tabular-nums">{itemsCarrito.length}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Unidades</dt><dd className="tabular-nums">{totalUnidades}</dd></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatearPrecio(totalCarrito)}</dd></div>
          </dl>
          <Boton tamano="lg" className="mt-6 w-full" onClick={confirmar}>Confirmar compra</Boton>
          <Boton variante="secundario" className="mt-2 w-full" to="/inventario">Seguir comprando</Boton>
        </Tarjeta>
      </div>
    </>
  )
}
