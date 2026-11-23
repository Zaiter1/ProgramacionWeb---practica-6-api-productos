const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto
app.post('/productos',(req,res)=>{

    const {nombre,descripcion,precio}=req.body

    //Convierte el precio a numero 
    const precioNumerico=parseFloat(precio)

    if(!nombre||!descripcion|| !Number.isFinite(precioNumerico) || precioNumerico <= 0){
        return res.status(400).json({
            mensaje: 'Datos del producto invalido'
        })
    }

    const nuevoProducto={
        id: Math.max(0,...productos.map(p =>p.id))+1,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    productos.push(nuevoProducto)

    res.status(201).json(nuevoProducto)
})


// TODO: PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    const {nombre, descripcion, precio} = req.body

    const precioNumerico = parseFloat(precio)

    if (!nombre || !descripcion || !Number.isFinite(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).json({
            mensaje: 'Datos del producto invalidos'
        })
    }

    productos[indice] = {
        id,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    res.status(200).json({
        mensaje: 'Producto actualizado correctamente',
        producto: productos[indice]
    })
})

// TODO: DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    const eliminados = productos.splice(indice, 1)

    res.status(200).json({
        mensaje: 'Producto eliminado correctamente',
        producto: eliminados[0]
    })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
