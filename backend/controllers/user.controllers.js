const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/user.models'); 

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) 
      .then(hash => {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname, 
          email: req.body.email, 
          password: hash 
        });
        user.save() 
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) 
    .then(user => {
        if (!user) { 
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) 
            .then(valid => {
                if (!valid) { 
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign( 
                        { userId: user._id },
                        process.env.JWT_SECRET_TOKEN,
                        { expiresIn: '24h' }
                    ),
                    isAdmin: user.isAdmin 
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        res.status(200).json({
          user: {
              userId: user._id,
              lastname: user.lastname,
              firstname: user.firstname,
              isAdmin: user.isAdmin
          },
        });
      })
      .catch((error) =>
        res.status(500).json((error = "Erreur recupération user"))
      );
  };