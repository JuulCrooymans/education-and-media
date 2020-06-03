const mongodb = require('mongodb');
require('dotenv').config();

exports.setNewUser = async (req, res) => {    
    try {
        if (req.headers.authorization === process.env.NEW_USER_KEY) {
            const users = await loadUsersCollection();
            await users.insertOne({
                userId: req.body.userId
            });

            res.status(201).send();
        } else {
            res.status(401).send();
        }
    } catch (err) {
        res.status(500).send();
        throw err;
    }
}

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('users');

}