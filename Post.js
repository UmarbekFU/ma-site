const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [10, 'Content must be at least 10 characters long']
    },
    type: {
        type: String,
        enum: {
            values: ['blog', 'podcast'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    mediaUrl: {
        type: String,
        required: function() { 
            return this.type === 'podcast';
        },
        validate: {
            validator: function(v) {
                if (this.type === 'podcast') {
                    return v && v.length > 0;
                }
                return true;
            },
            message: 'Media URL is required for podcasts'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp 