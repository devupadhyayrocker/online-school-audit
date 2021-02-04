
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EditorSchema = new Schema({

    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    croEvaluation: [{
        staffId: '',
       croData: []
    }]
});

// Export the model
module.exports = mongoose.model('editor', EditorSchema);
