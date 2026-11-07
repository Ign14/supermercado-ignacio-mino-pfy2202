import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import NuestrasTiendas from './pages/NuestrasTiendas.jsx'
import Inventario from './pages/Inventario.jsx'
import AgregarProducto from './pages/AgregarProducto.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Semana 1 — home + menú inferior */}
        <Route index element={<Inicio />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="nuestras-tiendas" element={<NuestrasTiendas />} />
        {/* Semana 2 — gestión de inventario */}
        <Route path="inventario" element={<Inventario />} />
        <Route path="inventario/nuevo" element={<AgregarProducto />} />
        {/* Semana 3 — detalle y carrito */}
        <Route path="inventario/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}
