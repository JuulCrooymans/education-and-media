const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();
const jwtDecode = require('jwt-decode');
const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();

    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {     
    const posts = await loadPostsCollection();
    await posts.insertOne({

        text: req.body.text,
        user: req.body.user,
        createdAt: new Date()
    });

    res.status(201).send();
});

router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$set: {text: req.body.text}});
    res.status(200).send();
    
});

// Delete Posts
router.delete('/:id', async (req, res) => {

    const posts = await loadPostsCollection();    
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('posts');

}

module.exports = router;