const  express = require('express');
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
//create router
const router = express.Router();

//import controller
router.post('/api/addBook', bookController.addBook);
router.post('/api/registerUser', userController.registerUser);
router.post('/api/loginUser', userController.loginUser);

module.exports = router;