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
      const response = await Axios.post(`${SERVER_URL_COACH}/registerCoach`,{formData})
      console.log(response,"res from back")
      return response.data.success
   } catch (error) {
    console.log("came here")
      console.log(error)
      throw handleAxiosError(error) 
   }
  }

  export const fetchCoachData = async ()=>{
    try {
      const {data} = await Axios.post(`${SERVER_URL_COACH}/fetchCoachdata`)
     if(data){
      return data.result
     }
    } catch (error) {
      console.log(error)
      throw handleAxiosError(error) 
    }
  }

  export const changeProfilePic = async (file:any)=>{
    try {
      const formData = new FormData()
      formData.append("profilePic",file)
      const data = await axios.patch(
        `${SERVER_URL_COACH}/updateProfilePic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, 
        }
      );
      return data.data
    } catch (error) {
      console.log(error,"error at changeProfilePic")
      throw handleAxiosError(error) 
    }
  }

  export const savePackageBackend = async(pack:Object)=>{
    try {
      const {data} = await Axios.patch(`${SERVER_URL_COACH}/updatPackage`,{pack})
      return data
    } catch (error) {
      console.log(error,"error at changePackage")
      throw handleAxiosError(error) 
    }
  }
  
  export const saveProfiletoBackend = async (objData:Object)=>{
    try {
      const {data} = await Axios.patch(`${SERVER_URL_COACH}/updatProfile`,{objData})
      console.log(data,"::::::::::::::::::::;")
      return data
    } catch (error) {
      console.log(error,"error at updating profile")
      throw handleAxiosError(error) 
    }
  }
  
  export const saveAchievementBackend = async (dataset:{}):Promise<any>=>{
    try {
       const result = await Axios.patch(`${SERVER_URL_COACH}/saveCoachAchievement`,{dataset})
       console.log(result,"from back about achievement")
      return result
    } catch (error) {
      console.log(error)
    }
}
