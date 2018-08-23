const Joi = require('joi');
const express = require('express');
const app =  express();

app.use(express.json());

const genres = [
    {id: 1, name: "Comedy"},
    {id: 2, name: "Action"},
    {id: 3, name: "Drama"},
    {id: 4, name: "Sports"},
    {id: 5, name: "Horror"},
]

app.get('/', (req, res) => {
    res.send("Welcome to Vidly");
})

app.get('/api', (req, res) => {
    res.send("This the Vidly API");
})

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
    let genre = genres.find( genre => genre.id === parseInt(req.params.id));
    
    if(!genre) {
        return res.status(404).send("Could not find genre with that id");
    }else {
        return res.send(genre);
    }
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send('The course with the given id was not found');
    }

    // Validate 
    // If invalid return 400 = Bad request
    const {error} = validateGenre(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);      
    }

    // Update course
    // Return the updated genre

    genre.name = req.body.name;
    res.send(genre);
})

app.post('/api/genres', (req, res) => {
    let {error} = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
    let genre = genres.find( genre => genre.id === parseInt(req.params.id));
    
    if(!genre) {
        return res.status(404).send("Could not find genre with that id");
    }

    let index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}














// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
