var express = require('express');
const staffController = require('./staff.controller');
// const auth = require('../../middleware/authorization');
const router = express.Router();

// staff Login
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

//  add editor
router.post('/addEditor', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.addEditor(staffDetails).then(result => {
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

// Is Reviewed By Principal
router.post('/principalReview', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.principalReview(staffDetails).then(result => {
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

//  get principal by School ID
router.post('/getPrincipalBySchoolId', (req, res, next) => {
    try {
        const staffDetails = req.body;
        staffController.getPrincipalBySchoolId(staffDetails).then(result => {
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
router.post('/getStaffList', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.getStaffList(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  update staff peer status
router.post('/updatepeerStatus', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.updatePeerStatus(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  update principal staffDetails
router.post('/updateEditorSubmission', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.updateEditorSubmission(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  get admin staff list
router.get('/getAdminStaffList', (req, res, next) => {

    try {
        staffController.getAdminStaffList().then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});


// update answers
router.post('/updateAnswers', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.updateAnswers(staffDetails).then(result => {
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