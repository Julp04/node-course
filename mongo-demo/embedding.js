const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema],
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Julian Panucci';
  course.save();
}

async function updateAuthor2(courseId) {
  const course = Course.update({_id: courseId }, {
    $set: {
      'author.name': 'John Smiths'
    }
  })
}


async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'Julian' })]);

// updateAuthor2('5b96a9465c3cbd50a2e7665e');

addAuthor('5b96a9465c3cbd50a2e7665e', new Author({
  name: 'Amy'
}))