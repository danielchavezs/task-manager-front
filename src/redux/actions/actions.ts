import axios from "axios";
import { Dispatch } from 'redux';
import { DELETE_TASK, GET_ALL_TASKS, GET_BY_ID, GET_FILTERED_TASKS, NEW_TASK, SET_ERROR_FALSE, SET_ERROR_TRUE, SET_LOADING_FALSE, SET_LOADING_TRUE, UPDATE_TASK } from "./redux-types"
import { BACKEND_URL } from "../../assets/utils";
import { useNavigate } from "react-router-dom";


export function handleAPIError(error: any, dispatch: Dispatch) {
    // const navigate = useNavigate();
    const errorPayload = {
        success: false,
        code: error?.response?.status || 500,
        message: error?.response?.data?.message || "Unknown error occurred.",
    };
    dispatch({ type: SET_ERROR_TRUE, payload: errorPayload });
    // navigate(`/error`)
};


export function getAllTasks () {
    return async (dispatch: Dispatch) => {
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

  return async (dispatch: Dispatch) => {
      try {
          dispatch({ type: SET_LOADING_TRUE });
          dispatch({ type: SET_ERROR_FALSE });
          const response = await axios.get(`${BACKEND_URL}/api/tasks`, { params });
          dispatch({ type: GET_FILTERED_TASKS, payload: response.data});
      } catch (error) {
          handleAPIError(error, dispatch);
      } finally {
          dispatch({ type: SET_LOADING_FALSE });
      }
  }
};

export const getByID = (id: string | undefined) => {

    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: SET_LOADING_TRUE });
        dispatch({ type: SET_ERROR_FALSE });
        const response = await axios.get(`${BACKEND_URL}/api/tasks/${id}`);
        dispatch({ type: GET_BY_ID, payload: response.data });
      } catch (error) {
        handleAPIError(error, dispatch);
        // navigate(`/error`)
      } finally {
        dispatch({ type: SET_LOADING_FALSE });
      }
    };
};