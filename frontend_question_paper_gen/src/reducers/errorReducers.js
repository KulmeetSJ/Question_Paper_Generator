import { GET_ERRORS, GET_QUESTION_ERRORS } from "../actions/types";

const initialState = {};

// Provide a name for the function (e.g., errorReducer)
const errorReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case GET_QUESTION_ERRORS:
            return action.payload;
        default:
            return state;
    }
};

export default errorReducer; // Provide a name for the export
