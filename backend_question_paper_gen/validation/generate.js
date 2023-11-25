const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateGenerateInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.instituteName = !isEmpty(data.instituteName) ? data.instituteName : "";
    data.subject = !isEmpty(data.subject) ? data.subject : "";
    data.examName = !isEmpty(data.examName) ? data.examName : "";
    data.authorName = !isEmpty(data.authorName) ? data.authorName : "";
    data.totalMarks = !isEmpty(data.totalMarks) ? data.totalMarks : "";
    data.passingMarks = !isEmpty(data.passingMarks) ? data.passingMarks : "";
    data.easyPercentage = !isEmpty(data.easyPercentage) ? data.easyPercentage : "";
    data.mediumPercentage = !isEmpty(data.mediumPercentage) ? data.mediumPercentage : "";
    data.hardPercentage = !isEmpty(data.hardPercentage) ? data.hardPercentage : "";

    // Format checks
    if (Validator.isEmpty(data.instituteName)) {
        errors.instituteName = "Name of institude is required";
    }

    // Subject checks
    if (Validator.isEmpty(data.subject)) {
        errors.subject = "Subject field is required";
    }

    // Name checks
    if (Validator.isEmpty(data.examName)) {
        errors.examName = "Name of Exam is required";
    }

    // Author checks
    if (Validator.isEmpty(data.authorName)) {
        errors.authorName = "Author field is required";
    }


    // Total marks checks
    if (Validator.isEmpty(data.totalMarks)) {
        errors.totalMarks = "Total marks field is required";
    }

    // Passing marks checks
    if (Validator.isEmpty(data.passingMarks)) {
        errors.passingMarks = "Passing marks field is required";
    }

    // Easy percentage checks
    if (Validator.isEmpty(data.easyPercentage)) {
        errors.easyPercentage = "Easy percentage field is required";
    }

    // Medium percentage checks
    if (Validator.isEmpty(data.mediumPercentage)) {
        errors.mediumPercentage = "Medium percentage field is required";
    }

    // Hard percentage checks
    if (Validator.isEmpty(data.hardPercentage)) {
        errors.hardPercentage = "Hard percentage field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
}