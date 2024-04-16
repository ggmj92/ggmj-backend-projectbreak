const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const ArtworkController = require('../controllers/ArtworkController');

router.post('/create', ArtworkController.createArtwork);
router.get('/', ArtworkController.getAll);
router.get('/getAll', ArtworkController.getAllSSR);
router.get('/id/:_id', ArtworkController.getByID);
router.delete('/id/:_id', ArtworkController.deleteArtwork);

module.exports = router;