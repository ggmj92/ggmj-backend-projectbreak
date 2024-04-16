const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const ArtworkController = require('../controllers/ArtworkController');
const { upload } = require('../middleware/multerSetup');

//API Routes
router.post('/create', upload.single('image'), ArtworkController.createArtwork);
router.get('/', ArtworkController.getAll);
router.get('/id/:_id', ArtworkController.getByID);
router.put('/update/:_id', ArtworkController.updateArtwork);
router.delete('/id/:_id', ArtworkController.deleteArtwork);

//Server-Side-Rendering Routes
router.get('/home', ArtworkController.getAllSSR);
router.get('/artwork/:id', ArtworkController.getByIDSSR);
router.get('/create', ArtworkController.createArtworkSSR);
router.get('/update/:id', ArtworkController.updateArtworkSSR);
router.post('/createArtworkSSR', upload.single('image'), ArtworkController.createArtworkSSRPost);
router.post('/update/:id', upload.single('image'), ArtworkController.updateArtworkSSRPost);
router.post('/artwork/:id', upload.single('image'), ArtworkController.updateArtworkSSRPost);
router.post('/delete/:id', ArtworkController.deleteArtworkSSR);

module.exports = router;