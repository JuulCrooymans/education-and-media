const axios = require('axios');
require('dotenv').config;

// const options = {
//     method: 'POST',
//     url: 'https://dev-a9jcsg3o.eu.auth0.com/oauth/token',
//     headers: {
//         'content-type': 'application/json'
//     },
//     body: {
//         grant_type: "client_credentials",
//         client_id: "yEOf10aLtaO1UlnDdQ2DKSS2UInod3kC",
//         client_secret: process.env.AUTH_CLIENT_SECRET,
//         audience: "https://dev-a9jcsg3o.eu.auth0.com/api/v2/"
//     }
// };

// const options = {
//     method: 'POST',
//     url: 'https://dev-a9jcsg3o.eu.auth0.com/oauth/token',
//     headers: {'content-type': 'application/json'},
//     form: {
//       grant_type: 'client_credentials',
//       client_id: 'yEOf10aLtaO1UlnDdQ2DKSS2UInod3kC',
//       client_secret: process.env.AUTH_CLIENT_SECRET,
//       audience: 'https://dev-a9jcsg3o.eu.auth0.com/api/v2/'
//     }
//   };

// exports.getUser = async (req, res) => {
//     try {
//         const data = await axios(options);
//         res.send(await data.body);
//     } catch (err) {
//         res.send(err.message)
//         throw err
//     }
// }