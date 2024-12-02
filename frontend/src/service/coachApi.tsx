import axios from "axios";
import { SERVER_URL_COACH } from '../../utils/serverURL';

const Axios = axios.create({
  baseURL:`${SERVER_URL_COACH}`,
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

export const  saveQuizScore = async (score:string,coach:any): Promise<any>=>{
    try {
      const response = await Axios.post(`${SERVER_URL_COACH}/saveQuizScore`,{score,coach})
      return response
    } catch (error) {
      console.log(error)
      throw handleAxiosError(error) 
    }
  }

  export const registerCoach = async (formData:any)=>{
   try {
    console.log("hiii from front register")
      const response = await Axios.post(`${SERVER_URL_COACH}/registerCoach`,{formData})
      return response.data.success
   } catch (error) {
      console.log(error)
      throw handleAxiosError(error) 
   }
  }

  export const fetchCoachData = async ()=>{
    try {
      const {data} = await Axios.post(`${SERVER_URL_COACH}/fetchCoachdata`)
     if(data){
      return data.result.data
     }
    } catch (error) {
      console.log(error)
    }
  }

  
