// server/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const contentRoutes = require('./routes/contentRoutes');

require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Use the content routes
// Any request starting with /api/content will be handled by contentRoutes
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});