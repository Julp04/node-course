const mongoose = require('mongoose');
const Joi = require('joi')
const {Genre} = require('./genres');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250
    }, 
    genre: {
        type: Genre.schema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Movie = mongoose.model('Movie', movieSchema);


// JOI schema is independent of mongoose schema
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(250).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}


exports.Movie = Movie;
exports.validate = validateMovie;