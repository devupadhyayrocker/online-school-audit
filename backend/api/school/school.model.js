
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    schoolName: {
        type: String,
        required: true
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
