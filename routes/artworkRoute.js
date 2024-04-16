const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const ArtworkController = require('../controllers/ArtworkController');

//API Routes
router.post('/create', ArtworkController.createArtwork);
router.get('/', ArtworkController.getAll);
router.get('/id/:_id', ArtworkController.getByID);
router.put('/update/:_id', ArtworkController.updateArtwork);
router.delete('/id/:_id', ArtworkController.deleteArtwork);

//Server-Side-Rendering Routes
router.get('/getAll', ArtworkController.getAllSSR);
router.get('/getOne/id/:_id', ArtworkController.getByIDSSR);
router.get('/create', ArtworkController.createArtworkSSR);
router.post('/createArtworkSSR', ArtworkController.createArtworkSSRPost);

module.exports = router;