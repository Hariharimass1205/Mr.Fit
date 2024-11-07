import axios from 'axios';
import { SERVER_URL } from './serverURL';

export const signupApi = async (reqBody: Record<string, any>) => {
  try {
    const response = await axios.post(`${SERVER_URL}/signup`, reqBody); 
    console.log("resss" +  response);
    
    return response;
  } catch (error) {
    console.error("Error in signupApi:", error);
    throw error;
  }
};

export const otpVerify = async (otp:string, email:string ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await axios.post(`${SERVER_URL}/sentOTP`, {otp,email});
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in otpVerify:", error);
    throw error;
  }
};
