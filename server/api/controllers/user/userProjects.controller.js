const mongodb = require('mongodb');
require('dotenv').config();

exports.getUserProjects = async (req, res) => {
    try {
        const userFeedbackData = await loadUsersCollection();
        const user = await userFeedbackData.findOne({
            userId: req.params.id
        })

        res.send(user.projects);
    } catch (err) {
        res.status(500).send();
        throw err;
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await loadProjectsCollection();
        let queryArray = []
        
        if (req.query.projects) {
            for(el of req.query.projects.split(',')) {
                queryArray.push(new mongodb.ObjectID(el));
            }
    
            const data = await projects.find({
                _id: {
                    $in: queryArray
                }
            }).toArray();

            if (data === []) {
                res.status(404).send();
            } else {
                res.send(data);
            }
            
        } else {
            res.status(404).send();
        }


        
    } catch (err) {
        res.send(err);
    }
}

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('users');

}

async function loadProjectsCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('projects');
}