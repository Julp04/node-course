const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


//Route = "api/genres"
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) {
        return res.status(404).send("Could not find genre with that id");
    }
    
    return res.send(genre);
})

router.put('/:id', async (req, res) => {
    // Validate 
    // If invalid return 400 = Bad request
    const {error} = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);      
    }

    const genre = Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true});

    if(!genre) {
        return res.status(404).send('The course with the given id was not found');
    }

    res.send(genre);
})

router.post('/', async (req, res) => {
    let {error} = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let genre = new Genre({
        name: req.body.name
    })

    genre = await genre.save();
    res.send(genre);
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    if (!genre) {
        return res.status(404).send("Could not find genre with that id");
    }
    res.send(genre);
})


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;