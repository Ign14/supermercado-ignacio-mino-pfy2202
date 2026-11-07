const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

export const formatearPrecio = (valor) => clp.format(valor)

// Umbral bajo el cual un artículo se marca como "stock bajo".
export const STOCK_BAJO = 5

export function estadoStock(stock) {
  if (stock === 0) return 'agotado'
  if (stock <= STOCK_BAJO) return 'bajo'
  return 'disponible'
}
