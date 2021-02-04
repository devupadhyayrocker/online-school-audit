
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    schoolEmail: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('school', SchoolSchema);
