
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({

    className: {
        type: String,
        required: true
    },
    sections: [{
        type: String,
    }],
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school"
    }
});

// Export the model
module.exports = mongoose.model('class', ClassSchema);
