/*
const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https:localhost:3443'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
                //returns -1 if not found
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        //Checking if origin can be found in whitelist. True = accept
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

//Export 2 middleware functions
//returns middleware function configed to set cors header of accessControlOrigin: * which allows cors for all origins.
exports.cors = cors();
//returns middleware function that checks if incoming request comes from whitelist. accessControlOrigin: whitelist, otherwise no cors header in response
exports.corsWithOptions = cors(corsOptionsDelegate);

*/

const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);