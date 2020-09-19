var express = require('express');
const userController = require('./user.controller');
// const auth = require('../../middleware/authorization');
const router = express.Router();

//  add users
router.post('/addUser', (req, res, next) => {
    const userDetails = req.body;
    try {
        userController.addUser(userDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// to login
router.post('/login', (req, res, next) => {
    const loginDetails = req.body;
    try {
        userController.onLogin(loginDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttrrrt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});


module.exports = router;