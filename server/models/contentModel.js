// server/models/contentModel.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    // A unique identifier for the content, like 'aboutPageText'
    key: {
        type: String,
        required: true,
        unique: true,
    },
    // The actual content the admin will edit
    value: {
        type: String,
        required: true,
    },
}, {
    // Automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
});

module.exports = mongoose.model('Content', contentSchema);