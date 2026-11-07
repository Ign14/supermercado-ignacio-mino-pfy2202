import Boton from '../components/ui/Boton.jsx'
import EstadoVacio from '../components/ui/EstadoVacio.jsx'

export default function NoEncontrado() {
  return (
    <EstadoVacio icono="🧭" titulo="Página no encontrada" descripcion="La ruta que buscas no existe.">
      <Boton to="/">Volver al inicio</Boton>
    </EstadoVacio>
  )
}
