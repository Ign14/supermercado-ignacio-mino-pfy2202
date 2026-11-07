import EncabezadoPagina from '../components/ui/EncabezadoPagina.jsx'
import Tarjeta from '../components/ui/Tarjeta.jsx'

const VALORES = [
  { icono: '🌱', titulo: 'Producto local', texto: 'Trabajamos con productores de la Región del Maule para ofrecer frutas y verduras de temporada.' },
  { icono: '🤝', titulo: 'Cercanía', texto: 'Somos un supermercado de barrio: conocemos a nuestros clientes y sus necesidades.' },
  { icono: '📦', titulo: 'Stock confiable', texto: 'Gestionamos nuestro inventario digitalmente para que siempre encuentres lo que buscas.' },
]

export default function QuienesSomos() {
  return (
    <>
      <EncabezadoPagina titulo="Quiénes somos" descripcion="Un supermercado familiar al servicio de la comunidad." />
      <Tarjeta className="p-6 sm:p-8">
        <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
          SuperMaule nació como un almacén de barrio y hoy es un supermercado que combina la atención cercana de siempre con
          herramientas digitales para mantener un inventario ordenado, precios claros y productos frescos todos los días.
        </p>
      </Tarjeta>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {VALORES.map((v) => (
          <Tarjeta key={v.titulo} className="p-6">
            <span className="text-3xl" aria-hidden="true">{v.icono}</span>
            <h2 className="mt-3 font-semibold">{v.titulo}</h2>
            <p className="mt-1 text-sm text-slate-600">{v.texto}</p>
          </Tarjeta>
        ))}
      </div>
    </>
  )
}
