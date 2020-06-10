const mongodb = require('mongodb');
require('dotenv').config();

exports.getMinor = async (req, res) => { // get unique minor
    try {
        const minor = await loadMinorsCollection();
        const data = await minor.find({
            $and: [{
                courses: {
                    $in: [req.params.course]
                }
            }, {
                slug: {
                    $eq: req.params.minor
                }
            }]
        }).toArray();

        res.send(data);

    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getMinors = async (req, res) => { // get all minors
    try {
        const minors = await loadMinorsCollection();
        const data = await minors.find({
            courses: {
                $in: [req.params.course]
            }
        }).toArray();

        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function loadMinorsCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('minors');
}