const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true,
    },
    examName: {
        type: String,
        required: true,
    },
    author: {
        name: {
            type: String,
            required: true,
        },
    },
    subject: {
        type: String,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    passingMarks: {
        type: Number,
        required: true,
    },
    easyPercentage: {
        type: Number,
        required: true,
    },
    mediumPercentage: {
        type: Number,
        required: true,
    },
    hardPercentage: {
        type: Number,
        required: true,
    },
    questionPaperData: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

module.exports = QuestionPaper;
