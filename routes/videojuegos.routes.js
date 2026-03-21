const express = require('express')
const router = express.Router()
const Videojuego = require('../models/Videojuegos') 


//Lo bueno de ya haberlo hecho con las pelis es literalmente copiar y pegar cambiando las variables(Es bastante automatico , como una plantilla)



// 1. GET General
router.get('/', async (req, res, next) => {
    try {
        const juegos = await Videojuego.find()
        return res.status(200).json(juegos)
    } catch (error) {
        return next(error)
    }
});

// 2. POST (Crear)
router.post('/', async (req, res, next) => {
    try {
        const nuevoJuego = new Videojuego(req.body)
        const juegoCreado = await nuevoJuego.save()
        return res.status(201).json(juegoCreado)
    } catch (error) {
        return next(error)
    }
});

// 3. PUT 
router.put('/editar/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        
        const juegoEditado = await Videojuego.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
        return res.status(200).json(juegoEditado)
    } catch (error) {
        return next(error)
    }
});

// 4. DELETE 
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Videojuego.findByIdAndDelete(id)
        return res.status(200).json('¡Videojuego Eliminado!')
    } catch (error) {
        return next(error)
    }
});

module.exports = router