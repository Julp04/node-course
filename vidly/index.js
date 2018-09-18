const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app =  express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');

if (!config.get('jwtPrivateKey')) {
    console.error('Fatal error: jwtPrivateKey is not defined');
    process.exit(1); 
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongodb...'))
    .catch(error => console.error('Could not connect to mongodb...'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/', (req, res) => {
    res.send("Welcome to Vidly");
})

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
