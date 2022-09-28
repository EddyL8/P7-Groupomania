const Sauce = require('../models/sauce'); 
const fs = require('fs'); 

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; 
    const sauce = new Sauce({ 
        ...sauceObject, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    });
  
    sauce.save() 
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id}) 
  .then((sauce) => { res.status(200).json(sauce)})
  .catch((error) => { res.status(404).json({ error })});
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find() 
  .then((sauce) => { res.status(200).json(sauce)})
  .catch((error) => { res.status(404).json({ error })});
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? 
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : { ...req.body };
    delete sauceObject._userId
    Sauce.findOne({ _id: req.params.id }) 
    .then(sauce => {
      if (sauce.userId !== req.auth.userId) {
				res.status(401).json({ message: "Non autorisé" })
			} else {
        const filename = sauce.imageUrl.split('/images/')[1]; 
        fs.unlink(`images/${filename}`, () => { 
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
            .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
            .catch(error => res.status(400).json({ error }));
        });
      }
  })
    .catch((error) => {
      res.status(400).json({ error })
    })
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id}) 
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({message: 'Not authorized'});
      } else {
        const filename = sauce.imageUrl.split('/images/')[1]; 
        fs.unlink(`images/${filename}`, () => { 
          Sauce.deleteOne({_id: req.params.id}) 
            .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
            .catch(error => res.status(401).json({ error }));
        });
      } 
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};

exports.likeSauce = (req, res) => {
  if (req.body.like === 1) { 
    Sauce.updateOne(
      { _id: req.params.id }, 
      { $inc: { likes: 1 }, 
      $push: { usersLiked: req.body.userId }} 
    )
    .then(() => res.status(200).json({ message: 'Like ajouté' }))
    .catch((error) => res.status(400).json({ error }));

  } else if (req.body.like === -1) {
      Sauce.updateOne( 
        { _id: req.params.id },
        { $inc: { dislikes: 1 }, 
        $push: { usersDisliked: req.body.userId }} 
      )
      .then(() => res.status(200).json({ message: 'Dislike ajouté' }))
      .catch((error) => res.status(400).json({ error }));

  } else {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.usersLiked.includes(req.body.userId)){ 
        Sauce.updateOne( 
        { _id: req.params.id },
        { $inc: { likes: -1 }, 
        $pull: { usersLiked: req.body.userId }} 
        )
        .then(() => res.status(200).json({ message: 'Like retiré' }))
        .catch((error) => res.status(400).json({ error }));
      
      } else if (sauce.usersDisliked.includes(req.body.userId)){ 
        Sauce.updateOne( 
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