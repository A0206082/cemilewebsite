// server/routes/contentRoutes.js
const express = require('express');
const router = express.Router();

// Import all three functions from the controller
const {
    getAllContent,
    getContent,
    updateContent
} = require('../controllers/contentController');

// Route for getting ALL content (for the admin dashboard)
router.get('/', getAllContent);

// Route for getting a SINGLE piece of content by its key
router.get('/:key', getContent);

// Route for UPDATING a single piece of content
router.put('/:key', updateContent);

module.exports = router;