const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    developer: { type: String, required: true, trim: true },
    year: { type: Number, required: false },
    genre: { type: String, required: false , trim: true, default : "Unknown"  }
  },
  { timestamps: true }
);

const Videojuego = mongoose.model('Videogame', gameSchema)
module.exports = Videojuego