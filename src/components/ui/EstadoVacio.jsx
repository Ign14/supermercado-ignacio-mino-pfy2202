export default function EstadoVacio({ icono = '📦', titulo, descripcion, children }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="text-4xl" aria-hidden="true">{icono}</div>
      <h2 className="mt-3 text-lg font-semibold text-slate-900">{titulo}</h2>
      {descripcion && <p className="mx-auto mt-1 max-w-md text-slate-600">{descripcion}</p>}
      {children && <div className="mt-6 flex justify-center gap-2">{children}</div>}
    </div>
  )
}
