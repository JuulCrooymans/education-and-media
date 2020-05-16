const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const jwt = require("express-jwt"); 
const jwksRsa = require("jwks-rsa");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const authConfig = {
    domain: 'dev-a9jcsg3o.eu.auth0.com',
    audience: 'education-and-media-api.com'
};

// Create middleware to validate the JWT using express-jwt
const checkJwt = jwt({
    // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
  
    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);


// handle production
if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public/'));

    // handle SPA 
    app.get(/.*/, (req, res) => { // send all routes to index.html
        res.sendFile(__dirname + '/public/index.html');
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});