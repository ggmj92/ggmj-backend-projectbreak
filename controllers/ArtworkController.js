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
                    `<div id="artworkCard">
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
                <a href="/getAll">Home</a>
            `)
        } catch (error) {
            console.log(error);
        }
    },

    async createArtworkSSR(req, res) {
        if (req.method === 'POST') {
            try {
                const artwork = await Artwork.create({ ...req.body });
                res.redirect(`/getOne/id/${artwork._id}`);
            } catch (error) {
                console.log(error)
                res.status(500).send({ error: error.message });
            }
        } else {
            res.send(`
                <h1>Create Artwork</h1>
                <form action="/createArtworkSSR" method="post">
                <label for="artist">Artist:</label>
                <input type="text" id="artist" name="artist" required>

                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>

                <label for="year">Year:</label>
                <input type="number" id="year" name="year" >

                <label for="type">Type:</label>
                <input type="text" id="type" name="type" >

                <label for="media">Media:</label>
                <input type="text" id="media" name="media" >

                <label for="dimensions">Dimensions:</label>
                <input type="text" id="dimensions" name="dimensions" >

                <label for="location">Location:</label>
                <input type="text" id="location" name="location" >

                <label for="description">Description:</label>
                <textarea id="description" name="description" ></textarea>

                <button type="submit">Create Artwork</button>
              </form>
              <a href="/getAll">Home</a>
            `)
        }
    },

    async createArtworkSSRPost(req, res) {
        try {
            const artwork = await Artwork.create({ ...req.body });
            res.redirect(`/getOne/id/${artwork._id}`);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    }
};

module.exports = ArtworkController;
