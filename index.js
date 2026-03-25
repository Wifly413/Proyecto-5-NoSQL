const express = require('express')
const connect = require('./utils/db')

connect()

const PORT = 8080
const server = express()

const rutasPelis = require('./routes/movie.routes')
const rutasVideojuegos = require('./routes/videojuegos.routes')

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use('/videojuegos', rutasVideojuegos)
server.use('/movies', rutasPelis)

// Manejo de error 404 Ruta no encontrada
server.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404
    next(error);
})

server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Error inesperado del servidor');
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})