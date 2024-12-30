import { GET_ALL_TASKS, GET_BY_ID, SET_LOADING_FALSE, SET_LOADING_TRUE } from "./actions/redux-types";

const initialGlobalState = {
    allTasks: [],
    singleTask: {},
    loading: false
};

export default function rootReducer (state = initialGlobalState, action: any){
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {
                ...state,
                isLoading: true,
            };
        case SET_LOADING_FALSE:
            return {
                ...state,
                isLoading: false,
            };
        case GET_ALL_TASKS: 
            return {
                ...state,
                allTasks: action.payload
            }
        case GET_BY_ID: 
            return {
                ...state,
                singleTask: action.payload
            }
        default: 
            return {...state};
    }
};