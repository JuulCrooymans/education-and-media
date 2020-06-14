const mongodb = require('mongodb');
require('dotenv').config();

exports.getProject = async (req, res) => { // get unique project
    try {
        const projects = await loadProjectsCollection();
        const data = await projects.find({
            _id: new mongodb.ObjectID(req.params.project)
        }).toArray();

        res.send(data)

    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getProjects = async (req, res) => { // get all projects in minor
    try {
        const projects = await loadProjectsCollection();
        const data = await projects.find({
            $and: [{
                courses: req.params.course,
                minors: req.params.minor
            }]
        }).toArray();

        res.send(data);

    } catch (err) {
        res.status(500).send(err);
    }
}

async function loadProjectsCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('projects');
}