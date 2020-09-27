
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    staffEmail: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    contactNo: {
        type: Number,
        required: true
    },
    isPrincipal: {
        type: Boolean
    },
    isTeaching: {
        type: Boolean
    },
    isClassTeacher: {
        type: Boolean
    },
    teachingType: {
        type: Boolean  //scholar/non-scholar
    },
    isReviewing: {
        type: Boolean
    },
    staffArea: {
        type: String
    },
    teacherCategory: {  //N.T.  P.R.T.  T.G.T.
        type: String
    },
    subjectDetails: {
        subjectName: { type: String },
        className: { type: String },
        sectionName: { type: String }
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school"
    },
    schoolName: {
        type: String
    },
    role: {
        type: String
    },
});

// Export the model
module.exports = mongoose.model('staff', StaffSchema);
