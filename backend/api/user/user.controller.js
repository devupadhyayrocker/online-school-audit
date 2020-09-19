
const User = require('./user.model');
const config = require('../../config/db.config');
const messageConfig = require('../../config/message.config');
const jwt = require('jsonwebtoken');

module.exports = {

    addUser: (userDetails) => {
        return new Promise((resolve, reject) => {
            User.findOne({email: userDetails.email}, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: messageConfig.BAD_REQUEST })
                }
                if(data){
                    return reject({ status: 400, message: 'Email Already Exist' })
                }else{
               let user = new User({
                   username: userDetails.username,
                   email:userDetails.email,
                   password:userDetails.password,
                   role:userDetails.role
               })
               user.save().then(data => {
                return resolve({ success: true, message: 'User Added Successfully' })
            }).catch(err => {
                console.log("err",err);
                return reject({ status: 500, message: messageConfig.BAD_REQUEST })
            })

                }
            })
        })
    },

    onLogin: (loginDetails) => {
        return new Promise((resolve, reject) => {
            if (loginDetails && loginDetails.username) {
                User.find({ "username": loginDetails.username }, (err, data) => {
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


}

