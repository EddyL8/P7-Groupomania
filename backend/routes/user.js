const express = require('express'); 
const router = express.Router(); 
const passwordValidator = require('../middleware/password'); 
const userCtrl = require('../controllers/user'); 

router.post('/signup', passwordValidator, userCtrl.signup); 
router.post('/login', passwordValidator, userCtrl.login);  

module.exports = router;