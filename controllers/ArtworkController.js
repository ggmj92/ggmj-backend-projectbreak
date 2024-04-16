const Artwork = require('../models/Artwork');
const upload = require('../middleware/uploadMiddleware').upload;

const ArtworkController = {

    async createArtwork(req, res) {
        try {
            const artwork = await Artwork.create({ ...req.body, image: req.file.filename });
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
            const id = req.params._id;
            const artwork = await Artwork.find();
            res.send(`
            <h1 class="page-title">All Artwork</h1>
            <button><a href="/create">CREATE ARTWORK</a></button>
            <div class="card-container">
            ${artwork.map(artwork => {
                return (
                    `
                    <div class="artwork-card">
                        <h2>${artwork.artist}</h2>
                        <h3>${artwork.title}</h3>
                        <p>${artwork.year}</p>
                        <p>${artwork.type}</p>
                        <p>${artwork.media}</p>
                        <p>${artwork.dimensions}</p>
                        <p>${artwork.location}</p>
                        <p>${artwork.description}</p>
                        <img src="/images/${artwork.image}" alt="${artwork.title}" />
                        <button><a href="/artwork/${artwork.id}">VIEW</a></button>
                    </div>`
                )
            }).join('')}
            </div>
            `
            )
        } catch (error) {
            console.log(error);
        }
    },

    async getByIDSSR(req, res) {
        try {
            const id = req.params.id;
            const artwork = await Artwork.findById(id);
            if (!artwork) {
                return res.send(`
                    <button><a href="/home">Home</a></button>
                    <h1>Error</h1>
                    <h2>Artwork not found.</h2>
                    `)
            }
            res.send(`
                <button><a href="/home">Home</a></button>
                <h1>Title: ${artwork.title}</h1>
                <h2>Artist: ${artwork.artist}</h2>
                <p>Year: ${artwork.year}</p>
                <p>Type: ${artwork.type}</p>
                <p>Media: ${artwork.media}</p>
                <p>Dimensions: ${artwork.dimensions}</p>
                <p>Location: ${artwork.location}</p>
                <p>Description: ${artwork.description}</p>
                <img src="/images/${artwork.image}" alt="${artwork.title}" />
                <button><a href="/update/${artwork._id}">EDIT</a></button>
                <button><a href="/">DELETE</a></button>
                
            `)
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },

    async createArtworkSSR(req, res) {
        if (req.method === 'POST') {
            try {
                const artwork = await Artwork.create({ ...req.body, image: req.file.filename });
                res.redirect(`/artwork/${artwork._id}`);
            } catch (error) {
                console.log(error)
                res.status(500).send({ error: error.message });
            }
        } else {
            res.send(`
                <button><a href="/home">Home</a></button>
                <h1>Create Artwork</h1>
                <form action="/createArtworkSSR" method="post" enctype="multipart/form-data">
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

                <label for="Image">Upload Image:</label>
                <input type="file" id="image" name="image" >

                <button type="submit">Create Artwork</button>
              </form>
            `)
        }
    },

    async createArtworkSSRPost(req, res) {
        try {
            const artwork = await Artwork.create({ ...req.body, image: req.file.filename });
            res.redirect(`/artwork/${artwork._id}`);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    async updateArtworkSSR(req, res) {
        try {
            const id = req.params.id;
            const artwork = await Artwork.findById(id);
            if (!artwork) {
                return res.send(`
                    <button><a href="/home">Home</a></button>
                    <h1>Error</h1>
                    <h2>Artwork not found.</h2>
                        `)
            }
            res.send(`
                    <button><a href="/home">Home</a></button>
                    <h1>Update Artwork</h1>
                    <form action="/update/${artwork._id}" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="_id" value="${artwork._id}">
                        <label for="artist">Artist:</label>
                        <input type="text" id="artist" name="artist" value="${artwork.artist}" required>
      
                        <label for="title">Title:</label>
                        <input type="text" id="title" name="title" value="${artwork.title}" required>
      
                        <label for="year">Year:</label>
                        <input type="number" id="year" name="year" value="${artwork.year}">
      
                        <label for="type">Type:</label>
                        <input type="text" id="type" name="type" value="${artwork.type}">
      
                        <label for="media">Media:</label>
                        <input type="text" id="media" name="media" value="${artwork.media}">
      
                        <label for="dimensions">Dimensions:</label>
                        <input type="text" id="dimensions" name="dimensions" value="${artwork.dimensions}">
      
                        <label for="location">Location:</label>
                        <input type="text" id="location" name="location" value="${artwork.location}">
      
                        <label for="description">Description:</label>
                        <textarea id="description" name="description">${artwork.description}</textarea>
      
                        <label for="Image">Upload Image:</label>
                        <input type="file" id="image" name="image">
      
                    <button type="submit">Update Artwork</button>
                    </form>
                `);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    },

    async updateArtworkSSRPost(req, res) {
        console.log('Request body:', req.body);
        try {
            const id = req.params.id;
            const artwork = await Artwork.findById(id);
            if (!artwork) {
                console.log('Artwork not found');
                return res.status(404).send('Artwork not found');
            }

            const updatedFields = {};
            if (req.body.artist) {
                updatedFields.artist = req.body.artist;
            } if (req.body.title) {
                updatedFields.title = req.body.title;
            } if (req.body.year) {
                updatedFields.year = req.body.year;
            } if (req.body.type) {
                updatedFields.type = req.body.type;
            } if (req.body.media) {
                updatedFields.media = req.body.media;
            } if (req.body.dimensions) {
                updatedFields.dimensions = req.body.dimensions;
            } if (req.body.location) {
                updatedFields.location = req.body.location;
            } if (req.body.description) {
                updatedFields.description = req.body.description;
            } if (req.file) {
                updatedFields.image = req.file.filename;
            }

            const updatedArtwork = await Artwork.findByIdAndUpdate(id, updatedFields, { new: true });
            res.redirect(`/artwork/${updatedArtwork._id}`);
        } catch (error) {
            console.log('Error during update:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = ArtworkController, upload;
