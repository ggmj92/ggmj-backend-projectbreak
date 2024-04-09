const Artwork = require('../models/Artwork');

const ArtworkController = {
    async create (req, res) {
        try {
            const artwork = await Artwork.create({...req.body});
            res.status(201).send(artwork);
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = ArtworkController;
