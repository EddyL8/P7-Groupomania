const multer = require('multer'); 

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'video/webm': 'webm'
};

const storage = multer.diskStorage({ 
  destination: (req, file, callback) => { 
    callback(null, 'medias');
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
      ( MIME_TYPES[file.mimetype] === "webp") ||
      ( MIME_TYPES[file.mimetype] === "gif") ||
      ( MIME_TYPES[file.mimetype] === "mp4") || 
      ( MIME_TYPES[file.mimetype] === "webm")) {
    return callback(null, true);
  }
  callback(new Error( 'Fichier non valide ! Formats image et vidéo autorisés : jpg, jpeg, png, webp, gif, mp4 et webm'));
};

module.exports = multer({storage: storage, fileFilter: fileFilter}).single('media');