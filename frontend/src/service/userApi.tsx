import axios from 'axios';
import { SERVER_URL_USER } from './serverURL';

export const signupApi = async (reqBody: Record<string, any>) => {
  try {
    const response = await axios.post(`${SERVER_URL_USER}/signup`, reqBody);
    return response.data;  // Return only the data from the response
  } catch (error: any) {
    console.error("Error in signupApi:", error.message || error);
    throw new Error("Signup failed. Please try again later."); // Custom error message
  }
};

export const otpVerify = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await axios.post(`${SERVER_URL_USER}/sentOTP`, {otp,email});
    return response;
  } catch (error) {
    console.error("Error in otpVerify:", error);
    throw error;
  }
};

export const loginApi = async (reqBody: Record<string, any>)=>{
  try {
    const response = await axios.post(`${SERVER_URL_USER}/login`,reqBody)
    console.log(response)
    return response.data
  } catch (error:any) {
    console.error("Error in signupApi:", error.message || error);
    throw new Error("Signup failed. Please try again later."); // Custom error message
  }
}
export const forgotpasswordEmail = async (email:string):Promise<any>=>{
  console.log("forgot email:",email)
  try {
    const response = await axios.post(`${SERVER_URL_USER}/forgotPassword1`,{email})
    return response.data.success
  } catch (error) {
    console.log("error at sending email to backend while forgot password")
    throw new Error("error at forgot password ")
  }
}

export const verifyOTPforForgotOtp = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await axios.post(`${SERVER_URL_USER}/ForgotOTPVerify`, {otp,email});
    return response;
  } catch (error) {
    console.error("Error in otpVerify:", error);
    throw error;
  }
};
export const saveNewPassword = async (password:string,email:any):Promise<any>=>{
  console.log(password,email)
  try {
    const response = await axios.post(`${SERVER_URL_USER}/saveNewPassword`,{password,email});
    return response
  } catch (error) {
    console.error("Error in saving new password:", error);
    throw error;
  }
}
