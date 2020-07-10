const express = require('express');
const bodyParser = require('body-parser');

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

var add = (
    function () {
        var counter = 0;
        return function () {
            counter +=1; 
            return counter;
        }
    }
)();

//PARTNERS TOP ROUTE
partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log(add());
    next();
})
.get((req, res) => {
    res.end('Will send all the partners to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`)
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
    res.end('Deleting all partners');
});

//PARTNERS DYNAMIC ROUTE
partnerRouter.route('/:partnerId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send partner ${req.params.partnerId} to you`)
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`)
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners/:partnerId')
})
.delete((req, res) => {
    res.end(`Deleting partner with id: ${req.params.partnerId}`)
});

module.exports = partnerRouter;