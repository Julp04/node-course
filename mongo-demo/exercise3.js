// Get all the published courses that are $15 or more
// or have the word by in their title

var Course = require('./index').Course;

async function run() {
    return await Course
        .find()
        .or([{name: /.*by.*/i}, {price: {$gte: 15}}])
        .sort('-price')
}


run()
    .then(courses => {
        console.log(courses);
    })
    .catch( error => console.error(error));


