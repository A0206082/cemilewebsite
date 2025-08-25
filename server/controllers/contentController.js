// server/controllers/contentController.js
const Content = require('../models/contentModel');

// @desc   Get all content pieces
// @route  GET /api/content
const getAllContent = async (req, res) => {
    try {
        const contents = await Content.find({}); // find({}) gets all documents
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc   Get content by its key
// @route  GET /api/content/:key
const getContent = async (req, res) => {
    try {
        const content = await Content.findOne({ key: req.params.key });
        if (content) {
            res.json(content);
        } else {
            res.status(404).json({ key: req.params.key, value: 'Default content. Please edit in the admin panel.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc   Update or create content by its key
// @route  PUT /api/content/:key
const updateContent = async (req, res) => {
    const { value } = req.body;

    try {
        const updatedContent = await Content.findOneAndUpdate(
            { key: req.params.key },
            { value: value },
            { new: true, upsert: true }
        );
        res.json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Make sure all three are exported!
module.exports = {
    getAllContent,
    getContent,
    updateContent,
};