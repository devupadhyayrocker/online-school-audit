
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewFormSchema = new Schema({

    type: {
        type: Number,
        required: true
    },
    quesArr: [],
    options: [],
    answers: [],
    totalMarks: {
        type: Number
    },
    marksObtained: {
        type: Number
    },
    peerArr: [{
        staffIdBy: '',
        staffIdFor: ''
    }],
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
