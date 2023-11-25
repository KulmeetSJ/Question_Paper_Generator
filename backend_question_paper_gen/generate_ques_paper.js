const fs = require('fs');

const jsonData = fs.readFileSync('./question_bank.json', 'utf-8');
const questionBank = JSON.parse(jsonData);

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function generateEasyQuestions(subject, difficulty, marks) {
    var remainingMarks = marks;


    // Function to filter questions randomly
    function getRandomQuestions(difficulty, marks) {
        if (!questionBank[subject][difficulty]) {
            throw new Error(`Difficulty "${difficulty}" not found for subject "${subject}".`);
        }

        const questions = shuffleArray(questionBank[subject][difficulty]);
        return questions.slice(0, marks);
    }

    // Randomly select questions while staying within the total marks limit
    function selectRandomQuestions(difficulty, marks) {
        const availableQuestions = getRandomQuestions(difficulty, marks);
        const selectedQuestions = [];

        for (const question of availableQuestions) {
            if (remainingMarks >= question.marks) {
                selectedQuestions.push(question);
                remainingMarks -= question.marks;
            }
        }
        return selectedQuestions;
    }

    const easyQuestions = selectRandomQuestions('Easy', marks);

    if (remainingMarks > 0) {
        throw new Error(`Insufficient questions in the question bank to meet the total marks requirement.`);
    }

    return easyQuestions;
}

function generateMediumQuestions(subject, difficulty, marks) {
    var remainingMarks = marks;


    // Function to filter questions randomly
    function getRandomQuestions(difficulty, marks) {
        if (!questionBank[subject][difficulty]) {
            throw new Error(`Difficulty "${difficulty}" not found for subject "${subject}".`);
        }

        const questions = shuffleArray(questionBank[subject][difficulty]);
        return questions.slice(0, marks);
    }

    // Randomly select questions while staying within the total marks limit
    function selectRandomQuestions(difficulty, marks) {
        const availableQuestions = getRandomQuestions(difficulty, marks);
        const selectedQuestions = [];

        for (const question of availableQuestions) {
            if (remainingMarks >= question.marks) {
                selectedQuestions.push(question);
                remainingMarks -= question.marks;
            }
        }
        return selectedQuestions;
    }

    const mediumQuestions = selectRandomQuestions('Medium', marks);

    if (remainingMarks > 0) {
        throw new Error(`Insufficient questions in the question bank to meet the total marks requirement.`);
    }

    return mediumQuestions;
}

function generateHardQuestions(subject, difficulty, marks) {
    var remainingMarks = marks;

    // Function to filter questions randomly
    function getRandomQuestions(difficulty, marks) {
        if (!questionBank[subject][difficulty]) {
            throw new Error(`Difficulty "${difficulty}" not found for subject "${subject}".`);
        }

        const questions = shuffleArray(questionBank[subject][difficulty]);
        return questions.slice(0, marks);
    }

    // Randomly select questions while staying within the total marks limit
    function selectRandomQuestions(difficulty, marks) {
        const availableQuestions = getRandomQuestions(difficulty, marks);
        const selectedQuestions = [];

        for (const question of availableQuestions) {
            if (remainingMarks >= question.marks) {
                selectedQuestions.push(question);
                remainingMarks -= question.marks;
            }
        }
        return selectedQuestions;
    }

    const hardQuestions = selectRandomQuestions('Hard', marks);

    if (remainingMarks > 0) {
        throw new Error(`Insufficient questions in the question bank to meet the total marks requirement.`);
    }

    return hardQuestions;
}

function generateQuestionPaper(subject, totalMarks, easyPercentage, mediumPercentage, hardPercentage) {

    totalMarks = parseInt(totalMarks, 10);
    easyPercentage = parseInt(easyPercentage, 10);
    mediumPercentage = parseInt(mediumPercentage, 10);
    hardPercentage = parseInt(hardPercentage, 10);

    if (!questionBank[subject]) {
        throw new Error(`Subject "${subject}" not found in the question bank.`);
    }

    const questionPaper = [];

    const easyMarks = Math.round(easyPercentage / 100 * totalMarks);
    const mediumMarks = Math.round(mediumPercentage / 100 * totalMarks);
    const hardMarks = Math.round(hardPercentage / 100 * totalMarks);

    console.log(easyMarks);
    console.log(mediumMarks);
    console.log(hardMarks);


    // Select random questions from each difficulty level
    const easyQuestions = generateEasyQuestions(subject, 'Easy', easyMarks);
    const mediumQuestions = generateMediumQuestions(subject, 'Medium', mediumMarks);
    const hardQuestions = generateHardQuestions(subject, 'Hard', hardMarks);

    questionPaper.push(...easyQuestions, ...mediumQuestions, ...hardQuestions);

    return questionPaper;
}


module.exports = generateQuestionPaper;
