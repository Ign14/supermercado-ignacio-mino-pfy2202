export default function Tarjeta({ className = '', children }) {
  return <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>{children}</div>
}
