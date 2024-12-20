const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Move HTML files to public folder
try {
  if (!fs.existsSync(path.join(__dirname, 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'public'));
  }
  
  // Move HTML files to public
  ['index.html', 'blog.html', 'books.html', 'now.html', 'projects.html'].forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      fs.renameSync(
        path.join(__dirname, file),
        path.join(__dirname, 'public', file)
      );
    }
  });

  // Move JS files to public/js
  if (!fs.existsSync(path.join(__dirname, 'public', 'js'))) {
    fs.mkdirSync(path.join(__dirname, 'public', 'js'));
  }
  
  ['animations.js'].forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
      fs.renameSync(
        path.join(__dirname, file),
        path.join(__dirname, 'public', 'js', file)
      );
    }
  });
} catch (err) {
  console.error('Error organizing files:', err);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Server is working!',
    directory: fs.readdirSync(__dirname)
  });
});

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not defined in environment variables');
} else {
  mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));
}

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Current directory structure:');
  console.log(fs.readdirSync(__dirname));
}); 