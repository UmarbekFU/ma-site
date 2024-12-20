const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/newsletter', require('./routes/newsletter'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT); 