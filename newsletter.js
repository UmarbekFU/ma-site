const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = new Newsletter({ email });
        await subscriber.save();
        res.status(201).json({ message: 'Successfully subscribed!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 