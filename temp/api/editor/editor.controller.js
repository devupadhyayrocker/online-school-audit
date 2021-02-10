const Editor = require('./editor.model');
const Staff = require('../staff/staff.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');
const jwt = require('jsonwebtoken');

module.exports = {
    addEditor: (editorDetails) => {
        return new Promise((resolve, reject) => {
            Editor.findOne({ username: editorDetails.username }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                if (data) {
                    return reject({ status: 400, message: 'Editor Already Exist' })
                } else {
                    let editor = new Editor({
                        username: editorDetails.username,
                        password: editorDetails.password,
                        role: editorDetails.role
                    })
                    editor.save().then(data => {
                        return resolve({ success: true, message: 'Editor Added Successfully' })
                    }).catch(err => {
                        console.log("err", err);
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    })

                }
            })
        })
    },

    onLogin: (loginDetails) => {
        return new Promise((resolve, reject) => {
            if (loginDetails && loginDetails.username) {
                Editor.find({ "username": loginDetails.username, "password": loginDetails.password }, (err, data) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }

                    if (data.length == 0) {
                        return reject({ status: 404, message: messageConfig.NOT_FOUND })
                    } else {
                        const token = jwt.sign({ id: data[0]._id, role: data[0].role }, config.privateKey);
                        return resolve({ success: true, token: token, data: data, message: "LoggedIn Successfully" })
                    }

                })


            } else {
                return reject({ status: 500, message: messageConfig.BAD_REQUEST })
            }
        })
    },
    getStaffList: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            Staff.find({ "isPrincipal": 0, "schoolId": schoolDetails.schoolId }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
            })
        })
    },
    updateEditorSubmission: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails) {
                // let staffData = {
                //     staffId: staffDetails.staffId,
                //     class:staffDetails.class,
                //     subject:staffDetails.subject,
                //     answers: staffDetails.answers,
                //     observedBy:staffDetails.observedBy,
                //     ObserverRemarks:staffDetails.ObserverRemarks,
                //     CroDate:staffDetails.CroDate,
                //     totalMarks: staffDetails.totalMarks
                // }
                // console.log("yy", staffData);
                // Editor.update({ "_id": staffDetails.Id }, {
                //     $push: {
                //         "croEvaluation": staffData
                //     }
                // }, (error, data) => {
                //     if (error) {
                //         return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                //     }
                //     return resolve({ success: true, data: {}, message: 'Editor Submission Successfully' })
                // })
                Editor.findOne({ "croEvaluation.staffId": staffDetails[0].staffId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    
                    if (data) {
                        console.log("working",staffDetails[0].croData);
                     
                        Editor.update({ "_id": staffDetails[0].Id }, {
                            $push: {
                                "croEvaluation.0.croData": staffDetails[0].croData
                            }
                        }, (error, result) => {
                            if (error) {
                                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                            }
                            return resolve({ success: true, data: result, message: 'Editor Reviewed Successfully' })
                        })
                    }
                    else {
                        console.log("tuy",staffDetails,staffDetails[0].Id);

                        Editor.update({ "_id": staffDetails[0].Id }, {
                            $push: {
                                "croEvaluation": staffDetails
                            }
                        }, (error, result) => {
                            if (error) {
                                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                            }
                            console.log("res",result);
                            return resolve({ success: true, data: result, message: 'Editor Reviewed Successfully' })
                        })

                    }
                })



            } else {
                return reject({ status: 400, message: 'Staff Id is required' })
            }
        })
    },

    getEditorReviews: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails && staffDetails.staffId) {
                Editor.find({ "_id": staffDetails.staffId }, (error, data) => {
                    if (error) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: 'Editor Reviewed Successfully' })
                })

            } else {
                return reject({ status: 400, message: 'Staff Id is required' })
            }
        })
    },
    updateAnswers: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails && staffDetails.staffId) {
                let answers = {};
                if (staffDetails.formType == 1) {
                    answers = {
                        teachselfAnswers: staffDetails.answers,
                        isteachSelfSubmitted: true,
                        'totalMarks.teacherSelfMarks': staffDetails.totalMarks
                    }
                }
                else {
                    // answers = {
                    //     PrincipalNonTeachingAnswers: staffDetails.answers,
                    //     'totalMarks.principalNonTeacherMarks': staffDetails.totalMarks
                    // }
                }
                Staff.update({ "_id": staffDetails.staffId }, {
                    $set: answers
                }, (error, data) => {
                    if (error) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: 'Answers Updated Successfully' })
                })

            } else {
                return reject({ status: 400, message: 'Staff Id is required' })
            }
        })
    },
    getStaffDetails: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails && staffDetails.staffId) {
                Staff.find({ "_id": staffDetails.staffId }, (err, data) => {
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
    getStaffList: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            Staff.find({ "isPrincipal": 0, "schoolId": schoolDetails.schoolId }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
            })
        })
    }

}

