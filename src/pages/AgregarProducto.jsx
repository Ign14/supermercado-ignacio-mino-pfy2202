import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'
import FormularioProducto from '../components/productos/FormularioProducto.jsx'
import EncabezadoPagina from '../components/ui/EncabezadoPagina.jsx'
import Tarjeta from '../components/ui/Tarjeta.jsx'

export default function AgregarProducto() {
  const { agregarProducto } = useInventario()
  const [ultimo, setUltimo] = useState(null)

  const guardar = (producto) => {
    agregarProducto(producto)
    setUltimo(producto.nombre)
  }

  return (
    <>
      <EncabezadoPagina titulo="Agregar artículo" descripcion="Ingresa un nuevo artículo al inventario del supermercado." />
      {ultimo && (
        <div role="status" className="mb-4 rounded-xl bg-marca-50 px-4 py-3 text-sm text-marca-900 ring-1 ring-marca-600/20">
          ✓ «{ultimo}» se agregó al inventario. <Link to="/inventario" className="font-semibold underline">Ver inventario</Link>
        </div>
      )}
      <Tarjeta className="max-w-3xl p-6">
        <FormularioProducto onGuardar={guardar} />
      </Tarjeta>
    </>
  )
}
