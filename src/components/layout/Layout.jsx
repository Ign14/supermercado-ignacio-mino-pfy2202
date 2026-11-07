import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import MenuSuperior from './MenuSuperior.jsx'
import MenuInferior from './MenuInferior.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  // Al cambiar de ruta se vuelve al inicio de la página. Llaves obligatorias:
  // el efecto no debe devolver el resultado de scrollTo (puede ser una Promise).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <MenuSuperior />
      <main className="mx-auto max-w-6xl px-4 pt-6 pb-28 sm:pt-8">
        <Outlet />
      </main>
      <MenuInferior />
    </div>
  )
}
