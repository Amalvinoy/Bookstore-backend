const  express = require('express');
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const multerConfig = require('../middlewares/multerMiddleware');
//2.create router
const router = express.Router();

//3.define routes

//Register User
router.post('/api/registerUser', userController.registerUser);
//Login User
router.post('/api/loginUser', userController.loginUser);

//Google Login
router.post('/api/google-login', userController.googleAuth);

router.post('/api/addbook',jwtMiddleware,multerMiddleware.array('uploadImage',3), bookController.addBook);

module.exports = router;