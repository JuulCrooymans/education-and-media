const mongodb = require('mongodb');
require('dotenv').config();

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

exports.getUserFeedback = async (req, res) => {    
    try {
        const userFeedbackData = await loadUsersCollection();
        const feedback = await userFeedbackData.findOne({userId: req.params.id})

        res.send(feedback.feedback);
    } catch (err) {
        res.status(500).send();
        throw err;
    }
}

exports.postUserFeedback = async (req, res) => {    
    try {
        
        const feedback = await loadUsersCollection();
        await feedback.updateOne({userId: req.params.id}, { $push: {
                feedback: {
                    id: uuidv4(),
                    title: req.body.title,
                    comment: req.body.comment,
                    createdAt: new Date()
                }
            }
        });

        res.status(201).send();
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