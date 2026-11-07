import { Link } from 'react-router-dom'

const VARIANTES = {
  primario: 'bg-marca-700 text-white hover:bg-marca-800 disabled:bg-slate-300 disabled:text-slate-500',
  acento: 'bg-amber-400 text-slate-900 hover:bg-amber-300',
  secundario: 'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',
  peligro: 'bg-white text-red-700 ring-1 ring-inset ring-red-200 hover:bg-red-50',
  fantasma: 'text-slate-600 hover:bg-slate-100',
}

const TAMANOS = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

/** Botón base del sitio. Si recibe `to` se renderiza como <Link>. */
export default function Boton({ variante = 'primario', tamano = 'md', to, className = '', ...props }) {
  const clases = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-600
    disabled:cursor-not-allowed ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`
  return to ? <Link to={to} className={clases} {...props} /> : <button type="button" className={clases} {...props} />
}
