import { Task } from "../assets/types";
import { GET_ALL_TASKS, GET_BY_ID, GET_FILTERED_TASKS, SET_ERROR_FALSE, SET_ERROR_TRUE, SET_LOADING_FALSE, SET_LOADING_TRUE } from "./actions/redux-types";

const initialGlobalState = {
    allTasks: [],
    filteredTasks: [],
    singleTask: null as Task | null,
    loading: false,
    error: {
        success: true,
        code: 0,
        message: ""
    },
};

// export type RootState = typeof initialGlobalState;

export default function rootReducer (state = initialGlobalState, action: any){
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {
                ...state,
                loading: true,
            };
        case SET_LOADING_FALSE:
            return {
                ...state,
                loading: false,
            };
        case SET_ERROR_TRUE:
            return {
                ...state,
                error: {
                    success: false,
                    code: action.payload.code || 500,
                    message: action.payload.message || "Error inesperado."
                }
            };
        case SET_ERROR_FALSE:
            return {
                ...state,
                error: {
                    success: true,
                    code: 0,
                    message: ""
                }
            };
        case GET_ALL_TASKS: 
            return {
                ...state,
                allTasks: action.payload.data
            }
        case GET_FILTERED_TASKS: 
            return {
                ...state,
                filteredTasks: action.payload.data
            }
        case GET_BY_ID: 
            return {
                ...state,
                singleTask: action.payload.data
            }
        default: 
            return {...state};
    }
};