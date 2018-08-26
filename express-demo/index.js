const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./logger');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // undefined
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

//Configuration

console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));


if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
app.use(logger);

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given id was not found')
    }else {
        res.send(course);
    }
})

app.post('/api/courses', (req, res) => {

    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    // look up course
    // if not existing, return 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    //Validate 
    //If invalid return 400 = Bad request
    const {error} = validateCourse(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);      
    }

    //Update course
    // return the updated course

    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('The course with the given id was not found')
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})