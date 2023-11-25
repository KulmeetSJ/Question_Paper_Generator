import axios from 'axios';
import setAuthToken from '../setAuthToken';
import { jwtDecode } from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
} from './types';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Set your desired base URL here
    timeout: 10000, // Adjust as needed
});

export const registerUser = (userData, history) =>
    dispatch => {
        instance.post('/users/register', userData)
            .then(res => {
                console.log("User registered successfully");
                history('/');
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response?.data || err
                })
            });
    };

export const loginUser = userData =>
    dispatch => {
        instance.post('/users/login', userData)
            .then(res => {
                const { token } = res.data;
                console.log(token);
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwtDecode(token);
                console.log('Decoded token:', decoded);
                const currentTime = Date.now() / 1000;  // Convert to seconds
                if (decoded.exp < currentTime) {
                    // Token is expired
                    console.log('Token is expired');
                }
                console.log(decoded);
                dispatch(setCurrentUser(decoded));

            })
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response?.data || err
            }));
    };


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


export const logoutUser = () =>
    dispatch => {
        console.log('Logging out');
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        console.log('Logged out');
    };
