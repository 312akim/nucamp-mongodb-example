const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

//multer custom configs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    //makes sure name of the file on server will be same as the name on client side. Default multer gives it random string as name.
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

//File filter
const imageFileFilter = (req, file, cb) => {
    //If not one of these image file extensions
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false); //false - reject upload
    }
    //no error, accept file
    cb(null, true);
};

//Call multer function. configed to accept image uploads
const upload = multer({ storage: storage, fileFilter: imageFileFilter});

//Setup router
const uploadRouter = express.Router();

//Config upload router to handle various http requests
uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
                                                    //Expect single upload of file, inputs fieldname prop is 'imageFile'. Multer handles processing & errors with upload
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    //Multer adds object to request obj named file. Sends file obj info back to client
    res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
})

module.exports = uploadRouter;