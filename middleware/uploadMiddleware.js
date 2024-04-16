const multer = require('multer');

// Define storage for the images
const storage = multer.diskStorage({
    // Destination for files
    destination: function (request, file, callback) {
        callback(null, './public/images');
    },
    // Add back the extension
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

// Upload parameter for multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
});

module.exports = upload;