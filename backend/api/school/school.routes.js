var express = require('express');
const schoolController = require('./school.controller');
// const auth = require('../../middleware/authorization');
const router = express.Router();

//  add school
router.post('/addSchool', (req, res, next) => {
    const schoolDetails = req.body;
    try {
        schoolController.addSchool(schoolDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get school details by id
router.post('/getSchoolById', (req, res, next) => {
    const schoolDetails = req.body;
    try {
        schoolController.getSchoolDetails(schoolDetails).then(result => {
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