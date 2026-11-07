import { describe, expect, it } from 'vitest'
import { ACCIONES, estadoInicial, inventarioReducer } from './inventarioReducer.js'

const stock = (s, id) => s.productos.find((p) => p.id === id).stock
const enCarrito = (s, id) => s.carrito.find((i) => i.id === id)?.cantidad ?? 0
const run = (s, type, payload) => inventarioReducer(s, { type, payload })

describe('inventarioReducer', () => {
  it('agregar al carrito descuenta stock del inventario', () => {
    const s = run(estadoInicial, ACCIONES.AGREGAR_AL_CARRITO, { id: 1, cantidad: 3 })
    expect(stock(s, 1)).toBe(stock(estadoInicial, 1) - 3)
    expect(enCarrito(s, 1)).toBe(3)
  })

  it('no permite agregar más unidades que el stock disponible', () => {
    const s = run(estadoInicial, ACCIONES.AGREGAR_AL_CARRITO, { id: 10, cantidad: 99 })
    expect(s).toBe(estadoInicial)
    expect(run(estadoInicial, ACCIONES.AGREGAR_AL_CARRITO, { id: 12, cantidad: 1 })).toBe(estadoInicial) // agotado
  })

  it('incrementar y decrementar mueven unidades entre carrito e inventario', () => {
    let s = run(estadoInicial, ACCIONES.AGREGAR_AL_CARRITO, { id: 2, cantidad: 1 })
    s = run(s, ACCIONES.INCREMENTAR, { id: 2 })
    expect(enCarrito(s, 2)).toBe(2)
    expect(stock(s, 2)).toBe(stock(estadoInicial, 2) - 2)
    s = run(s, ACCIONES.DECREMENTAR, { id: 2 })
    s = run(s, ACCIONES.DECREMENTAR, { id: 2 })
    expect(enCarrito(s, 2)).toBe(0)
    expect(s.carrito).toHaveLength(0)
    expect(stock(s, 2)).toBe(stock(estadoInicial, 2))
  })

  it('incrementar se detiene al agotar el stock', () => {
    let s = run(estadoInicial, ACCIONES.AGREGAR_AL_CARRITO, { id: 10, cantidad: 4 })
    expect(run(s, ACCIONES.INCREMENTAR, { id: 10 })).toBe(s)
  })

  it('quitar y vaciar devuelven todo el stock', () => {
    let s = run(estadoInicial, ACCIONES.AGREGAR_AL_CARRITO, { id: 1, cantidad: 5 })
    s = run(s, ACCIONES.AGREGAR_AL_CARRITO, { id: 4, cantidad: 2 })
    const q = run(s, ACCIONES.QUITAR_DEL_CARRITO, { id: 1 })
    expect(stock(q, 1)).toBe(stock(estadoInicial, 1))
    const v = run(s, ACCIONES.VACIAR_CARRITO)
    expect(v.productos).toEqual(estadoInicial.productos)
    expect(v.carrito).toEqual([])
  })

  it('confirmar compra limpia el carrito y mantiene el stock descontado', () => {
    let s = run(estadoInicial, ACCIONES.AGREGAR_AL_CARRITO, { id: 1, cantidad: 2 })
    s = run(s, ACCIONES.CONFIRMAR_COMPRA)
    expect(s.carrito).toEqual([])
    expect(stock(s, 1)).toBe(stock(estadoInicial, 1) - 2)
  })

  it('agregar producto asigna id nuevo sin mutar el estado anterior', () => {
    const nuevo = { nombre: 'Té', marca: 'Supremo', categoria: 'Despensa', precio: 1500, stock: 5 }
    const s = run(estadoInicial, ACCIONES.AGREGAR_PRODUCTO, nuevo)
    expect(s.productos).toHaveLength(estadoInicial.productos.length + 1)
    expect(s.productos.at(-1).id).toBe(15)
    expect(estadoInicial.productos).toHaveLength(14)
  })
})
