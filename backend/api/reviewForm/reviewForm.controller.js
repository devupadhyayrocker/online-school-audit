
const ReviewForm = require('./reviewForm.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');

module.exports = {

    addForm: (formDetails) => {
        return new Promise((resolve, reject) => {
            let reviewForm = new ReviewForm({
                type: formDetails.type,
                title: formDetails.title,
                quesArr: formDetails.quesArr,
                options: formDetails.options,
                answers: formDetails.answers,
                totalMarks: formDetails.totalMarks,
                marksObtained: formDetails.marksObtained,
                staffIdFor: "5f6f53379fea0e17ec4e89d8",
                staffIdBy: "5f6f53379fea0e17ec4e89d8",
                reviewStatus: formDetails.reviewStatus,
                schoolId: formDetails.schoolId,
                role: formDetails.role
            })
            reviewForm.save().then(data => {
                return resolve({ success: true, message: 'Form Added Successfully' })
            }).catch(err => {
                console.log("rwr",err);
                return reject({ status: 500, message: messageConfig.BAD_REQUEST })
            })

        })
    },

    getFormDetails: (reviewDetails) => {
        return new Promise((resolve, reject) => {
            if (reviewDetails && reviewDetails.staffId) {
                ReviewForm.find({ "staffIdFor": reviewDetails.staffId }, (err, data) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
                })
            } else {
                return reject({ status: 404, message: 'StaffId is required' })
            }
        })
    },
    getAllFormDetails: () => {
        return new Promise((resolve, reject) => {
                ReviewForm.find({}, (err, data) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
                })
            
        })
    },
    getFormDetailsByRole: (reviewDetails) => {
        return new Promise((resolve, reject) => {
            if (reviewDetails && reviewDetails.role) {
                ReviewForm.find({ "role": reviewDetails.role }, (err, data) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
                })
            } else {
                return reject({ status: 404, message: 'Role is required' })
            }
        })
    }

}

