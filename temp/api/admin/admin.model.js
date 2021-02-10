
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

// Export the model
module.exports = mongoose.model('admin', AdminSchema);
