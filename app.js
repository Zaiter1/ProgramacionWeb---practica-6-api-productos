//Miguel Zaiter 2025-0928
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

//POST /productos - Crear nuevo producto

//Miguel Zaiter Balbuena 2025-0928


app.post('/productos',(req,res)=>{

    //extare los datos enviados del cliente 
    const {nombre,descripcion,precio}=req.body

    //Convierte el precio a numero 
    const precioNumerico=parseFloat(precio)
     
    //Aca hay validaciones de que los campos obligatorios esten comples y que el precio tenga numero valido
    if(!nombre||!descripcion|| !Number.isFinite(precioNumerico) || precioNumerico <= 0){
        return res.status(400).json({
            mensaje: 'Datos del producto invalido'
        })
    }

    //Crea un producto con id nuevo y map() obtiene los id y math se encarda de sumar 1 
    const nuevoProducto={
        id: Math.max(0,...productos.map(p =>p.id))+1,
        nombre,
        descripcion,
        precio: precioNumerico
    }
    //agrega el producto al arreglo 
    productos.push(nuevoProducto)
    
    //devuelve error y los datos del producto que se crea
    res.status(201).json(nuevoProducto)
})


// PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {

    //obtiene el ID del producto que se desea actualizar
    const id = parseInt(req.params.id)

    //aca se busca la posicion del producto dentro del arreglo, y findindex devuelve -1 si no hay elemento 
    const indice = productos.findIndex(p => p.id === id)

    //si el producto no existe,devuelve http 404
    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    //obtiene los nuevos datos enviados por el cliente 
    const {nombre, descripcion, precio} = req.body

    //convierte  el precio recibido a numero 
    const precioNumerico = parseFloat(precio)

    //validacion de datos y que el precio sea valido 
    if (!nombre || !descripcion || !Number.isFinite(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).json({
            mensaje: 'Datos del producto invalidos'
        })
    }

    //aca se remplaza los datos del producto en la posicion encontrada, conservado el id 
    productos[indice] = {
        id,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    //devuelve http 200 con el producto actualizado
    res.status(200).json({
        mensaje: 'Producto actualizado correctamente',
        producto: productos[indice]
    })
})

// DELETE /productos/:id - Eliminar producto

app.delete('/productos/:id', (req, res) => {

    //obtiene el id del producto a eliminar
    const id = parseInt(req.params.id)

    //busca la posicion del producto dentro del arreglo
    const indice = productos.findIndex(p => p.id === id)

    //si no existe devuelve error
    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    //elimina un producto desde la posicion y el splice() devuelve el arrelod con los elementos eliminados
    const eliminados = productos.splice(indice, 1)

    //devuelve http 200 y los datos del producto eliminado y el eliminados [0] obtiene el primero elemento del arreglo
    res.status(200).json({
        mensaje: 'Producto eliminado correctamente',
        producto: eliminados[0]
    })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
