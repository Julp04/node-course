// Get all the published frontend and backend courses
// sort them by their price in descending order,
// pick only their name and author,
// and display them.

var Course = require('./index').Course;

async function run() {
    return await Course
        .find({ isPublished: true, tags: {$in: ['frontend', 'backend']}})
        .sort('-price')
        .select( 'price author name') // 'name author'
}

async function run2() {
    return await Course
        .find({ isPublished: true})
        .or([{tags: 'frontend'}, {tags: 'backend'}])
        .sort('-price')
        .select( 'price author name') // 'name author'
}

run2()
    .then(courses => {
        console.log(courses);
    })
    .catch( error => console.error(error));

