var express = require('express');
const commonController = require('./common-list.controller');
// const auth = require('../../middleware/authorization');
const router = express.Router();

//  add subject
router.post('/addSubject', (req, res, next) => {
    const subjectDetails = req.body;
    try {
        commonController.addSubject(subjectDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get subject list
router.post('/getSubjectList', (req, res, next) => {
    const schoolDetails = req.body;
    try {
        commonController.getSubjects(schoolDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  add class
router.post('/addClass', (req, res, next) => {
    const classDetails = req.body;
    try {
        commonController.addClass(classDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get class list
router.post('/getClassList', (req, res, next) => {
    const schoolDetails = req.body;
    try {
        commonController.getClasses(schoolDetails).then(result => {
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