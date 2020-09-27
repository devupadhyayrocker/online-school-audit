
const Staff = require('./staff.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');
const cryptoRandomString = require('crypto-random-string');
const jwt = require('jsonwebtoken');

module.exports = {

    onLogin: (loginDetails) => {
        return new Promise((resolve, reject) => {
            if (loginDetails && loginDetails.username) {
                Staff.find({ "username": loginDetails.username }, (err, data) => {
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

    addStaff: (staffDetails) => {
        return new Promise((resolve, reject) => {
            Staff.findOne({ contactNo: staffDetails.contactNo }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                if (data) {
                    return reject({ status: 400, message: 'Contact No Already Exist' })
                } else {
                    let uname = staffDetails.staffEmail.substring(0, staffDetails.staffEmail.lastIndexOf("@"));
                    let staff = new Staff({
                        name: staffDetails.name,
                        contactNo: staffDetails.contactNo,
                        isPrincipal: 0,
                        isTeaching: staffDetails.isTeaching,
                        isClassTeacher: staffDetails.isClassTeacher,
                        teachingType: staffDetails.teachingType,
                        isReviewing: 0,
                        staffArea: staffDetails.staffArea,
                        teacherCategory: staffDetails.teacherCategory,
                        subjectDetails: staffDetails.subjectDetails,
                        schoolId: staffDetails.schoolId,
                        schoolName: staffDetails.schoolName,
                        staffEmail: staffDetails.staffEmail,
                        username: uname,
                        password: uname + '@' + cryptoRandomString({length: 4}),
                        role: staffDetails.isTeaching ? 'teaching' : 'nonTeaching'
                    })
                    staff.save().then(data => {
                        return resolve({ success: true, message: 'Staff Added Successfully' })
                    }).catch(err => {
                        console.log("err", err);
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    })

                }
            })
        })
    },

    addPrincipal: (staffDetails) => {
        return new Promise((resolve, reject) => {
            Staff.findOne({ contactNo: staffDetails.contactNo }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                if (data) {
                    return reject({ status: 400, message: 'Contact No Already Exist' })
                } else {
                    let uname = staffDetails.staffEmail.substring(0, staffDetails.staffEmail.lastIndexOf("@"));
                    let staff = new Staff({
                        name: staffDetails.name,
                        contactNo: staffDetails.contactNo,
                        isPrincipal: 1,
                        isTeaching: 0,
                        isClassTeacher:0,
                        teachingType: null,
                        isReviewing: 0,
                        staffArea: null,
                        teacherCategory: null,
                        subjectDetails: {},
                        schoolId: staffDetails.schoolId,
                        schoolName: staffDetails.schoolName,
                        staffEmail: staffDetails.staffEmail,
                        username: uname,
                        password: uname + '@' + cryptoRandomString({length: 4}),
                        role: 'principal'
                    })
                    staff.save().then(data => {
                        return resolve({ success: true, message: 'Principal Added Successfully' })
                    }).catch(err => {
                        console.log("err", err);
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    })

                }
            })
        })
    },
    updatePrincipal: (principalDetails) => {
        return new Promise((resolve, reject) => {
            if (principalDetails && principalDetails.schoolId) {
                Staff.update({ "schoolId": principalDetails.schoolId }, {
                    $set: {
                        name: principalDetails.name,
                        contactNo: principalDetails.contactNo,
                        staffEmail: principalDetails.staffEmail
                    }
                },(error, data) => {
                    if(error){
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data:data,  message: 'Principal Updated Successfully' })
                })

            } else {
                return reject({ status: 400,message:'School Id is required' })
            }
        })
    },
    deletePrincipal: (principalDetails) => {
        return new Promise((resolve, reject) => {
            if (principalDetails && principalDetails.staffId) {
                Staff.remove({ "_id": principalDetails.staffId }, (err) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, message: 'Principal Deleted Scuccessfully' })
                })
            } else {
                return reject({ status: 400, message: 'StaffId is required' })
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
                    return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE})
                })


            } else {
                return reject({ status: 404, message: 'StaffId is required' })
            }
        })
    },
    getStaffList: () => {
        return new Promise((resolve, reject) => {
                Staff.find({ "isPrincipal": 0 }, (err, data) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE})
                })
        })
    },

    getPrincipalList: () => {
        return new Promise((resolve, reject) => {
                Staff.find({ "isPrincipal": 1 }, (err, data) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE})
                })
        })
    },


}

