
const Staff = require('./staff.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');

module.exports = {

    addStaff: (staffDetails) => {
        return new Promise((resolve, reject) => {
            Staff.findOne({ contactNo: staffDetails.contactNo }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                if (data) {
                    return reject({ status: 400, message: 'Contact No Already Exist' })
                } else {
                    let staff = new Staff({
                        name: staffDetails.name,
                        userId: staffDetails.userId,
                        contactNo: staffDetails.contactNo,
                        isPrincipal: staffDetails.isPrincipal,
                        isTeaching: staffDetails.isTeaching,
                        isClassTeacher: staffDetails.isClassTeacher,
                        teachingType: staffDetails.teachingType,
                        isReviewing: staffDetails.isReviewing,
                        staffArea: staffDetails.staffArea,
                        teacherCategory: staffDetails.teacherCategory,
                        subjectDetails: staffDetails.subjectDetails,
                        schoolId: staffDetails.schoolId,
                        role: staffDetails.role
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


}

