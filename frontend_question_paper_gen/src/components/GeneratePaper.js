import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuesPaper } from "../actions/questionPaperActions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


function GeneratePaper(props, { getQuesPaper }) {
    const history = useNavigate();

    const [isPaperGenerated, setIsPaperGenerated] = useState(false);
    const [showPreviewButton, setShowPreviewButton] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);


    const [errorMessages, setErrorMessages] = useState({
        passingMarks: '',
        totalMarks: '',
        percentagesSum: '',
    });

    const [formData, setFormData] = useState({
        instituteName: '',
        examName: '',
        authorName: props.userName ? props.userName : '',
        subject: '',
        totalMarks: '',
        passingMarks: '',
        easyPercentage: '',
        mediumPercentage: '',
        hardPercentage: '',
        timeToComplete: '',
    });

    const clearErrorMessages = () => {
        setErrorMessages({
            passingMarks: '',
            totalMarks: '',
            percentagesSum: '',
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePercentageChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseInt(e.target.value, 10) });
    };

    useEffect(() => {
        // If user changes (e.g., after login), update the authorName in the form
        setFormData((prevFormData) => ({
            ...prevFormData,
            authorName: props.userName,
        }));
    }, [props.userName]);


    const generatePaper = (e) => {
        e.preventDefault();
        try {
            let totalMarks = parseInt(formData.totalMarks, 10);
            if (parseInt(formData.passingMarks, 10) >= totalMarks) {
                console.log("Passing marks should be less than total marks");
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    passingMarks: 'Passing marks should be less than total marks',
                }));
                setTimeout(clearErrorMessages, 3000);
                return;  // Stop execution if the condition is not met
            }
            let easyPercent = parseInt(formData.easyPercentage, 10);
            let mediumPercent = parseInt(formData.mediumPercentage, 10);
            let hardPercent = parseInt(formData.hardPercentage, 10);

            // Calculate the sum of percentages
            const sumOfPercent = easyPercent + mediumPercent + hardPercent;

            // Check if the sum of percentages is less than 100
            if (sumOfPercent !== 100) {
                console.log("Sum of percentages should be equal to 100");
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    percentagesSum: 'Sum of percentages should be equal to 100',
                }));
                setTimeout(clearErrorMessages, 3000);
                return;  // Stop execution if the condition is not met
            }

            const newPaper = {
                instituteName: formData.instituteName,
                examName: formData.examName,
                authorName: formData.authorName,
                subject: formData.subject,
                totalMarks: formData.totalMarks,
                passingMarks: formData.passingMarks.toString(),
                easyPercentage: formData.easyPercentage.toString(),
                mediumPercentage: formData.mediumPercentage.toString(),
                hardPercentage: formData.hardPercentage.toString(),
                timeToComplete: formData.timeToComplete,
            };
            props.getQuesPaper(newPaper).then(response => {
                console.log(response);

                if (response.success) {
                    setIsPaperGenerated(true);
                    setShowPreviewButton(true);
                    setShowSuccessMessage(true);

                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 5000);
                } else {
                    setIsPaperGenerated(false);
                    setShowPreviewButton(false);
                    setShowSuccessMessage(false);
                }
            }).catch(error => {
                console.log(error);
                setIsPaperGenerated(false);
                setShowPreviewButton(false);
                setShowSuccessMessage(false);
            });
        }
        catch (error) {
            console.log(error);
            setIsPaperGenerated(false);
            setShowPreviewButton(false);
            setShowSuccessMessage(false);
        }
    };
    const previewPaper = () => {
        history('/preview');
    };


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Make Question Paper </h2>
            <form onSubmit={generatePaper}>
                <div className="mb-4">
                    <label htmlFor="instituteName" className="block text-sm font-medium text-gray-600">
                        Name of institution
                    </label>
                    <input
                        type="text"
                        id="instituteName"
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="examName" className="block text-sm font-medium text-gray-600">
                        Examination Name (e.g. Mid-Semester Exam)
                    </label>
                    <input
                        type="text"
                        id="examName"
                        name="examName"
                        value={formData.examName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="authorName" className="block text-sm font-medium text-gray-600">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="authorName"
                        name="authorName"
                        value={props.userName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-600">
                        Subject
                    </label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    >
                        <option value="" disabled>Select a Subject</option>
                        <option value="Maths">Maths</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="English">English</option>

                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="easyPercentage" className="block text-sm font-medium text-gray-600">
                        Easy Percentage (Marks in %)
                    </label>
                    <input
                        type="text"
                        id="easyPercentage"
                        name="easyPercentage"
                        pattern="\d*" // Only allow numbers
                        value={formData.easyPercentage}
                        onChange={handlePercentageChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                    {errorMessages.percentagesSum && (
                        <p className="text-red-500 text-xs mt-1">{errorMessages.percentagesSum}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="mediumPercentage" className="block text-sm font-medium text-gray-600">
                        Medium Percentage (Marks in %)
                    </label>
                    <input
                        type="text"
                        id="mediumPercentage"
                        name="mediumPercentage"
                        value={formData.mediumPercentage}
                        onChange={handlePercentageChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                    {errorMessages.percentagesSum && (
                        <p className="text-red-500 text-xs mt-1">{errorMessages.percentagesSum}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="hardPercentage" className="block text-sm font-medium text-gray-600">
                        Hard Percentage  (Marks in %)
                    </label>
                    <input
                        type="text"
                        id="hardPercentage"
                        name="hardPercentage"

                        value={formData.hardPercentage}
                        onChange={handlePercentageChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                    {errorMessages.percentagesSum && (
                        <p className="text-red-500 text-xs mt-1">{errorMessages.percentagesSum}</p>
                    )}
                </div>


                <div className="mb-4">
                    <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-600">
                        Total Marks
                    </label>
                    <input
                        type="text"
                        id="totalMarks"
                        name="totalMarks"

                        value={formData.totalMarks}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-600">
                        Passing Marks
                    </label>
                    <input
                        type="text"
                        id="passingMarks"
                        name="passingMarks"
                        pattern="\d*"
                        value={formData.passingMarks}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                    {errorMessages.passingMarks && (
                        <p className="text-red-500 text-xs mt-1">{errorMessages.passingMarks}</p>
                    )}
                </div>


                <div className="mb-4">
                    <label htmlFor="timeToComplete" className="block text-sm font-medium text-gray-600">
                        Duration of Exam (in minutes)
                    </label>
                    <input
                        type="text"
                        id="timeToComplete"
                        name="timeToComplete"
                        pattern="\d*"
                        value={formData.timeToComplete}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="flex-l bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Generate Question Paper
                    </button>
                    {isPaperGenerated && showPreviewButton && (
                        <button
                            type="button"
                            onClick={previewPaper}
                            className="flex-r bg-blue-500 text-white py-2 px-4 rounded-md bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Preview Question Paper
                        </button>
                    )}
                </div>
            </form>

            {showSuccessMessage && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <p className="font-bold">Success!</p>
                    <p>Question paper generated successfully!</p>

                </div>
            )}
        </div>
    );
}

GeneratePaper.propTypes = {
    userName: PropTypes.string.isRequired,
    getQuesPaper: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    userName: state.auth.user.name,
    errors: state.errors,
});


export default connect(mapStateToProps, { getQuesPaper })(GeneratePaper);