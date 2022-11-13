# Groupomonia API

# Lancement du serveur

Depuis un terminal, executer les commandes suivantes pour le frontend :
```
cd frontend
npm run dev
```
Puis pour le backend : 
```
cd backend
nodemon server
```
# Fichier .env

Un fichier .env est nécessaire dans le dossier backend pour le fonctionnement de l'api, veuillez renseigner ceci :
```
DB_USER=(nom d'utilisateur de votre adresse SRV MongoDB)
DB_PASSWORD=(mot de passe de votre adresse SRV MongoDB)
DB_URL=(url de votre adresse SRV MongoDB)
JWT_SECRET_TOKEN=(choisir un token)
PORT=3000
```
# Fonctionnement

Exécution du back : http://localhost:3000

Front à l'adresse : http://localhost:5173

Création d'un compte utilisateur :

- Entrer un nom et un prénom
- Utiliser une adresse email unique et valide 
- Utiliser un mot de passe comprenant entre 8 et 20 caractères, des minuscules et des majuscules, au moins 2 chiffres et un symbole
- Confirmer le mot de passe

Connexion au réseau social :

- Entrer une adresse email et le mot de passe associé d'un compte utilisateur créé au préalable

# Framework et packages utilisés

- Express
- Mongoose
- Mongoose-unique-validator
- Bcrypt
- Jsonwebtoken
- Multer
- Password-validator
- Helmet
- Express-rate-limit
- Express-mongoose-sanitize
- Xss-clean
- Cors
- Eslint
- Eslint-plugin-vue