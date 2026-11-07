import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { ACCIONES, estadoInicial, inventarioReducer } from './inventarioReducer.js'

const InventarioContext = createContext(null)
const CLAVE_STORAGE = 'supermaule:estado:v1'

// Recupera el estado guardado; si no existe o está corrupto, usa el inicial.
function cargarEstado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE))
    if (Array.isArray(guardado?.productos) && Array.isArray(guardado?.carrito)) return guardado
  } catch {
    /* localStorage no disponible: se trabaja solo en memoria */
  }
  return estadoInicial
}

export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(inventarioReducer, undefined, cargarEstado)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(state))
    } catch {
      /* sin persistencia, la app sigue funcionando */
    }
  }, [state])

  const value = useMemo(() => {
    // Carrito "enriquecido" con los datos del producto para las vistas.
    const itemsCarrito = state.carrito
      .map((item) => {
        const producto = state.productos.find((p) => p.id === item.id)
        return producto ? { ...producto, cantidad: item.cantidad, subtotal: producto.precio * item.cantidad } : null
      })
      .filter(Boolean)

    return {
      productos: state.productos,
      itemsCarrito,
      totalUnidades: itemsCarrito.reduce((t, i) => t + i.cantidad, 0),
      totalCarrito: itemsCarrito.reduce((t, i) => t + i.subtotal, 0),
      cantidadEnCarrito: (id) => state.carrito.find((i) => i.id === id)?.cantidad ?? 0,
      agregarProducto: (producto) => dispatch({ type: ACCIONES.AGREGAR_PRODUCTO, payload: producto }),
      agregarAlCarrito: (id, cantidad) => dispatch({ type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id, cantidad } }),
      incrementar: (id) => dispatch({ type: ACCIONES.INCREMENTAR, payload: { id } }),
      decrementar: (id) => dispatch({ type: ACCIONES.DECREMENTAR, payload: { id } }),
      quitarDelCarrito: (id) => dispatch({ type: ACCIONES.QUITAR_DEL_CARRITO, payload: { id } }),
      vaciarCarrito: () => dispatch({ type: ACCIONES.VACIAR_CARRITO }),
      confirmarCompra: () => dispatch({ type: ACCIONES.CONFIRMAR_COMPRA }),
      reiniciar: () => dispatch({ type: ACCIONES.REINICIAR }),
    }
  }, [state])

  return <InventarioContext.Provider value={value}>{children}</InventarioContext.Provider>
}

// Hook de acceso al estado global; falla temprano si se usa fuera del Provider.
export function useInventario() {
  const ctx = useContext(InventarioContext)
  if (!ctx) throw new Error('useInventario debe usarse dentro de <InventarioProvider>')
  return ctx
}
