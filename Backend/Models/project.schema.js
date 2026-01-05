const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        link: {
            type: String,
        },
        images: [
            {
                type: String, // image path or URL
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
