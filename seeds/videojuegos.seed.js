const mongoose = require('mongoose');

// Importamos el modelo de los videojuegos
const Videojuego = require('../models/Videojuegos');

// Un porquito de todo -- The Witcher 3 mi favorito y el Elden ring le meti lo mas grande (Que pena que el Resident no durara mucho porque era la hostia).
const juegos = [
  { title: "Super Mario Bros", developer: "Nintendo", year: 1985, genre: "Plataformas" },
  { title: "Tetris", developer: "Alexey Pajitnov", year: 1984, genre: "Puzle" },
  { title: "Final Fantasy VII", developer: "Square", year: 1997, genre: "RPG" },
  { title: "Half-Life 2", developer: "Valve", year: 2004, genre: "Shooter" },
  { title: "Metal Gear Solid", developer: "Konami", year: 1998, genre: "Sigilo" },
  { title: "The Witcher 3: Wild Hunt", developer: "CD Projekt Red", year: 2015, genre: "RPG" },
  { title: "The Legend of Zelda: Breath of the Wild", developer: "Nintendo", year: 2017, genre: "Aventura" },
  { title: "Elden Ring", developer: "FromSoftware", year: 2022, genre: "Action RPG" },
  { title: "Baldur's Gate 3", developer: "Larian Studios", year: 2023, genre: "RPG" },
  { title: "Astro Bot", developer: "Team Asobi", year: 2024, genre: "Plataformas" }
];

//Literalmente seguimos los mismos pasos que la otra seed
const juegosDocuments = juegos.map(juego => new Videojuego(juego))

mongoose
  .connect('mongodb://127.0.0.1:27017/test')
  .then(async () => {
    const allJuegos = await Videojuego.find();
    if (allJuegos.length) {
      await Videojuego.collection.drop(); 
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Videojuego.insertMany(juegosDocuments);
    console.log('DatabaseCreated: ¡10 Videojuegos insertados! 🎮')
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());