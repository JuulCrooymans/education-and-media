const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const checkJwt = require('./api/middleware/auth')

const currentUser = require('./api/routes/currentUser');
app.use('/api/currentUser', checkJwt, currentUser);

const posts = require('./api/routes/posts');
app.use('/api/posts', checkJwt, posts);

const user = require('./api/routes/user');
app.use('/api/user', checkJwt, user);

const newUser = require('./api/routes/newUser');
app.use('/api/newuser', newUser);

const users = require('./api/routes/users');
app.use('/api/users',checkJwt , users);


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