import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function PreviewPaper(props) {
    const { paper } = props;
    const { questionPaper } = paper.paper;
    const history = useNavigate();
    const contentRef = useRef();

    const groupQuestionsByDifficulty = () => {
        if (!Array.isArray(questionPaper)) {
            console.log("PreviewPaper.js: questionPaper is not an array")
            return { easyQuestions: [], mediumQuestions: [], hardQuestions: [] };
        }
        const easyQuestions = questionPaper.filter((question) => question.marks === 2);
        const mediumQuestions = questionPaper.filter((question) => question.marks === 5);
        const hardQuestions = questionPaper.filter((question) => question.marks === 10);
        return { easyQuestions, mediumQuestions, hardQuestions };
    };

    const { easyQuestions, mediumQuestions, hardQuestions } = groupQuestionsByDifficulty();

    const renderQuestions = (questions) => {
        return (
            <div>
                {questions.map((question, index) => (
                    <div key={index} className="mb-6">
                        <p className="text-lg font-semibold mb-2">{index + 1}. {question.question}</p>
                        <p className="text-sm font-medium text-gray-600">Marks: {question.marks}</p>
                        <p className="text-sm font-medium text-gray-600">Topic: {question.topic}</p>
                    </div>
                ))}
            </div>
        );
    };

    const handleSave = () => {
        // Placeholder function for saving to the database
        console.log("Saving question paper to the database...");
        history('/previous');
        // Add your save logic here
    };

    const handleRegenerate = () => {
        // Redirect to the generate page
        history('/generate');
    };

    const handleDownload = () => {
        const combinedQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
        const formattedText = combinedQuestions.map((question, index) => (
            `${index + 1}. ${question.question}\nMarks: ${question.marks}\nTopic: ${question.topic}\n\n`
        )).join('');

        const blob = new Blob([formattedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'question_paper.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // const handlePdfDownload = () => {
    //     html2canvas(contentRef.current).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    //         pdf.save('question_paper.pdf');
    //     });
    // };

    return (
        <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-6">Preview Paper Details</h2>
            {paper.formData && (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Author Name</p>
                            <p>{paper.formData.authorName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Institute Name</p>
                            <p>{paper.formData.instituteName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Exam Name</p>
                            <p>{paper.formData.examName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Subject</p>
                            <p>{paper.formData.subject}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Marks</p>
                            <p>{paper.formData.totalMarks}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Passing Marks</p>
                            <p>{paper.formData.passingMarks}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Duration</p>
                            <p>{paper.formData.timeToComplete} minutes</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Easy Percentage</p>
                            <p>{paper.formData.easyPercentage}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Medium Percentage</p>
                            <p>{paper.formData.mediumPercentage}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Hard Percentage</p>
                            <p>{paper.formData.hardPercentage}</p>
                        </div>
                    </div>
                </div>

            )}

            <div className="mb-12">
                <h2 className="text-4xl font-bold mb-6">Question Paper</h2>

                <div>
                    <h3 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Easy Section</h3>
                    {renderQuestions(easyQuestions)}
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Medium Section</h3>
                    {renderQuestions(mediumQuestions)}
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Hard Section</h3>
                    {renderQuestions(hardQuestions)}
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md"
                >
                    Save
                </button>
                <button
                    onClick={handleRegenerate}
                    className="bg-green-500 text-white px-4 py-2 mr-4 rounded-md"
                >
                    Regenerate
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                    Download
                </button>
            </div>
        </div>
    );
}

PreviewPaper.propTypes = {
    paper: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    paper: state.paper,
    formData: state.formData
});

export default connect(mapStateToProps)(PreviewPaper);
