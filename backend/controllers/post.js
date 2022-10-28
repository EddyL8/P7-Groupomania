const Post = require('../models/post'); 
const fs = require('fs'); 
const { post } = require('../routes/user');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id; 
    const post = new Post({ 
        ...postObject 
        //mediaUrl: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}` 
    });
    if (!!req.file) {
      post.mediaUrl = `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
    }

    post.save() 
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id}) 
  .then((post) => { res.status(200).json(post)})
  .catch((error) => { res.status(404).json({ error })});
};

exports.getAllPosts = (req, res, next) => {
  Post.find() 
  .then((post) => { res.status(200).json(post)})
  .catch((error) => { res.status(404).json({ error })});
};

exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? 
    {
      ...JSON.parse(req.body.post),
      mediaUrl: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}` 
    } : { ...req.body };
    delete postObject._userId
    Post.findOne({ _id: req.params.id }) 
    .then(post => {
      if (post.userId !== req.auth.userId && !isAdmin) {
				res.status(401).json({ message: "Non autorisé" })
			} else {
        const filename = post.mediaUrl.split('/medias/')[1]; 
        fs.unlink(`medias/${filename}`, () => { 
            Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id }) 
            .then(() => res.status(200).json({ message: 'Post modifié !'}))
            .catch(error => res.status(400).json({ error }));
        });
      }
  })
    .catch((error) => {
      res.status(400).json({ error })
    })
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id}) 
    .then(post => {
      if (post.userId != req.auth.userId && !isAdmin) {
        res.status(401).json({message: 'Not authorized'});
      } else {
        const filename = post.mediaUrl.split('/medias/')[1]; 
        fs.unlink(`medias/${filename}`, () => { 
          Post.deleteOne({_id: req.params.id}) 
            .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
            .catch(error => res.status(401).json({ error }));
        });
      } 
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};

exports.likePost = (req, res) => {
  if (req.body.like === 1) { 
    Post.updateOne(
      { _id: req.params.id }, 
      { $inc: { likes: 1 }, 
      $push: { usersLiked: req.body.userId }} 
    )
    .then(() => res.status(200).json({ message: 'Like ajouté' }))
    .catch((error) => res.status(400).json({ error }));

  } else if (req.body.like === -1) {
      Post.updateOne( 
        { _id: req.params.id },
        { $inc: { dislikes: 1 }, 
        $push: { usersDisliked: req.body.userId }} 
      )
      .then(() => res.status(200).json({ message: 'Dislike ajouté' }))
      .catch((error) => res.status(400).json({ error }));

  } else {
    Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.usersLiked.includes(req.body.userId)){ 
        Post.updateOne( 
        { _id: req.params.id },
        { $inc: { likes: -1 }, 
        $pull: { usersLiked: req.body.userId }} 
        )
        .then(() => res.status(200).json({ message: 'Like retiré' }))
        .catch((error) => res.status(400).json({ error }));
      
      } else if (post.usersDisliked.includes(req.body.userId)){ 
        Post.updateOne( 
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, 
          $pull: { usersDisliked: req.body.userId }} 
        )
        .then(() => res.status(200).json({ message: 'Dislike retiré' }))
        .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
  }
};