var express = require('express');
const adminController = require('./admin.controller');
const router = express.Router();

//  add users
router.post('/addUser', (req, res, next) => {
    const userDetails = req.body;
    try {
        adminController.addUser(userDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//admin login
router.post('/login', (req, res, next) => {
    const adminDetails = req.body;
    try {
        adminController.onLogin(adminDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("adm", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});


module.exports = router;