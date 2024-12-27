import axios from 'axios';
import { SERVER_URL_CHAT } from '../../utils/serverURL';

const Axios = axios.create({
  baseURL:`${SERVER_URL_CHAT}`,
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

export const SaveChat = async (reqBody: {content:string,senderId: string,coachId: string})=>{
    try {
      const res = await Axios.post(`${SERVER_URL_CHAT}/saveMsg`,{reqBody})
      return res
    } catch (error) {
      console.log("error at user msg api SaveChat")
      console.log(error)
    }
  }

  export const SaveChatCoach = async (reqBody: {content:string,senderId: string,coachId: string})=>{
    try {
      const res = await Axios.post(`${SERVER_URL_CHAT}/saveMsgCoach`,{reqBody})
      return res
    } catch (error) {
      console.log("error at user msg api SaveChat")
      console.log(error)
    }
  }

export const getMessages = async (userId:any,coachId:string)=>{
    try {
        const res = await Axios.get(`${SERVER_URL_CHAT}/getMsg?userId=${userId}&coachId=${coachId}`)
        return res
    } catch (error) {
      console.log("error at user msg api getMessages")
      console.log(error)
    }
}
export const getRoomId = async (userId:any,coachId:string)=>{
  try {
    const res = await Axios.get(`${SERVER_URL_CHAT}/getRoomId?userId=${userId}&coachId=${coachId}`)
    return res
  } catch (error) {
    console.log("error at user msg api getMessages")
      console.log(error)
  }
}
