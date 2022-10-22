const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
const path = require('path'); 
const helmet = require("helmet"); 
const rateLimit = require('express-rate-limit'); 
const mongoSanitize = require('express-mongo-sanitize'); 
const xssClean = require('xss-clean'); 
const cors = require('cors'); 

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,    // 15 minutes
  max: 250                     // 250 requêtes maximum par IP
});
app.use(limiter);

app.use(helmet.crossOriginEmbedderPolicy());
app.use(express.json());
app.use(mongoSanitize());
app.use(xssClean());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accès de l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Accès aux requêtes envoyées à l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Accès aux méthodes listées
    next();
  });

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/medias', express.static(path.join(__dirname, 'medias')));

module.exports = app;