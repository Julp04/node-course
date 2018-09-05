// Get all the published backend courses
// sort them by their name,
// pick only their name and author,
// and display them.

var Course = require('./index').Course;

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort( {name: 1})           // ascending 'name' , descending '-name'
        .select( {name: 1, author: 1}) // 'name author'
}

getCourses()
    .then(courses => {
        console.log(courses);
    })
    .catch( error => console.error(error));