// actions/homeActions.js
import axios from "../axios";
import { API_URLS } from '../constants/config';

export const SET_HOME_DETAILS = 'SET_HOME_DETAILS';
export const SET_LOADING = 'SET_LOADING';
export const SPECIAL_CATEG_SUCCESS ='SPECIAL_CATEG_SUCCESS'
export const SPECIAL_CATEG_FAIL='SPECIAL_CATEG_FAIL'

export const fetchHomeDetails = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get(API_URLS.HOME_API);
    dispatch({ type: SET_HOME_DETAILS, payload: response.data });
  } catch (error) {
    console.error("Error Fetching home details", error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const SpecialCateg =async () => {
  try {
    const response = await axios.get(API_URLS.SPECIAL_CATEG);
    return response.data;
  } catch (error) {
    console.error("Error fetching special categories", error);
    throw error; 
  } 
};

export const PincodeCheck = async (pincode) => {
  try {
    const url = `${API_URLS.CHECK_PINCODE}/${pincode}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching pincode", error);
    throw error; 
  }
}
