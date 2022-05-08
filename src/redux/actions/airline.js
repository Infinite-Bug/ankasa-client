import axios from 'axios';
import {
  GET_AIRLINE_PENDING,
  GET_AIRLINE_SUCCESS,
  GET_AIRLINE_FAILED,
} from './types';

export const getListAirline = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({
      type: GET_AIRLINE_PENDING,
      payload: null,
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/airlines`, {
      headers: { token },
    });

    dispatch({
      type: GET_AIRLINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_AIRLINE_FAILED,
      payload: error.message,
    });
  }
};

