var express = require('express');
const staffController = require('./staff.controller');
// const auth = require('../../middleware/authorization');
const router = express.Router();

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

// get staff details
router.post('/getStaffById', (req, res, next) => {
    const staffDetails = req.body;
    try {
        staffController.getStaffDetails(staffDetails).then(result => {
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