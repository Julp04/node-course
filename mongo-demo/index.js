const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('Could not connect to MongoDB...', error));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String, 
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: "A course should at least have one tag"
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number, 
        required: function() {return this.isPublished;}     //Cannot use arrow function i.e () =>
    }
});

const Course = mongoose.model('Course', courseSchema);
exports.Course = Course;

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: "Julian",
        // tags: ['angular', 'frontend'],
        isPublished: true,
        category: 'web',
        price: 15
    })

    try {
        const result = await course.save();
        console.log(result);
    }catch(ex) {
        console.log(ex.message);
    }
  
}

async function getCourses() {

    // eq(equal)
    // ne(not equal)
    // gt (greater than)
    // gte (greater than or equal to )
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

   const courses = await Course
        .find({ author: 'Julian', isPublished: true})
        .limit(10)
        .sort({ name: 1 })      // 1: Ascending  // -1: Descending
        .select({ name: 1, tags: 1})
    console.log(courses);
}

async function getCourses2() {
    const courses = await Course
        // .find({ price: { $gt: 10, $lte: 20 }})
        .find({ price: { $in: [10, 15, 20] } })
        .limit(10)
        .sort({ name: 1 })      // 1: Ascending  // -1: Descending
        .select({ name: 1, tags: 1})
    
    console.log(courses);
}

// OR
async function getCourses3() {
    const courses = await Course
        .find()
        .or([ { author: 'Julian'}, { isPublished: true} ])
        .limit(10)
        .sort({ name: 1})
        .select( {name: 1, tags: 1});
    console.log(courses);
}

// AND
async function getCourses4() {
    const courses = await Course
        .find()
        .and([ { author: 'Julian'}, { isPublished: true} ])
        .limit(10)
        .sort({ name: 1})
        .select( {name: 1, tags: 1});
    console.log(courses);
}


// Regular expressions

// Starts with Julian
async function getCourses5() {
    const courses = await Course
        .find({ author: /^Julian/ })
        .limit(10)
        .sort({ name: 1})
        .select( {name: 1, tags: 1});
    console.log(courses);
}

// Ends with Panucci
async function getCourses6() {
    const courses = await Course
        .find({ author: /Panucci$/i })              // i: not case sensitive
        .limit(10)
        .sort({ name: 1})
        .select( {name: 1, tags: 1});
    console.log(courses);
}

// Contains Julian
async function getCourses6() {
    const courses = await Course
        .find({ author: /.*Julian.*/i })              // i: not case sensitive
        .limit(10)
        .sort({ name: 1})
        .select( {name: 1, tags: 1});
    console.log(courses);
}

// Counting
async function count() {
    const courses = await Course
        .find({ author: 'Julian', isPublished: true})
        .limit(10)
        .sort({ name: 1 })      // 1: Ascending  // -1: Descending
        .count()
    
    console.log(courses);
}


// Pagination
// Counting
async function paging() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    const courses = await Course
        .find({ author: 'Julian', isPublished: true})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })      // 1: Ascending  // -1: Descending
        .count()
    
    console.log(courses);
}

// Updating a course

async function updateCourse(id) {
    // Query first
    // findById
    // Modify its properties
    // save()

    const course = await Course.findById(id);
    if(!course) {
        console.log('Could not find course');
        return;
    }
    course.isPublished = true;
    course.author = 'Another author';
    
    // course.set({
    //     isPublished: true,
    //     author: 'Another author'
    // })
    const result = await course.save();
    console.log(result);
}

async function updateCourse2(id) {
    // Update first
    // Update directly
    // Optionally: get the updated document

    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Julian',
            isPublished: false
        }
    }, {new: true});
    console.log(result);
}

// Removing a course

async function removeCourse(id) {
    // const result = await Course.deleteOne({_id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}



createCourse();





