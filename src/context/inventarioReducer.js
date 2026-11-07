import { PRODUCTOS_INICIALES } from '../data/productosIniciales.js'

/**
 * Estado global de la aplicación.
 *  - productos: inventario general (fuente de verdad del stock disponible).
 *  - carrito:   [{ id, cantidad }] — solo referencias, los datos del artículo
 *               se leen siempre desde `productos` para no duplicar información.
 *
 * Regla de negocio (Semana 3): todo lo que entra al carrito se descuenta del
 * stock del inventario, y todo lo que sale del carrito se devuelve.
 */
export const estadoInicial = {
  productos: PRODUCTOS_INICIALES,
  carrito: [],
}

export const ACCIONES = {
  AGREGAR_PRODUCTO: 'AGREGAR_PRODUCTO',
  AGREGAR_AL_CARRITO: 'AGREGAR_AL_CARRITO',
  INCREMENTAR: 'INCREMENTAR',
  DECREMENTAR: 'DECREMENTAR',
  QUITAR_DEL_CARRITO: 'QUITAR_DEL_CARRITO',
  VACIAR_CARRITO: 'VACIAR_CARRITO',
  CONFIRMAR_COMPRA: 'CONFIRMAR_COMPRA',
  REINICIAR: 'REINICIAR',
}

// Suma `delta` al stock del producto `id` (delta negativo = descontar).
const ajustarStock = (productos, id, delta) =>
  productos.map((p) => (p.id === id ? { ...p, stock: p.stock + delta } : p))

// Suma `delta` a la cantidad en carrito; elimina la línea si llega a 0.
const ajustarCarrito = (carrito, id, delta) => {
  const existe = carrito.some((item) => item.id === id)
  const actualizado = existe
    ? carrito.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
    : [...carrito, { id, cantidad: delta }]
  return actualizado.filter((item) => item.cantidad > 0)
}

// Mueve `cantidad` unidades entre inventario y carrito en una sola operación,
// para que ambos estados nunca queden desincronizados.
function moverAlCarrito(state, id, cantidad) {
  const producto = state.productos.find((p) => p.id === id)
  if (!producto || cantidad <= 0 || producto.stock < cantidad) return state
  return {
    productos: ajustarStock(state.productos, id, -cantidad),
    carrito: ajustarCarrito(state.carrito, id, cantidad),
  }
}

function devolverAlInventario(state, id, cantidad) {
  const item = state.carrito.find((i) => i.id === id)
  if (!item || cantidad <= 0) return state
  const unidades = Math.min(cantidad, item.cantidad)
  return {
    productos: ajustarStock(state.productos, id, unidades),
    carrito: ajustarCarrito(state.carrito, id, -unidades),
  }
}

export function inventarioReducer(state, action) {
  switch (action.type) {
    case ACCIONES.AGREGAR_PRODUCTO: {
      const siguienteId = Math.max(0, ...state.productos.map((p) => p.id)) + 1
      return { ...state, productos: [...state.productos, { ...action.payload, id: siguienteId }] }
    }
    case ACCIONES.AGREGAR_AL_CARRITO:
      return moverAlCarrito(state, action.payload.id, action.payload.cantidad)
    case ACCIONES.INCREMENTAR:
      return moverAlCarrito(state, action.payload.id, 1)
    case ACCIONES.DECREMENTAR:
      return devolverAlInventario(state, action.payload.id, 1)
    case ACCIONES.QUITAR_DEL_CARRITO: {
      const item = state.carrito.find((i) => i.id === action.payload.id)
      return item ? devolverAlInventario(state, item.id, item.cantidad) : state
    }
    case ACCIONES.VACIAR_CARRITO:
      return state.carrito.reduce((acc, item) => devolverAlInventario(acc, item.id, item.cantidad), state)
    case ACCIONES.CONFIRMAR_COMPRA:
      // La venta se concreta: el stock ya fue descontado, solo se limpia el carrito.
      return { ...state, carrito: [] }
    case ACCIONES.REINICIAR:
      return estadoInicial
    default:
      return state
  }
}
