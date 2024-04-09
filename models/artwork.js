const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema(
    {
        artist: String,
        title: String,
        year: Number,
        type: String,
        media: String,
        dimensions: String,
        location: String,
        description: String
    }, { timestamps: true }
);

const Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;