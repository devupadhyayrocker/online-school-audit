const School = require('./school.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');
const jwt = require('jsonwebtoken');
module.exports = {

    onLogin: (loginDetails) => {
        return new Promise((resolve, reject) => {
            if (loginDetails && loginDetails.username) {
                School.find({ "username": loginDetails.username }, (err, data) => {
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
    },addSchool: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            let school = new School({
                schoolName: schoolDetails.schoolName,
                location: schoolDetails.location,
                schoolEmail: schoolDetails.schoolEmail
            })
            school.save().then(data => {
                return resolve({ success: true, message: 'School Added Successfully' })
            }).catch(err => {
                console.log("err",err);
                return reject({ status: 500, message: messageConfig.BAD_REQUEST })
            })


        })
    },

    updateSchool: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            if (schoolDetails && schoolDetails.schoolId) {
                School.update({ "_id": schoolDetails.schoolId }, {
                    $set: {
                        schoolName: schoolDetails.schoolName,
                        location: schoolDetails.location,
                        schoolEmail: schoolDetails.schoolEmail
                    }
                },(error, data) => {
                    if(error){
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data:data,  message: 'School Updated Successfully' })
                })

            } else {
                return reject({ status: 400,message:'SchoolId is required' })
            }
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
    deleteSchool: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            if (schoolDetails && schoolDetails.schoolId) {
                School.remove({ "_id": schoolDetails.schoolId }, (err) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, message: 'School Deleted Scuccessfully' })
                })
            } else {
                return reject({ status: 400, message: 'SchoolId is required' })
            }
        })
    },
    getAllSchool: () => {
        return new Promise((resolve, reject) => {
            School.find({}, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
            })
        })
    },

}

