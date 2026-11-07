import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { InventarioProvider } from './context/InventarioContext.jsx'
import './index.css'

// HashRouter: GitHub Pages no tiene reescritura de rutas, así que
// /#/inventario evita el 404 al recargar una ruta interna.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </HashRouter>
  </StrictMode>,
)
