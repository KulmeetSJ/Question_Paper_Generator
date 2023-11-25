const express = require('express');
const router = express.Router();
const validateQuestionInput = require('../validation/generate');
const generateQuestionPaper = require('../generate_ques_paper.js');



router.post('/getpaper', (req, res) => {
    console.log(req.body);
    const newPaper = {
        instituteName: req.body.instituteName,
        examName: req.body.examName,
        authorName: req.body.authorName,
        subject: req.body.subject,
        totalMarks: req.body.totalMarks,
        passingMarks: req.body.passingMarks,
        easyPercentage: req.body.easyPercentage,
        mediumPercentage: req.body.mediumPercentage,
        hardPercentage: req.body.hardPercentage,
        duration: req.body.duration,
    };

    const { errors, isValid } = validateQuestionInput(newPaper);



    if (!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
    }


    const questionPaper = generateQuestionPaper(newPaper.subject, newPaper.totalMarks, newPaper.easyPercentage, newPaper.mediumPercentage, newPaper.hardPercentage);

    // Send the question paper as JSON response
    res.status(200).json({ success: true, questionPaper });

});

router.post("/save", (req, res) => {
    const newPaper = {
        instituteName: req.body.instituteName,
        examName: req.body.examName,
        authorName: req.body.authorname,
        subject: req.body.subject,
        totalMarks: req.body.totalMarks,
        passingMarks: req.body.passingMarks,
        easyPercentage: req.body.easyPercentage,
        mediumPercentage: req.body.mediumPercentage,
        hardPercentage: req.body.hardPercentage,
        questionPaperData: req.body.questionPaperData, // Assuming this is the field for question paper data
    };


    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Save question paper details to the database
    try {
        const savedQuestionPaper = QuestionPaper.create(newPaper);
        res.status(200).json({ success: true, questionPaper: savedQuestionPaper });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;