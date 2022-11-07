const express = require('express'); 
const router = express.Router(); 

const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

const postCtrl = require('../controllers/post.controllers'); 

// /api/post
router.post('/', auth, multer, postCtrl.createPost); 
router.get('/:id', auth, postCtrl.getOnePost); 
router.get('/', auth, postCtrl.getAllPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost); 
router.delete('/:id', auth, postCtrl.deletePost); 
router.post('/:id/like', auth, postCtrl.likePost); 

module.exports = router;