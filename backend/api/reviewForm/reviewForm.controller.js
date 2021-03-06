
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
                peerArr: formDetails.peerArr,
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

    updateForm: (formDetails) => {
        return new Promise((resolve, reject) => {
            if (formDetails) {
                for(let peer of formDetails.peerArr){
                    ReviewForm.update({ "_id": formDetails.id }, {
                        $push: {
                            "peerArr" : peer
                        }
                    }, (error, result) => {
                        if (error) {
                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        }
                    })
                }
                return resolve({ success: true, message: "Peer Updated Successfully" })

            } else {
                return reject({ status: 400, message: 'Invalid Current Password' })
            }

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

