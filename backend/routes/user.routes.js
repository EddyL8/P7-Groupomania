const express = require('express'); 
const router = express.Router(); 
const passwordValidator = require('../middleware/password'); 
const userCtrl = require('../controllers/user.controllers'); 

router.post('/signup', passwordValidator, userCtrl.signup); 
router.post('/login', passwordValidator, userCtrl.login); 
router.get("/:id", userCtrl.getUser); //http://localhost:3000/api/auth/:id

module.exports = router;