const axios = require('axios');
const mongodb = require('mongodb');
const AuthenticationClient = require('auth0').AuthenticationClient;
require('dotenv').config();

const auth0 = new AuthenticationClient({
    domain: 'dev-a9jcsg3o.eu.auth0.com',
    clientId: 'yIpFqDKjseR34WK2v2AVaELs5PkFDGgQ',
    clientSecret: process.env.AUTH0_CLIENT_SECRET
});

const tokenOptions = {
    audience: 'https://dev-a9jcsg3o.eu.auth0.com/api/v2/',
    scope: 'read:users read:user_idp_tokens'
}

exports.getUser = async (req, res) => {
    try {
        auth0.clientCredentialsGrant(tokenOptions, async (err, response) => {
            if (err) throw err

            const auth0Data = await axios({
                method: 'GET',
                url: `https://dev-a9jcsg3o.eu.auth0.com/api/v2/users/auth0|${req.params.id}`,
                headers: {
                    authorization: `bearer ${response.access_token}`
                }
            });

            const profile = await loadUsersCollection();
            const profileData = await profile.findOne({
                userId: req.params.id
            })

            const data = {
                user: await auth0Data.data,
                profile: await profileData.profile,
                feedback: await profileData.feedback
            }

            res.send(await auth0Data.data);
        });

    } catch (err) {
        res.send(err.message)
        throw err
    }
}

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@education-and-media-vzyqk.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    return client.db('education-and-media').collection('users');

}