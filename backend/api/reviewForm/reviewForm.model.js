
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
    options: [{
        id: String,
        text: String,
    }],
    answers: [{
        id: String,
    }],
    totalMarks: {
        type: Number
    },
    marksObtained: {
        type: Number
    },
    staffIdFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff"
    },
    staffIdBy: {
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
    },
    role: {
        type: String
    }

}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('reviewForm', ReviewFormSchema);
