
const Subject = require('./subject.model');
const config = require('../../config/db.config');
const Class = require('./class.model');
const messageConfig = require('../../config/message.config');
const jwt = require('jsonwebtoken');

module.exports = {

    addSubject: (subjectDetails) => {
        return new Promise((resolve, reject) => {
            Subject.findOne({ subjectName: subjectDetails.subjectName }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                if (data) {
                    return reject({ status: 400, message: 'Subject Already Exist' })
                } else {
                    let subject = new Subject({
                        subjectType: subjectDetails.subjectType,
                        subjectName: subjectDetails.subjectName,
                        schoolId: subjectDetails.schoolId
                    })
                    subject.save().then(data => {
                        return resolve({ success: true, message: 'Subject Added Successfully' })
                    }).catch(err => {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    })

                }
            })
        })
    },

    getSubjects: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            if (schoolDetails && schoolDetails.schoolId) {
                Subject.find({ "schoolId": schoolDetails.schoolId }, (err, data) => {
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

    addClass: (classDetails) => {
        return new Promise((resolve, reject) => {
            Class.findOne({ className: classDetails.className }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                if (data) {
                    return reject({ status: 400, message: 'Class Already Exist' })
                } else {
                    let myclass = new Class({
                        className: classDetails.className,
                        sections: classDetails.sections,
                        schoolId: classDetails.schoolId
                    })
                    myclass.save().then(data => {
                        return resolve({ success: true, message: 'Class Added Successfully' })
                    }).catch(err => {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    })

                }
            })
        })
    },
    getClasses: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            if (schoolDetails && schoolDetails.schoolId) {
                Class.find({ "schoolId": schoolDetails.schoolId }, (err, data) => {
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

