const express = require('express');
const router = express.Router();
const Artwork = require('../models/artwork');

router.get('/', (req, res) => (res.send('We are inside the routes')));

module.exports = router;