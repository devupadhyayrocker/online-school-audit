var express = require('express');
const formController = require('./reviewForm.controller');
// const auth = require('../../middleware/authorization');
const router = express.Router();

//  add review form
router.post('/addReviewForm', (req, res, next) => {
    const formDetails = req.body;
    try {
        formController.addForm(formDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            console.log("Erser",err);
            return next(err)
        })
    }
    catch (err) {
        console.log("Eer",err);
        return next(err)
    }

});

// update Review Form
router.post('/updateReviewForm', (req, res, next) => {
    const formDetails = req.body;
    try {
        formController.updateForm(formDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get all review form details
router.get('/getReviewForm', (req, res, next) => {
    try {
        formController.getAllFormDetails().then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get review form details
router.post('/getReviewFormByStaffId', (req, res, next) => {
    const formDetails = req.body;
    try {
        formController.getFormDetails(formDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get slef review details
router.post('/getFormDetailsByRole', (req, res, next) => {
    const formDetails = req.body;
    try {
        formController.getFormDetailsByRole(formDetails).then(result => {
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