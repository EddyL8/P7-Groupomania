const multer = require('multer'); 

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

const storage = multer.diskStorage({ 
  destination: (req, file, callback) => { 
    callback(null, 'images');
  },
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_'); 
    const extension = MIME_TYPES[file.mimetype]; 
    callback(null, name + Date.now() + '.' + extension); 
  }
});

const fileFilter = (req, file, callback) => {
  if (( MIME_TYPES[file.mimetype] === "jpg") ||
      ( MIME_TYPES[file.mimetype] === "png") || 
      ( MIME_TYPES[file.mimetype] === "webp")) {
    return callback(null, true);
  }
  callback(new Error( 'Fichier non valide ! Seuls les formats jpg, jpeg, png et webp'));
};

module.exports = multer({storage: storage, fileFilter: fileFilter}).single('image');