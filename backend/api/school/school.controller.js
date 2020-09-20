
const School = require('./school.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');

module.exports = {

    addSchool: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            let school = new School({
                schoolName: schoolDetails.schoolName,
                location: schoolDetails.location,
                email: schoolDetails.email
            })
            school.save().then(data => {
                return resolve({ success: true, message: 'School Added Successfully' })
            }).catch(err => {
                return reject({ status: 500, message: messageConfig.BAD_REQUEST })
            })


        })
    },

    getSchoolDetails: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            if (schoolDetails && schoolDetails.schoolId) {
                School.find({ "_id": schoolDetails.schoolId }, (err, data) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
                })
            } else {
                return reject({ status: 400, message: 'SchoolId is required' })
            }
        })
    },

}

