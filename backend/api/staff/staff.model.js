
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
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
        type: String  //scholar/non-scholar
    },
    isReviewing: {
        type: Boolean
    }
    ,
    staffArea: {
        type: String
    },
    teacherCategory: {  //N.T.  P.R.T.  T.G.T.
        type: Boolean
    },
    // subject, class & section
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school"
    }
});

// Export the model
module.exports = mongoose.model('staff', StaffSchema);
