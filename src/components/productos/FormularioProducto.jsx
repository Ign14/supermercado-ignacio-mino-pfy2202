import { useState } from 'react'
import { CATEGORIAS } from '../../data/categorias.js'
import Boton from '../ui/Boton.jsx'

const VACIO = { nombre: '', marca: '', categoria: '', precio: '', stock: '', descripcion: '' }

function validar(v) {
  const errores = {}
  if (v.nombre.trim().length < 3) errores.nombre = 'Ingresa un nombre de al menos 3 caracteres.'
  if (!v.marca.trim()) errores.marca = 'La marca es obligatoria.'
  if (!v.categoria) errores.categoria = 'Selecciona un tipo de producto.'
  if (!(Number(v.precio) > 0)) errores.precio = 'El precio debe ser mayor a 0.'
  if (v.stock === '' || !Number.isInteger(Number(v.stock)) || Number(v.stock) < 0) errores.stock = 'El stock debe ser un número entero ≥ 0.'
  return errores
}

function Campo({ id, etiqueta, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">{etiqueta}</label>
      <div className="mt-1">{children}</div>
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

/** Formulario controlado para dar de alta un artículo (Semana 2). */
export default function FormularioProducto({ onGuardar }) {
  const [valores, setValores] = useState(VACIO)
  const [errores, setErrores] = useState({})

  const cambiar = (e) => {
    const { name, value } = e.target
    setValores((v) => ({ ...v, [name]: value }))
    if (errores[name]) setErrores((er) => ({ ...er, [name]: undefined }))
  }

  const enviar = (e) => {
    e.preventDefault()
    const encontrados = validar(valores)
    setErrores(encontrados)
    if (Object.keys(encontrados).length) return
    onGuardar({
      nombre: valores.nombre.trim(),
      marca: valores.marca.trim(),
      categoria: valores.categoria,
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      descripcion: valores.descripcion.trim(),
    })
    setValores(VACIO)
  }

  const input = (campo) =>
    `block w-full rounded-lg border-0 px-3 py-2 text-slate-900 ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm ${
      errores[campo] ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-300 focus:ring-marca-600'
    }`
  const aria = (campo) => ({ 'aria-invalid': Boolean(errores[campo]), 'aria-describedby': errores[campo] ? `${campo}-error` : undefined })

  return (
    <form onSubmit={enviar} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Campo id="nombre" etiqueta="Nombre del artículo" error={errores.nombre}>
          <input id="nombre" name="nombre" value={valores.nombre} onChange={cambiar} placeholder="Ej: Leche descremada 1 L" className={input('nombre')} {...aria('nombre')} />
        </Campo>
      </div>
      <Campo id="marca" etiqueta="Marca" error={errores.marca}>
        <input id="marca" name="marca" value={valores.marca} onChange={cambiar} placeholder="Ej: Colun" className={input('marca')} {...aria('marca')} />
      </Campo>
      <Campo id="categoria" etiqueta="Tipo de producto" error={errores.categoria}>
        <select id="categoria" name="categoria" value={valores.categoria} onChange={cambiar} className={input('categoria')} {...aria('categoria')}>
          <option value="">Selecciona…</option>
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Campo>
      <Campo id="precio" etiqueta="Precio (CLP)" error={errores.precio}>
        <input id="precio" name="precio" type="number" min="1" inputMode="numeric" value={valores.precio} onChange={cambiar} placeholder="1990" className={input('precio')} {...aria('precio')} />
      </Campo>
      <Campo id="stock" etiqueta="Stock inicial" error={errores.stock}>
        <input id="stock" name="stock" type="number" min="0" step="1" inputMode="numeric" value={valores.stock} onChange={cambiar} placeholder="10" className={input('stock')} {...aria('stock')} />
      </Campo>
      <div className="sm:col-span-2">
        <Campo id="descripcion" etiqueta="Descripción (opcional)">
          <textarea id="descripcion" name="descripcion" rows={3} value={valores.descripcion} onChange={cambiar} className={input('descripcion')} />
        </Campo>
      </div>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <Boton variante="secundario" onClick={() => { setValores(VACIO); setErrores({}) }}>Limpiar</Boton>
        <Boton type="submit">Guardar artículo</Boton>
      </div>
    </form>
  )
}
