const Artwork = require('../models/Artwork');
const upload = require('../middleware/uploadMiddleware').upload;
const headerTemplate = require('./header');
const footerTemplate = require('./footer');

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
            const header = headerTemplate();
            const footer = footerTemplate();

            res.send(`
            ${header}
            <h1 class="page-title">All Artwork</h1>
            <button><a href="/create">CREATE ARTWORK</a></button>
            <div class="card-container">
            ${artwork.map(artwork => {
                return (
                    `
                    <div class="card">
                        <img src="/images/${artwork.image}" alt="${artwork.title}" />
                        <div class="card-content">
                            <h2>${artwork.title}</h2>
                            <h3>${artwork.artist}</h3>
                        <button class="card-btn" onclick="location.href='/artwork/${artwork.id}';">VIEW</button>
                        </div>
                    </div>`
                )
            }).join('')}
            </div>
            ${footer}
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
            const header = headerTemplate();
            const footer = footerTemplate();
            if (!artwork) {
                return res.send(`
                    ${header}
                    <h1>Error</h1>
                    <h2>Artwork not found.</h2>
                    ${footer}
                    `)
            }
            res.send(`
                ${header}
                <button><a href="/create">CREATE ARTWORK</a></button>
                <div class="single-card-container">
                    <div class="single-card" data-artwork-id="${artwork._id}">
                        <div class="single-card-content">
                            <h2>${artwork.title}</h2>
                            <h3>${artwork.artist}</h3>
                            <p>Year: ${artwork.year}</p>
                            <p>Type: ${artwork.type}</p>
                            <p>Media: ${artwork.media}</p>
                            <p>Dimensions: ${artwork.dimensions}</p>
                            <p>Location: ${artwork.location}</p>
                            <p>Description: ${artwork.description}</p>
                        </div>
                        <img src="/images/${artwork.image}" alt="${artwork.title}" />
                    </div>
                    <button class="edit-btn">EDIT</button>
                    <button class="delete-btn" data-artwork-id="${artwork._id}">DELETE</button>
                </div>
                ${footer}
                <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const editBtns = document.querySelectorAll('.edit-btn');
                    const deleteBtns = document.querySelectorAll('.delete-btn');

                    editBtns.forEach(btn => {
                        btn.addEventListener('click', async () => {
                            const artworkId = btn.parentElement.dataset.artworkId;
                            window.location.href = '/update/${id}';
                        });
                    });

                    deleteBtns.forEach(btn => {
                        btn.addEventListener('click', async () => {
                            const result = confirm("Are you sure you want to delete this artwork?");
                            if (result) {
                            const response = await fetch('/id/${id}', { method: 'DELETE' });
                            if (response.ok) {
                                window.location.href = '/home';
                            } else {
                                console.log('Error deleting artwork');
                            }
                        }
                        });
                    });
                });
            </script>
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
            const header = headerTemplate();
            const footer = footerTemplate();

            res.send(`
                ${header}
                <h1 class="page-title">Create Artwork</h1>
                <div class="form-container">
                <form action="/createArtworkSSR" method="post" enctype="multipart/form-data">
                <label for="artist" class="form-label">Artist:</label>
                <input type="text" id="artist" name="artist" class="form-input" required>

                <label for="title" class="form-label">Title:</label>
                <input type="text" id="title" name="title" class="form-input" required>

                <label for="year" class="form-label">Year:</label>
                <input type="number" id="year" name="year" class="form-input" >

                <label for="type" class="form-label">Type:</label>
                <input type="text" id="type" name="type" class="form-input" >

                <label for="media" class="form-label">Media:</label>
                <input type="text" id="media" name="media" class="form-input" >

                <label for="dimensions" class="form-label">Dimensions:</label>
                <input type="text" id="dimensions" name="dimensions" class="form-input" >

                <label for="location" class="form-label">Location:</label>
                <input type="text" id="location" name="location" class="form-input" >

                <label for="description" class="form-label">Description:</label>
                <textarea id="description" name="description" class="form-textarea"></textarea>

                <label for="Image" class="form-label">Upload Image:</label>
                <input type="file" id="image" name="image" class="form-file">

                <button type="submit" class="form-button">Create Artwork</button>
              </form>
              </div>
              ${footer}
            `)
        }
    },

    async createArtworkSSRPost(req, res) {
        try {
            const header = headerTemplate();
            const footer = footerTemplate();
            const artwork = await Artwork.create({ ...req.body, image: req.file.filename });
            res.redirect(`/artwork/${artwork._id}`);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    async updateArtworkSSR(req, res) {
        const header = headerTemplate();
        const footer = footerTemplate();
        try {
            const id = req.params.id;
            const artwork = await Artwork.findById(id);
            if (!artwork) {
                
                return res.send(`
                    ${header}
                    <h1>Error</h1>
                    <h2>Artwork not found.</h2>
                    ${footer}
                        `)
            } else {
            res.send(`
                    ${header}
                    <h1>Update Artwork</h1>
                    <a href="/artwork/${artwork._id}" class="back-btn">Back</a>
                    <div class="form-container">
                    <form action="/update/${artwork._id}" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="_id" value="${artwork._id}">
                        <label for="artist" class="form-label">Artist:</label>
                        <input type="text" id="artist" name="artist" class="form-input" value="${artwork.artist}" required>
      
                        <label for="title" class="form-label">Title:</label>
                        <input type="text" id="title" name="title" class="form-input" value="${artwork.title}" required>
      
                        <label for="year" class="form-label">Year:</label>
                        <input type="number" id="year" name="year" class="form-input" value="${artwork.year}">
      
                        <label for="type" class="form-label">Type:</label>
                        <input type="text" id="type" name="type" class="form-input" value="${artwork.type}">
      
                        <label for="media" class="form-label">Media:</label>
                        <input type="text" id="media" name="media" class="form-input" value="${artwork.media}">
      
                        <label for="dimensions" class="form-label">Dimensions:</label>
                        <input type="text" id="dimensions" name="dimensions" class="form-input" value="${artwork.dimensions}">
      
                        <label for="location" class="form-label">Location:</label>
                        <input type="text" id="location" name="location" class="form-input" value="${artwork.location}">
      
                        <label for="description" class="form-label">Description:</label>
                        <textarea id="description" name="description" class="form-textarea">${artwork.description}</textarea>
      
                        <label for="Image" class="form-label">Upload Image:</label>
                        <input type="file" id="image" name="image" class="form-file">
      
                    <button type="submit">Update Artwork</button>
                    </div>
                    </form>
                    ${footer}
                `);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    },

    async updateArtworkSSRPost(req, res) {
        console.log('Request body:', req.body);
        try {
            const header = headerTemplate();
            const footer = footerTemplate();
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
    },

    async deleteArtworkSSR(req, res) {
        try {
            const header = headerTemplate();
            const footer = footerTemplate();
            const id = req.params.id;
            const artwork = await Artwork.findById(id);
            if (!artwork) {
                return res.send(`
                    ${header}
                    <h1>Error</h1>
                    <h2>Artwork not found.</h2>
                    ${footer}
                    `)
            }
            await Artwork.findByIdAndDelete(id);
            res.redirect('/home');
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },
}

module.exports = ArtworkController, upload;
