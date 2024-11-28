import axios, { AxiosError } from 'axios';
import { SERVER_URL_USER } from '../../utils/serverURL';
import { log } from 'console';

const Axios = axios.create({
  baseURL:`${SERVER_URL_USER}`,
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

export const handleAxiosError = (error:any)=>{
  console.log(error)
  const errorMessage = error?.response?.data?.errorMessage || "Unexpected error occurred"
  console.log(errorMessage)
  return new Error(errorMessage)
}


export const signupApi = async (reqBody: Record<string, any>) => {
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/signup`, reqBody);
    return response.data;
  } catch (error: any) {
    throw handleAxiosError(error) 
  }
};

export const otpVerify = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/sentOTP`, {otp,email});
    return response;
  } catch (error) {
    console.log("Error in otpVerify:", error);
    throw handleAxiosError(error) 
  }
};

export const loginApi = async (reqBody: Record<string, any>)=>{
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/login`,reqBody)
    return response.data
  } catch (error:any) {
    console.log("Error in login API:", error.message || error);
    throw handleAxiosError(error) 
  }
}
export const forgotpasswordEmail = async (email:string):Promise<any>=>{
  console.log("forgot email:",email)
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/forgotPassword1`,{email})
    return response.data.success
  } catch (err) {
    console.log("error at sending email to backend while forgot password",err)
    throw handleAxiosError(err) 
  }
}

export const verifyOTPforForgotOtp = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/ForgotOTPVerify`, {otp,email});
    return response;
  } catch (error) {
    console.log("Error in otpVerify:", error);
    throw handleAxiosError(error) 
  }
};
export const saveNewPassword = async (password:string,email:any):Promise<any>=>{
  console.log(password,email)
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/saveNewPassword`,{password,email});
    return response
  } catch (error) {
    console.log("Error in saving new password:", error);
    throw handleAxiosError(error) 
  }
}
export const resendOTP = async (email:any):Promise<any>=>{
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/resendOTP`,{email})
    return response
  } catch (error) {
    console.log("Error in resending OTP:", error);
    throw handleAxiosError(error) 
  }
}

export const logoutApi = async()=>{
  try {
    const response = await Axios.post(`${SERVER_URL_USER}/logout`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log("Error in logout:", error);
    throw handleAxiosError(error) 
  }
}

export const fetchData = async ()=>{
  try {
    const {data} = await Axios.post(`${SERVER_URL_USER}/fetchdata`)
   if(data){
    return data
   }
  } catch (error) {
    console.log(error)
  }
}