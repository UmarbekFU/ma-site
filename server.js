const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Explicitly set the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Server is working!',
    publicPath: path.join(__dirname, 'public'),
    files: fs.readdirSync(path.join(__dirname, 'public'))
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

// Serve index.html for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <h1>Setup Issue</h1>
      <p>index.html not found at: ${indexPath}</p>
      <p>Current directory contents:</p>
      <pre>${fs.readdirSync(__dirname).join('\n')}</pre>
      <p>Public directory contents:</p>
      <pre>${fs.existsSync(path.join(__dirname, 'public')) ? 
        fs.readdirSync(path.join(__dirname, 'public')).join('\n') : 
        'public directory not found'}</pre>
    `);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Current directory:', __dirname);
  console.log('Public directory:', path.join(__dirname, 'public'));
}); 