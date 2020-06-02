const mongodb = require('mongodb');
require('dotenv').config();

exports.setNewUser = async (req, res) => {
    const users = await loadUsersCollection();
    await users.insertOne({
        userId: `auth0|${req.body.userId}`
    });

    res.status(201).send();
}



async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('users');

}