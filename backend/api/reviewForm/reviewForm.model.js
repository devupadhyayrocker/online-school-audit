
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewFormSchema = new Schema({

    type: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    quesArr: [{
        type: String
    }],
    totalMarks: {
        type: Number
    },
    marksObtained: {
        type: Number
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff"
    },
    reviewStatus: {
        type: String,
        default: 'pending'
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school"
    }
});

// Export the model
module.exports = mongoose.model('reviewForm', ReviewFormSchema);
