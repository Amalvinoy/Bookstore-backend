const  express = require('express');
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const jobController = require('../controllers/jobController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const multerConfig = require('../middlewares/multerMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
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

//Get all books
router.get('/api/getbooks',jwtMiddleware, bookController.getBooks);

//Get Home Books
router.get('/api/gethomebooks', bookController.getHomeBooks);

//Get Book by ID
router.get('/api/getbook/:id', bookController.getBookById);

//Get all books - admin
router.get('/api/admin/getbooksadmin',adminMiddleware, bookController.getAllBooksAdmin);

//Get all users - admin
router.get('/api/admin/getallusersadmin',adminMiddleware, userController.getAllUsersAdmin);

//Post a job
router.post('/api/admin/postjob',adminMiddleware, jobController.postJob);

module.exports = router;