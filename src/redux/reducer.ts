import { Task } from "../assets/types";
import { GET_ALL_TASKS, GET_BY_ID, GET_FILTERED_TASKS, SET_LOADING_FALSE, SET_LOADING_TRUE } from "./actions/redux-types";

const initialGlobalState = {
    allTasks: [],
    filteredTasks: [],
    singleTask: null as Task | null,
    loading: false
};

export type RootState = typeof initialGlobalState;

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
        case GET_ALL_TASKS: 
            return {
                ...state,
                allTasks: action.payload
            }
        case GET_FILTERED_TASKS: 
            return {
                ...state,
                filteredTasks: action.payload
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