import axios from "../axios";
import { API_URLS } from '../constants/config';

export const USER_LOGIN = async (dat) => {
  console.log(dat);
  try {
    const response = await axios.post(API_URLS.SIGNUP_API_PATH, dat);
    return response.data;
  } catch (error) {
    console.error("Error sending form data for login");
    throw error;
  }
};

// Login Action
export const LOGIN_ACTION = async (dat) => {
  try {
    const response = await axios.post(API_URLS.LOGIN_API_PATH, dat);
    if (response.data.status === true) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userDetails", JSON.stringify(response.data.user));
    } 
    return response.data;
  } catch (error) {
    console.error("Error sending form data for login", error.response ? error.response : error);
    throw error;
  }
};

export const OTP_ACTION= async (dat) => {
  try {
    const response = await axios.post(API_URLS.OTP_PAGE, dat);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
}
export const OTP_ACTION_RESET= async (dat) => {
  try {
    const response = await axios.post(API_URLS.SEND_FORGOT_OTP, dat);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
}
export const Resend_Otp_verify= async (dat) => {
  try {
    const response = await axios.post(API_URLS.RESEND_OTP, dat);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
}
export const RESET_PASSWORD_ACTION= async (dat) => {
 const data={phone:dat};
  try {
    const response = await axios.post(API_URLS.RESET_PASSWORD, data);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
}
export const NEW_PASSWORD= async (dat) => {
  console.log(dat,"hjsvfjhsvdjhvcs");
  try {
    const response = await axios.post(API_URLS.NEW_PASSWORD, dat);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
}

export const ContactForm=async(data)=>{
  try {
    const response = await axios.post(API_URLS.CONTACT_FORM_API_PATH,data);
    return response.data;
  } catch (error) {
    console.error("Error sending contact form data", error);
    throw error;
  }
}



