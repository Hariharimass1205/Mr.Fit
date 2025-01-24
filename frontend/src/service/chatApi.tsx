import axios from 'axios';
import { SERVER_URL_CHAT } from '../../utils/serverURL';
import { logoutApi } from './userApi';
import { redirect } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

const Axios = axios.create({
  baseURL:`${SERVER_URL_CHAT}`,
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

const handleAxiosError = async (error:any) => {
  console.log("error from errorhandle", error);
  if (
    error?.response?.data?.message === "Access denied: Your account is blocked." ||
    error?.response?.request?.status === 403
  ) {
    await logoutApi();
    redirect("/login");
  }
};


export const SaveChat = async (reqBody: {content:string,senderId: string,coachId: string})=>{
    try {
      const res = await axiosInstance.post(`${SERVER_URL_CHAT}/saveMsg`,{reqBody})
      return res
    } catch (error) {
      console.log("error at user msg api SaveChat")
      console.log(error)
      throw handleAxiosError(error) 
    }
  }

  export const SaveChatCoach = async (reqBody: {content:string,senderId: string,coachId: string})=>{
    try {
      const res = await axiosInstance.post(`${SERVER_URL_CHAT}/saveMsgCoach`,{reqBody})
      return res
    } catch (error) {
      console.log("error at user msg api SaveChat")
      console.log(error)
      throw handleAxiosError(error) 
    }
  }

export const getMessages = async (userId:any,coachId:string)=>{
    try {
        const res = await axiosInstance.get(`${SERVER_URL_CHAT}/getMsg?userId=${userId}&coachId=${coachId}`)
        return res
    } catch (error) {
      console.log("error at user msg api getMessages")
      console.log(error)
      throw handleAxiosError(error) 
    }
}
export const getRoomId = async (userId:any,coachId:string)=>{
  try {
    const res = await axiosInstance.get(`${SERVER_URL_CHAT}/getRoomId?userId=${userId}&coachId=${coachId}`)
    return res
  } catch (error) {
    console.log("error at user msg api getMessages")
      console.log(error)
      throw handleAxiosError(error) 
  }
}