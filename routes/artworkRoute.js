const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const ArtworkController = require('../controllers/ArtworkController');

router.post('/create', ArtworkController.create);
router.get('/', ArtworkController.getAll);
router.get('/getAll', ArtworkController.getAllSSR);
router.get('/id/:_id', ArtworkController.getByID)

module.exports = router;