const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    developer: { type: String, required: true },
    year: { type: Number },
    genre: { type: String }
  },
  { timestamps: true }
);

const Videojuego = mongoose.model('Videogame', gameSchema)
module.exports = Videojuego