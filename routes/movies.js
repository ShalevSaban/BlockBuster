const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre')
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

router.use(express.json());





router.get('/', async(req, res) => {

    const movies = await Movie.find().sort('title');
    res.send(movies);

});

//Getting a single genre

router.post('/', async(req, res) => {


    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');


    let movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }

    });

    movie = await movie.save();

    res.send(movie);
});

router.get('/:id', async(req, res) => {

    const movie = await Movie.findById(req.params.id)

    if (!movie)
        return res.status(404).send('The movie not found');

    res.send(movie);
});

router.put('/:id', async(req, res) => {

    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.params.id);
    if (!movie)
        return res.status(404).send('The movie not found');

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');



    movie.title = req.body.title;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;
    movie.genre._id = genre._id;
    movie.genre.name = genre.name;

    movie.save()
        .then((updatedMovie) => {
            res.send({ message: 'Movie updated successfully', movie: updatedMovie });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ message: 'Error updating movie' });
        });


});

router.delete('/:id', async(req, res) => {

    const movie = await Movie.findByIdAndRemove(req.params.id)

    if (!movie)
        return res.status(404).send('The movie not found');


    res.send(movie);
});



module.exports = router;