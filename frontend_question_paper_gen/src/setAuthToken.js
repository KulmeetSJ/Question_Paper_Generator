import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        console.log('Setting token');
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {

        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;