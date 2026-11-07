import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'
import { CATEGORIAS, TODAS } from '../data/categorias.js'
import FiltroCategoria from '../components/productos/FiltroCategoria.jsx'
import TablaProductos from '../components/productos/TablaProductos.jsx'
import EncabezadoPagina from '../components/ui/EncabezadoPagina.jsx'
import EstadoVacio from '../components/ui/EstadoVacio.jsx'
import Boton from '../components/ui/Boton.jsx'

export default function Inventario() {
  const { productos } = useInventario()
  const [params, setParams] = useSearchParams()

  // La categoría activa vive en la URL (?categoria=Lácteos): sobrevive a la
  // recarga, se puede compartir y el botón "atrás" vuelve al filtro anterior.
  const solicitada = params.get('categoria')
  const categoria = CATEGORIAS.includes(solicitada) ? solicitada : TODAS

  const cambiarCategoria = (cat) => setParams(cat === TODAS ? {} : { categoria: cat })

  // Lista DERIVADA: `filter` devuelve un arreglo nuevo, por lo que el
  // inventario original del estado global nunca se modifica ni se pierde.
  const filtrados = useMemo(
    () => (categoria === TODAS ? productos : productos.filter((p) => p.categoria === categoria)),
    [productos, categoria],
  )

  const conteos = useMemo(() => {
    const c = { [TODAS]: productos.length }
    for (const p of productos) c[p.categoria] = (c[p.categoria] ?? 0) + 1
    return c
  }, [productos])

  return (
    <>
      <EncabezadoPagina titulo="Inventario" descripcion="Selecciona un artículo para ver su detalle y agregarlo al carrito.">
        <Boton to="/inventario/nuevo">+ Agregar artículo</Boton>
      </EncabezadoPagina>

      <FiltroCategoria activa={categoria} onCambiar={cambiarCategoria} conteos={conteos} />

      <p className="mt-4 mb-3 text-sm text-slate-500" aria-live="polite">
        Mostrando <strong className="text-slate-900">{filtrados.length}</strong> de {productos.length} artículos
        {categoria !== TODAS && <> en <strong className="text-slate-900">{categoria}</strong></>}
      </p>

      {filtrados.length ? (
        <TablaProductos productos={filtrados} />
      ) : (
        <EstadoVacio icono="🔎" titulo="No hay artículos en esta categoría" descripcion="Prueba con otra categoría o agrega un artículo nuevo.">
          <Boton variante="secundario" onClick={() => cambiarCategoria(TODAS)}>Ver todas</Boton>
          <Boton to="/inventario/nuevo">Agregar artículo</Boton>
        </EstadoVacio>
      )}
    </>
  )
}
