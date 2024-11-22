import axios from 'axios';
import { SERVER_URL_USER } from './serverURL';

const Axios = axios.create({
  baseURL:`${SERVER_URL_USER}`,
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

export const signupApi = async (reqBody: Record<string, any>) => {
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/signup`, reqBody);
    return response.data;  // Return only the data from the response
  } catch (error: any) {
    console.log("Error in signupApi:", error.message || error);
    throw new Error("Signup failed. Please try again later."); // Custom error message
  }
};

export const otpVerify = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/sentOTP`, {otp,email});
    return response;
  } catch (error) {
    console.log("Error in otpVerify:", error);
    throw error;
  }
};

export const loginApi = async (reqBody: Record<string, any>)=>{
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/login`,reqBody)
    return response.data
  } catch (error:any) {
    console.log("Error in login API:", error.message || error);
    throw new Error("login failed. Please try again later."); // Custom error message
  }
}
export const forgotpasswordEmail = async (email:string):Promise<any>=>{
  console.log("forgot email:",email)
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/forgotPassword1`,{email})
    return response.data.success
  } catch (err) {
    console.log("error at sending email to backend while forgot password",err)
    throw new Error("error at forgot password")
  }
}

export const verifyOTPforForgotOtp = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/ForgotOTPVerify`, {otp,email});
    return response;
  } catch (error) {
    console.log("Error in otpVerify:", error);
    throw error;
  }
};
export const saveNewPassword = async (password:string,email:any):Promise<any>=>{
  console.log(password,email)
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/saveNewPassword`,{password,email});
    return response
  } catch (error) {
    console.log("Error in saving new password:", error);
    throw error;
  }
}
export const resendOTP = async (email:any):Promise<any>=>{
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/resendOTP`,{email})
    return response
  } catch (error) {
    console.log("Error in resending OTP:", error);
    throw error;
  }
}
