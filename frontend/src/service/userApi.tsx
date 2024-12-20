import axios, { AxiosError } from 'axios';
import { SERVER_URL_USER } from '../../utils/serverURL';
import { log } from 'console';
import { Types } from 'mongoose';

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
    console.log(error,"from api")
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
    console.log(error);
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

export const fetchcoachList = async ()=>{
  try {
    const {data} = await Axios.get(`${SERVER_URL_USER}/fetchCoachdata`)
   if(data){
    return data.result.data
   }
  } catch (error) {
    console.log(error)
  }
}

export const fetchCoachDetails = async (coach_id:string,user_id:string):Promise<any>=>{
  try {
    const {data} = await Axios.get(`${SERVER_URL_USER}/fetchCoachDetails?coach=${coach_id}&user=${user_id}`)
    console.log(data,"nnnnnnnnnn")
   if(data){
    return data.coachUserDetails
   }
  } catch (error) {
    console.log(error)
  }
}

  export const fetchDataUserDetails = async (user_id:string,coach_id:string):Promise<any>=>{
    try {
      console.log(user_id,coach_id,"ccccccccccc")
      const {data} = await Axios.get(`${SERVER_URL_USER}/fetchUserDetails?userId=${user_id}&coachId=${coach_id}`)
      console.log(data,"ggggggggggggggg")
      const {coach,user} = data.usercoachDeatails
     if(data){
      return {coach,user}
     }
    } catch (error) {
      console.log(error,"erroe at fetching user details page ")
    }
  }

  export const updateUserProfile = async (data:any):Promise<any>=>{
    try {
      const response = await Axios.put(`${SERVER_URL_USER}/updateUserData`,data)
      console.log(response.data.res[0],"&&&&&&&&&&&&&&")
      return response.data.res[0]
    } catch (error) {
      console.log("error at user api editng api")
      console.log(error)
    }
  }
  export const UpdateReview = async (coachId:Types.ObjectId,userId:Types.ObjectId,review:string,starRating:number):Promise<any>=>{
    try {
      const response = await Axios.post(`${SERVER_URL_USER}/addReview`,{coachId,userId,review,starRating})
      return response.data.success
    } catch (error) {
      console.log("error at user review api")
      console.log(error)
    }
  }

