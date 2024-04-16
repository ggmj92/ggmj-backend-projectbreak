const Artwork = require('../models/Artwork');

const ArtworkController = {

    async createArtwork(req, res) {
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

    async getByID(req, res) {
        try {
            const id = req.params._id;
            const artwork = await Artwork.findById(id);
            res.json(artwork);
        } catch (error) {
            console.log(error);
        }
    },

    async updateArtwork(req, res) {
        try {
            const id = req.params._id;
            const updateArtwork = await Artwork.findByIdAndUpdate(id, req.body, { new: true });
            if (!updateArtwork) {
                return res.status(404).json({ message: "This artwork does not exist." })
            }
            res.status(200).json({ message: "Artwork updated.", updateArtwork });
        } catch (error) {
            console.log(error)
        }
    },

    async deleteArtwork(req, res) {
        try {
            const id = req.params._id;
            const deleteArtwork = await Artwork.findByIdAndDelete(id);
            if (!deleteArtwork) {
                return res.status(404).json({ message: "This artwork does not exist." });
            }
            res.status(200).json({ message: "Artwork deleted.", deleteArtwork });
        } catch (error) {
            console.log(error)
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
    },

    async getByIDSSR(req, res) {
        try {
            const id = req.params._id;
            const artwork = await Artwork.findById(id);
            res.send(`
                <h1>${artwork.title}</h1>
                <h2>${artwork.artist}</h2>
                <p>${artwork.year}</p>
                <p>${artwork.type}</p>
                <p>${artwork.media}</p>
                <p>${artwork.dimensions}</p>
                <p>${artwork.location}</p>
                <p>${artwork.description}</p>
            `)
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = ArtworkController;
