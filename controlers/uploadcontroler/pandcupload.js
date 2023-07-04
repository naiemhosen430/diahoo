const multer = require('multer')
const path = require('path')



// Set up Multer storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/assets/images/profilephoto')
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname + path.extname(file.originalname));
    }
  });
  
  // Set up Multer upload options
  const upload = multer({
    storage: storage,
    limits: { fileSize: 50000000 },
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  });
  
  // Check file type
  function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }

  module.exports= upload