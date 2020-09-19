
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    creationDate: { type: Date, default: Date.now },
    updationDate: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Admin', AdminSchema);
