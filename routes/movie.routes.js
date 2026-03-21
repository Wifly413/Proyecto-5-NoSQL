const express = require('express')

const Movie = require('../models/Movie')

const router = express.Router()

// 1 - Aqui vienen las rutas GET existentes en el archivo index.js

// El Json con todas las pelis
router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find()
		return res.status(200).json(movies)
	} catch (err) {
		return res.status(500).json(err)
	}
})

// Las pelis filtradas por id
router.get('/id/:id', async (req, res) => {
	const id = req.params.id
	try {
		const movie = await Movie.findById(id)
		if (movie) {
			return res.status(200).json(movie)
		} else {
			return res.status(404).json('No movie found by this id')
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Pelis filtradas por titulo
router.get('/title/:title', async (req, res) => {
	const {title} = req.params

	try {
		const movieByTitle = await Movie.find({ title })
		return res.status(200).json(movieByTitle)
	} catch (err) {
		return res.status(500).json(err)
	}
});

// Tambien filtramos por genero
router.get('/genre/:genre', async (req, res) => {
	const {genre} = req.params

	try {
		const movieByGenre = await Movie.find({ genre })
		return res.status(200).json(movieByGenre)
	} catch (err) {
		return res.status(500).json(err)
	}
})

// Y como ultimo tambien esta filtrado por año
router.get('/year/:year', async (req, res) => {
	const {year} = req.params

	try {
		const movieByYear = await Movie.find({ year: {$gt:year} })
		return res.status(200).json(movieByYear)
	} catch (err) {
		return res.status(500).json(err)
	}
})


// 2. Crear POST de Movies para crear una nueva pelicula

router.post('/', async (req, res,next) => {
	try {
      
      const nuevaPeli = new Movie({
		director: req.body.director,
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
      });
  
      
      const peliCreada = await nuevaPeli.save()
      return res.status(201).json(peliCreada)
    } catch (error) {
          
      next(error);
    }
})

// 3. Crear PUT de Movies para modificar una peli existente

  router.put('/editar/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const peliUpdated = await Movie.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        
        return res.status(200).json(peliUpdated);
    } catch (error) {
        return next(error);
    }
});

// 4. Crear DELETE de Movies para eliminar una peli

  router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Pelicula Eliminada!');
    } catch (error) {
        return next(error);
    }
})












module.exports = router