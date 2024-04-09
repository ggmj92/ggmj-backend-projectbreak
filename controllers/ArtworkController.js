const Artwork = require('../models/Artwork');

const ArtworkController = {
    async create(req, res) {
        try {
            const artwork = await Artwork.create({ ...req.body });
            res.status(201).send(artwork);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },
    async getAll(req, res) {
        try {
            const artwork = await Artwork.find();
            res.json(artwork);
        } catch (error) {
            console.log(error);
        }
    },
    async getAllSSR(req, res) {
        try {
            const artwork = await Artwork.find();
            res.send(`
            <h1>All Artwork</h1>
            ${artwork.map(artwork => {
                return (
                    `<div>
                        <h2>${artwork.artist}</h2>
                        <h3>${artwork.title}</h3>
                        <p>${artwork.year}</p>
                        <p>${artwork.type}</p>
                        <p>${artwork.media}</p>
                        <p>${artwork.dimensions}</p>
                        <p>${artwork.location}</p>
                        <p>${artwork.description}</p>
                    </div>`
                )
            }).join('')}
            `
            )
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = ArtworkController;
