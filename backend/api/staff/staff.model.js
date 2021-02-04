
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
    isReviwedByPrincipal: {
        type: Boolean,
        default: false
    },
    staffArea: {
        type: String
    },
    teacherCategory: {  //N.T.  P.R.T.  T.G.T.
        type: String
    },
    subjectName: [],

    className: [],

    sectionName: [],

    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school"
    },
    schoolName: {
        type: String
    },

    totalMarks: {
        teacherSelfMarks: 0,
        teacherPeerMarks: 0,
        teacherDocMarks: 0,
        nonTeacherSelfMarks: 0,
        nonTeacherPeerMarks: 0,
    },
    PrincipalStaffDetails: [{
        staffId: '',
        answers: [],
        totalMarks: 0
    }]
    ,
    teachselfAnswers: []
    ,
    teachpeerAnswers: []
    ,
    docAnswers: []
    ,
    nonTeachselfAnswers: []
    ,
    nonTeachpeerAnswers: []
    ,
    isteachSelfSubmitted: {
        type: Boolean,
        default: false
    },
    isteachPeerSubmitted: {
        type: Boolean,
        default: false
    },
    isDocSubmitted: {
        type: Boolean,
        default: false
    },
    isnonTeachSelfSubmitted: {
        type: Boolean,
        default: false
    },
    isnonTeachPeerSubmitted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String
    },
});

// Export the model
module.exports = mongoose.model('staff', StaffSchema);
