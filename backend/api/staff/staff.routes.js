var express = require('express');
const staffController = require('./staff.controller');
// const auth = require('../../middleware/authorization');
const router = express.Router();

// admin Login
router.post('/login', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.onLogin(staffDetails).then(result => {
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

//  add staff
router.post('/addStaff', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.addStaff(staffDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  add principal
router.post('/addPrincipal', (req, res, next) => {
    const principalDetails = req.body;
    try {
        staffController.addPrincipal(principalDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// update principal
router.post('/updatePrincipal', (req, res, next) => {
    const principalDetails = req.body;
    try {
        staffController.updatePrincipal(principalDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// update staff
router.post('/updateStaff', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.updateStaff(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  delete principal
router.post('/deletePrincipal', (req, res, next) => {
    const principalDetails = req.body;
    try {
        staffController.deletePrincipal(principalDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  delete staff
router.post('/deleteStaff', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.deleteStaff(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  get principal list
router.get('/getPrincipalList', (req, res, next) => {
    try {
        staffController.getPrincipalList().then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  get staff list
router.get('/getStaffList', (req, res, next) => {
    try {
        staffController.getStaffList().then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  send Mail
router.post('/sendMail', (req, res, next) => {
    const mailDetails = req.body;
    try {
        staffController.sendMail(mailDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get staff details
router.post('/getStaffById', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.getStaffDetails(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});


module.exports = router;