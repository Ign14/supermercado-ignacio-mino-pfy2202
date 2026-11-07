/**
 * Selector − / cantidad / +. Reutilizado en el detalle (cantidad a agregar)
 * y en el carrito (cantidad comprada).
 */
export default function ControlCantidad({ valor, onIncrementar, onDecrementar, puedeIncrementar = true, puedeDecrementar = true, etiqueta = 'Cantidad' }) {
  const boton = 'grid h-9 w-9 place-items-center text-lg font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent'
  return (
    <div className="inline-flex items-center overflow-hidden rounded-lg ring-1 ring-inset ring-slate-300 bg-white" role="group" aria-label={etiqueta}>
      <button type="button" className={boton} onClick={onDecrementar} disabled={!puedeDecrementar} aria-label="Disminuir cantidad">−</button>
      <output className="w-10 text-center text-sm font-semibold tabular-nums" aria-live="polite">{valor}</output>
      <button type="button" className={boton} onClick={onIncrementar} disabled={!puedeIncrementar} aria-label="Aumentar cantidad">+</button>
    </div>
  )
}
