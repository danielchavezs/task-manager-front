import axios from "axios";
import { Dispatch } from 'redux';
import { DELETE_TASK, GET_ALL_TASKS, GET_BY_ID, GET_FILTERED_TASKS, NEW_TASK, SET_LOADING_FALSE, SET_LOADING_TRUE, UPDATE_TASK } from "./redux-types"
import { BACKEND_URL } from "../../assets/utils";


// pendiente de mejorar el tipado
export function getAllTasks () {
    return async (dispatch: any) => {
        try {
            dispatch({ type: SET_LOADING_TRUE });
            const response = await axios.get(`${BACKEND_URL}/api/tasks`);
            dispatch({ type: GET_ALL_TASKS, payload: response.data});
        } catch (error) {
            alert (error);
        } finally {
            dispatch({ type: SET_LOADING_FALSE });
        }
    }
};


export function getFilteredTasks (params: { completed?: boolean }) {
  // const { completed } = args || {};
  return async (dispatch: Dispatch) => {
      try {
          dispatch({ type: SET_LOADING_TRUE });
          const response = await axios.get(`${BACKEND_URL}/api/tasks`, { params });
          dispatch({ type: GET_FILTERED_TASKS, payload: response.data});
      } catch (error) {
          alert (error);
      } finally {
          dispatch({ type: SET_LOADING_FALSE });
      }
  }
};

export const getByID = (id: string | undefined) => {
    return async (dispatch: any) => {
      console.log("EJECUTANDO REDUX ACTION - ID")
      try {
        dispatch({ type: SET_LOADING_TRUE });
        const response = await axios.get(`${BACKEND_URL}/api/tasks/${id}`);
        console.log(response);
        dispatch({ type: GET_BY_ID, payload: response.data });
      } catch (error) {
        alert(error);
      } finally {
        dispatch({ type: SET_LOADING_FALSE });
    }
    };
};