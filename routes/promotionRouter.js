const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

var add = (
    function () {
        var counter = 0;
        return function () {
            counter +=1; 
            return counter;
        }
    }
)();

//PROMOTIONS TOP ROUTE
promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log(add());
    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

//PROMOTIONS DYNAMIC ROUTE
promotionRouter.route('/:promotionsId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send promotion ${req.params.promotionsId} to you`)
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`)
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions/:promotionsId')
})
.delete((req, res) => {
    res.end(`Deleting promotion with id: ${req.params.promotionsId}`)
});


module.exports = promotionRouter;