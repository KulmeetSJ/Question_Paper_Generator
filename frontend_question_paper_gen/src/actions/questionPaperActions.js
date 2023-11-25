import axios from 'axios';
import {
    GET_QUESTION_ERRORS,
    REMOVE_QUES_PAPER,
    SET_PAPER_DATA,
    SET_FORM_DATA,
} from './types';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Set your desired base URL here
    timeout: 10000, // Adjust as needed
});

export const getQuesPaper = (formData) =>
    dispatch => {
        return new Promise((resolve, reject) => {
            instance.post('/generate/getpaper', formData)
                .then((res) => {
                    dispatch({
                        type: SET_PAPER_DATA,
                        payload: res.data || 'Unable to set paper data'
                    });
                    dispatch({
                        type: SET_FORM_DATA,
                        payload: formData || 'Unable to set form data'
                    });
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    dispatch({
                        type: GET_QUESTION_ERRORS,
                        payload: err.response?.data || err
                    });
                    reject(err);
                });
        });
    };


export const removeQuesPaper = () =>
    dispatch => {
        console.log('Removing ques paper');
        localStorage.removeItem('questionPaper');
        localStorage.removeItem('formData');
        dispatch({
            type: REMOVE_QUES_PAPER,
            payload: {}
        });
        console.log('Removed');
    };
