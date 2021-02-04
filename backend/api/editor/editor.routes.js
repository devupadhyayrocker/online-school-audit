var express = require('express');
const editorController = require('./editor.controller');
const router = express.Router();

//  add editor
router.post('/addEditor', (req, res, next) => {
    const EditorDetails = req.body;
    try {
        editorController.addEditor(EditorDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//editor login
router.post('/login', (req, res, next) => {
    const EditorDetails = req.body;
    try {
        editorController.onLogin(EditorDetails).then(result => {
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

//  get staff list
router.post('/getStaffList', (req, res, next) => {
    const staffDetails = req.body;
    try {
        editorController.getStaffList(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  update Editor Submission
router.post('/updateEditorSubmission', (req, res, next) => {
    const staffDetails = req.body;
    try {
        editorController.updateEditorSubmission(staffDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});


// Is Reviewed By Editor
router.post('/getEditorReviews', (req, res, next) => {
    const staffDetails = req.body;
    try {
        editorController.getEditorReviews(staffDetails).then(result => {
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
        editorController.getStaffList(staffDetails).then(result => {
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