import axios from "axios";
import { SERVER_URL_COACH } from './serverURL';

const Axios = axios.create({
  baseURL:`${SERVER_URL_COACH}`,
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

export const  saveQuizScore = async (score:string,coach:any): Promise<any>=>{
    try {
      const response = await Axios.post(`${SERVER_URL_COACH}/saveQuizScore`,{score,coach})
      return response
    } catch (error) {
      console.log(error)
      throw new Error("error at sending score mail to admin  failed. Please try again later.");
    }
  }

  export const registerCoach = async (formData:any)=>{
   try {
    console.log("hiii from front register")
      const response = await Axios.post(`${SERVER_URL_COACH}/registerCoach`,{formData})
      return response.data.success
   } catch (error) {
      console.log(error)
      throw new Error("error at coach registration. Please try again later");
   }
  }
