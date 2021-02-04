
const Staff = require('./staff.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');
const cryptoRandomString = require('crypto-random-string');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
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
                        subjectName: staffDetails.subjectName,
                        className: staffDetails.className,
                        sectionName: staffDetails.sectionName,
                        schoolId: staffDetails.schoolId,
                        schoolName: staffDetails.schoolName,
                        staffEmail: staffDetails.staffEmail,
                        username: uname,
                        password: uname + '@' + cryptoRandomString({ length: 4 }),
                        role: staffDetails.isTeaching ? 'teaching' : 'nonteaching'
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
                        isClassTeacher: 0,
                        teachingType: null,
                        isReviewing: 0,
                        staffArea: null,
                        teacherCategory: null,
                        subjectDetails: {},
                        schoolId: staffDetails.schoolId,
                        schoolName: staffDetails.schoolName,
                        staffEmail: staffDetails.staffEmail,
                        username: uname,
                        password: uname + '@' + cryptoRandomString({ length: 4 }),
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
                }, (error, data) => {
                    if (error) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: 'Principal Updated Successfully' })
                })

            } else {
                return reject({ status: 400, message: 'School Id is required' })
            }
        })
    },

    principalReview: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails && staffDetails.staffId) {
                Staff.update({ "_id": staffDetails.staffId }, {
                    $set: {
                        isReviwedByPrincipal: true
                    }
                }, (error, data) => {
                    if (error) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: 'Principal Reviewed Successfully' })
                })

            } else {
                return reject({ status: 400, message: 'Staff Id is required' })
            }
        })
    },
    updateStaff: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails && staffDetails.staffId) {
                Staff.update({ "_id": staffDetails.staffId }, {
                    $set: {
                        name: staffDetails.name,
                        contactNo: staffDetails.contactNo,
                        isTeaching: staffDetails.isTeaching,
                        isClassTeacher: staffDetails.isClassTeacher,
                        teachingType: staffDetails.teachingType,
                        staffArea: staffDetails.staffArea,
                        teacherCategory: staffDetails.teacherCategory,
                        subjectDetails: staffDetails.subjectDetails,
                        schoolId: staffDetails.schoolId,
                        schoolName: staffDetails.schoolName,
                        staffEmail: staffDetails.staffEmail
                    }
                }, (error, data) => {
                    if (error) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: 'Staff Updated Successfully' })
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
                } else if (staffDetails.formType == 2) {
                    answers = {
                        teachpeerAnswers: staffDetails.answers,
                        isteachPeerSubmitted: true,
                        'totalMarks.teacherPeerMarks': staffDetails.totalMarks
                    }
                }
                else if (staffDetails.formType == 3) {
                    answers = {
                        docAnswers: staffDetails.answers,
                        isDocSubmitted: true,
                        'totalMarks.teacherDocMarks': staffDetails.totalMarks
                    }
                }
                else if (staffDetails.formType == 4) {
                    answers = {
                        nonTeachselfAnswers: staffDetails.answers,
                        isnonTeachSelfSubmitted: true,
                        'totalMarks.nonTeacherSelfMarks': staffDetails.totalMarks
                    }
                }
                else if (staffDetails.formType == 5) {
                    answers = {
                        nonTeachpeerAnswers: staffDetails.answers,
                        isnonTeachPeerSubmitted: true,
                        'totalMarks.nonTeacherPeerMarks': staffDetails.totalMarks
                    }
                }

                else if (staffDetails.formType == 6) {
                    answers = {
                        PrincipalTeachingAnswers: staffDetails.answers,
                        'totalMarks.principalTeacherMarks': staffDetails.totalMarks
                    }
                }
                else {
                    answers = {
                        PrincipalNonTeachingAnswers: staffDetails.answers,
                        'totalMarks.principalNonTeacherMarks': staffDetails.totalMarks
                    }
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
    updatePeerStatus: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails) {
                for (let staff of staffDetails) {
                    console.log("ddr", staff, staffDetails);
                    Staff.update({ "_id": staff.staffIdBy }, {
                        $set: {
                            isReviewing: true
                        }
                    }, (error, data) => {
                        if (error) {
                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        }
                        console.log("Dd", data);
                    })
                }
                return resolve({ success: true, data: {}, message: 'Staff Updated Successfully' })
            } else {
                return reject({ status: 400, message: 'Staff Id is required' })
            }
        })
    },
    updatePrincipalSubmission: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails) {
                let staffData = {
                    staffId: staffDetails.staffId,
                    answers: staffDetails.answers,
                    totalMarks: staffDetails.totalMarks
                }
                console.log("yy",staffData);
                Staff.update({ "_id": staffDetails.Id }, {
                    $push: {
                        "PrincipalStaffDetails": staffData
                    }
                }, (error, data) => {
                    if (error) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: {}, message: 'Principal Submission Successfully' })
                }) 
            } else {
                return reject({ status: 400, message: 'Staff Id is required' })
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
    sendMail: (mailDetails) => {
        return new Promise((resolve, reject) => {
            if (mailDetails) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    auth: {
                        user: 'co.audit@jaipuria.edu.in',
                        pass: 'hesoyam!@12'
                    }
                });

                // var mailOptions = {
                //     from: 'audit.CO@jaipuria.edu.in',
                //     to: mailDetails.staffEmail,
                //     subject: `JAPP 2020 Login ID, Passcode and Instructions`,
                //     html: `<html>
                   
                //     <head>
                //     <title>JAPP 2020 Login ID, Passcode and Instructions</title>
                //     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
                //     </head>
                //     <body>
                //     <p>Dear ${mailDetails.name},<br>
                //     <br>
                //     On behalf of Seth Anandram Jaipuria School, we would like to inform you that you have been selected by your school management for appearing in JAPP(Jaipuria Online Audit Platform for Performance) for evaluating your skillsets and expertise.<br><br>Please note the following details<br>
                //     <br>
                //     URL - http://audit.jaipuriaschools.com/<br>
                //     <br>
                //     Username: - ${mailDetails.username}<br>
                //     Password - ${mailDetails.password}<br>
                //     Time : - 2 PM<br>
                //     Date:- 9th November'2020, TODAY<br>
                //     <br>
                //     Please read the following instructions before login:-<br>
                //     1. You have to be on ZOOM during the entire duration of the Audit. Please log in at 2 PM.<br>
                //     2. Please remain on MUTE and Camera's should be on SWITCH ON Mode.<br>
                //     3. Please use CHAT BOX to raise your queries and avoid disturbing fellow colleagues during the Audit.<br>
                //     4.  Ensure that the internet connectivity is stable at your place during the audit period.  <br>
                //     5. Make sure that you are not using the cell phones to find the answers. <br>
                //     6. Platform is Mobile friendly.<br>
                //     7.  Ensure that you attempt all the forms in one sitting only.  <br>
                //     <br>
                //     Best Regards,<br>
                //     CO AUDIT Team<p>
                //     </body>
                //     </html>`
                // };
                var mailOptions = {
                    from: 'audit.CO@jaipuria.edu.in',
                    to: mailDetails.staffEmail,
                    subject: `JAPP 2020 Login ID, Passcode and Instructions`,
                    html: `<html>
                   
                    <head>
                    <title>JAPP 2020 Login ID, Passcode and Instructions</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
                    </head>
                    <body>
                    <p>Dear ${mailDetails.name},<br>
                    <br>
                    On behalf of Seth Anandram Jaipuria School, we would like to congratulate you all for the successful completion of the Phase 1 evaluation process of teaching and non teaching staff.
                    <br>
                    <br>
                    You are requested now to evaluate your own teaching and non teaching staffs. Kindly be rationale towards the selection of the right answer/ opinions for your employee's evaluation process.
                    <br>
                    <br>
                    You can access your platform for evaluation with the following credentials.
                    <br>
                    <br>
                    URL - http://audit.jaipuriaschools.com/<br>
                    <br>
                    Username: - ${mailDetails.username}<br>
                    Password - ${mailDetails.password}<br>
                    <br>
                    Start Date:- 10th November'2020 <br>
                    End Date :-  11th November'2020 <br>
                    <br>
                    Please read the following instructions before login:-<br>
                    <br>
                    1. You have select the staffs categories from the drop down menu and do the individual staff assessment one by one.<br>
                    2. Please do not forget to submit the information once you are done.<br>
                    3. Platform is Mobile friendly.<br>
                    4. Ensure that the internet connectivity is stable at your place during the audit period.  <br>
                    5. Ensure that you attempt all the forms in one sitting only. <br>
                    <br>
                    For any trouble/ concerns, please contact Mr. Dev Upadhayay at  9911127146.<br>
                    <br>
                    Best Regards,<br>
                    CO AUDIT Team<p>
                    </body>
                    </html>`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return reject({ success: false, status: 500, message: error.message })
                    } else {
                        return resolve({
                            success: true,
                            message: 'Sent Successfully'
                        })
                    }
                });

            } else {
                return reject({ status: 400, message: 'Mail Details is required' })
            }
        })
    },

    deleteStaff: (staffDetails) => {
        return new Promise((resolve, reject) => {
            if (staffDetails && staffDetails.staffId) {
                Staff.remove({ "_id": staffDetails.staffId }, (err) => {
                    if (err) {
                        return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, message: 'Staff Deleted Scuccessfully' })
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
    },
    getPrincipalBySchoolId: (schoolDetails) => {
        return new Promise((resolve, reject) => {
            Staff.find({ "isPrincipal": 1, "schoolId": schoolDetails.schoolId }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
            })
        })
    }, getAdminStaffList: () => {
        return new Promise((resolve, reject) => {
            Staff.find({ "isPrincipal": 0 }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
            })
        })
    },

    getPrincipalList: () => {
        return new Promise((resolve, reject) => {
            Staff.find({ "isPrincipal": 1 }, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                return resolve({ success: true, data: data, message: messageConfig.SUCCESS_MESSAGE })
            })
        })
    },


}

