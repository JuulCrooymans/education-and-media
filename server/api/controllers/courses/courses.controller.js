const mongodb = require('mongodb');
require('dotenv').config();

exports.getCourse = async (req, res) => { // get unique course
    try {
        const course = await loadCoursesCollection();
        res.send(await course.find({
            course: req.params.course
        }).toArray())
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getCourses = async (req, res) => { // get all courses
    try {
        const courses = await loadCoursesCollection();
        res.send(await courses.find({}).toArray())
    } catch (err) {
        res.status(500).send(err);
    }
}

async function loadCoursesCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('courses');

}