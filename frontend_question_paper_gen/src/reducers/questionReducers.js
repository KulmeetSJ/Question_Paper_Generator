import { REMOVE_QUES_PAPER, SET_PAPER_DATA, SET_FORM_DATA } from "../actions/types";

const initialState = {
    paper: {},
    formData: {},
};


const questionReducer = function (state = initialState, action) {
    switch (action.type) {
        case REMOVE_QUES_PAPER:
            return {
                ...state,
                questions: [],

            };
        case SET_PAPER_DATA:
            return {
                ...state,
                paper: action.payload,
            };
        case SET_FORM_DATA:
            return {
                ...state,
                formData: action.payload,
            };
        default:
            return state;
    }
};

export default questionReducer;