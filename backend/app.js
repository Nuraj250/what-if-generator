const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const whatIfRoutes = require('./routes/whatIfRoutes');

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/what-if', whatIfRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
