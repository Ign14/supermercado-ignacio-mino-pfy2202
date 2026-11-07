import EncabezadoPagina from '../components/ui/EncabezadoPagina.jsx'
import Tarjeta from '../components/ui/Tarjeta.jsx'

const TIENDAS = [
  { nombre: 'SuperMaule Centro', direccion: 'Av. Principal 1250, Talca', horario: 'Lun a Dom · 8:30 – 22:00' },
  { nombre: 'SuperMaule Romeral', direccion: 'Calle Comercio 340, Romeral', horario: 'Lun a Sáb · 9:00 – 21:00' },
  { nombre: 'SuperMaule Curicó', direccion: 'Av. Manso de Velasco 880, Curicó', horario: 'Lun a Dom · 9:00 – 22:00' },
]

export default function NuestrasTiendas() {
  return (
    <>
      <EncabezadoPagina titulo="Nuestras tiendas" descripcion="Encuentra el SuperMaule más cercano." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIENDAS.map((t) => (
          <Tarjeta key={t.nombre} className="p-6">
            <h2 className="font-semibold">{t.nombre}</h2>
            <p className="mt-2 text-sm text-slate-600">📍 {t.direccion}</p>
            <p className="mt-1 text-sm text-slate-600">🕒 {t.horario}</p>
          </Tarjeta>
        ))}
      </div>
      <p className="mt-6 text-xs text-slate-400">Direcciones referenciales de un supermercado ficticio con fines académicos.</p>
    </>
  )
}
