import axios from 'axios';
import { SERVER_URL } from './serverURL';

export const signupApi = async (reqBody: Record<string, any>) => {
  try {
    const response = await axios.post(`${SERVER_URL}/signup`, reqBody);
    return response.data;  // Return only the data from the response
  } catch (error: any) {
    console.error("Error in signupApi:", error.message || error);
    throw new Error("Signup failed. Please try again later."); // Custom error message
  }
};

export const otpVerify = async (otp:string, email:string ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await axios.post(`${SERVER_URL}/sentOTP`, {otp,email});
    return response;
  } catch (error) {
    console.error("Error in otpVerify:", error);
    throw error;
  }
};

export const loginApi = async (reqBody: Record<string, any>)=>{
  try {
    const response = await axios.post(`${SERVER_URL}/login`,reqBody)
    console.log(response)
    return response.data
  
  } catch (error:any) {
    console.error("Error in signupApi:", error.message || error);
    throw new Error("Signup failed. Please try again later."); // Custom error message
  }
}

export const  sentMailtoAdmin = async (score:any): Promise<any>=>{
  try {
    const response = await axios.post(`${SERVER_URL}/sendScore`,score)
  } catch (error) {
    console.log(error)
    throw new Error("error at sending score mail to admin  failed. Please try again later.");
  }
}