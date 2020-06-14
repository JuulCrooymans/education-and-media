const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./api/routes')
const app = express();

// ---- middleware ----
app.use(bodyParser.json());
app.use(cors());
const checkJwt = require('./api/middleware/auth')

// ---- post route (needs to be removed) ----
const posts = require('./api/routes/posts');
app.use('/api/posts', checkJwt, posts);

// ---- get routes ----
app.use('/', routes);

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