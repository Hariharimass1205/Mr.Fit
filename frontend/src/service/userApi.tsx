import axios from 'axios';
import { SERVER_URL_USER } from '../../utils/serverURL';
import { Types } from 'mongoose';
import { redirect } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import {setCookie} from '../../utils/constant'
import { deleteCookie } from '@/utils/deleteCookie';

const Axios = axios.create({
  baseURL:`${SERVER_URL_USER}`,
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true,
})

export const handleAxiosErrorlogin = (error:any)=>{
  console.log(error)
  const errorMessage = error?.response?.data?.errorMessage || "Unexpected error occurred"
  console.log(errorMessage)
  return new Error(errorMessage)
}

const handleAxiosError = async (error:any) => {
  console.log("error from errorhandle", error);
  if (
    error?.response?.data?.message === "Access denied: Your account is blocked." ||
    error?.response?.request?.status === 403
  ) {
    redirect("/login");
  }
};

export const signupApi = async (reqBody: Record<string, any>) => {
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/signup`, reqBody);
    return response.data;
  } catch (error: any) {
    console.log(error,"from api")
    throw handleAxiosErrorlogin(error) 
  }
};


export const googleLogin = async (userData:object)=>{
  try {
    const response = await axiosInstance.post(
      `${SERVER_URL_USER}/google-login`,userData,);
    console.log(response,"from api")
    console.log('login credintials',response?.data?.authToken?.refreshToken)
    setCookie('refreshToken',response?.data?.authToken?.refreshToken,7)
    return response
  } catch (error) {
    console.log(error,"from user api")
    throw handleAxiosError(error) 
  }
}



export const otpVerify = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/sentOTP`, {otp,email});
    return response;
  } catch (error) {
    console.log("Error in otpVerify:", error);
    throw handleAxiosError(error) 
  }
};

export const loginApi = async (reqBody: Record<string, any>)=>{
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/login`,reqBody)
    console.log(response.data,"0000000")
    // document.cookie.
    console.log('login credintials',response?.data?.authToken?.refreshToken)
    setCookie('refreshToken',response?.data?.authToken?.refreshToken,7)
    return response.data
  } catch (error:any) {
    console.log(error); 
    throw handleAxiosErrorlogin(error)    
  }
}
export const forgotpasswordEmail = async (email:string):Promise<any>=>{
  console.log("forgot email:",email)
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/forgotPassword1`,{email})
    return response.data.success
  } catch (err) {
    console.log("error at sending email to backend while forgot password",err)
    throw handleAxiosError(err) 
  }
}

export const verifyOTPforForgotOtp = async (otp:string, email:any ): Promise<any> => {
  console.log("OTP:", otp,email);
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/ForgotOTPVerify`, {otp,email});
    return response;
  } catch (error) {
    console.log("Error in otpVerify:", error);
    throw handleAxiosError(error) 
  }
};
export const saveNewPassword = async (password:string,email:any):Promise<any>=>{
  console.log(password,email)
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/saveNewPassword`,{password,email});
    return response
  } catch (error) {
    console.log("Error in saving new password:", error);
    throw handleAxiosError(error) 
  }
}
export const resendOTP = async (email:any):Promise<any>=>{
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/resendOTP`,{email})
    return response
  } catch (error) {
    console.log("Error in resending OTP:", error);
    throw handleAxiosError(error) 
  }
}

export const logoutApi = async () => {
  try {
    const response = await axiosInstance.post(`${SERVER_URL_USER}/logout`);
    localStorage.setItem("accessToken","")
    localStorage.setItem("accesstoken","")
    localStorage.setItem("refreshToken","")
    localStorage.setItem("refreshtoken","")
    localStorage.setItem("user","")
    deleteCookie('accessToken'); // Replace with your actual cookie name
    deleteCookie('refreshToken');
    return response.data;
  } catch (error) {
    console.log("Error in logout:", error);
    throw new Error("Failed to log out. Please try again.");
  }
};


export const fetchData = async ()=>{
  try {
    const {data} = await axiosInstance.post(`${SERVER_URL_USER}/fetchdata`)
   if(data){
    return data
   }
  } catch (error) {
    console.log(error)
    throw handleAxiosError(error) 
  }
}

export const fetchcoachList = async ()=>{
  try {
    const {data} = await axiosInstance.get(`${SERVER_URL_USER}/fetchCoachdata`)
    console.log(data,"coach list")
   if(data){
    return data.result.data
   }
  } catch (error) {
    console.log(error)
    throw handleAxiosError(error) 
  }
}

export const fetchCoachDetails = async (coach_id:string,user_id:string):Promise<any>=>{
  try {
    const {data} = await axiosInstance.get(`${SERVER_URL_USER}/fetchCoachDetails?coach=${coach_id}&user=${user_id}`)
    console.log(data,"nnnnnnnnnn")
   if(data){
    return data.coachUserDetails
   }
  } catch (error) {
    console.log(error)
    throw handleAxiosError(error) 
  }
}

  export const fetchDataUserDetails = async (user_id:string,coach_id:string):Promise<any>=>{
    try {
      const {data} = await axiosInstance.get(`${SERVER_URL_USER}/fetchUserDetails?userId=${user_id}&coachId=${coach_id}`)
      const {coach,user,payment,coachSlots,studentsList} = data.usercoachDeatails
     if(data){
      return {coach,user,payment,coachSlots,studentsList}
     }
    } catch (error) {
      console.log(error,"erroe at fetching user details page ")
      throw handleAxiosError(error) 
    }
  }

export const updateUserProfile = async (data:any):Promise<any>=>{
    try {
      const response = await axiosInstance.put(`${SERVER_URL_USER}/updateUserData`,data)
      return response.data.res[0]
    } catch (error) {
      console.log("error at user api editng api")
      throw handleAxiosError(error) 
    }
  }

export const UpdateReview = async (coachId:Types.ObjectId,userId:Types.ObjectId,review:string,starRating:number):Promise<any>=>{
    try {
      const response = await axiosInstance.post(`${SERVER_URL_USER}/addReview`,{coachId,userId,review,starRating})
      return response.data
    } catch (error) {
      console.log("error at user review api",error)
      throw handleAxiosError(error) 
    }
  }

export const updateSlotTiming = async (slot:string):Promise<any>=>{
try {
  const response = await axiosInstance.post(`${SERVER_URL_USER}/updateSlot`,{slot})
  return response.data.resData
} catch (error) {
  console.log("Error in updating slot time:", error);
    throw handleAxiosError(error) 
}
}

export const submitDietGoal = async (userId:Types.ObjectId,data:object):Promise<any>=>{
    try {
      const response = await axiosInstance.post(`${SERVER_URL_USER}/addDietGoal`,{userId,data})
      console.log(response,"000000")
      return response.data
    } catch (error) {
      console.log("error at user review api")
      console.log(error)
      throw handleAxiosError(error) 
    }
  }


