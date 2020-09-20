
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    
    subjectType: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school"
    }
});

// Export the model
module.exports = mongoose.model('subject', SubjectSchema);
