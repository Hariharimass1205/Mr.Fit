import axios from "axios";
import { SERVER_URL_COACH } from '../../utils/serverURL';
import { redirect } from "next/navigation";
import { logoutApi } from "./userApi";

const Axios = axios.create({
  baseURL:`${SERVER_URL_COACH}`,
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
    console.log(formData,"------ffffffssssssssssss--------")
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

  export const saveAvailabilityBackend = async (availability:object)=>{
    try {
      const data = await Axios.post(`${SERVER_URL_COACH}/updateAvailability`,{availability})
      return data
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

  export const savePackageBackend = async(pack:object)=>{
    try {
      const {data} = await Axios.patch(`${SERVER_URL_COACH}/updatPackage`,{pack})
      return data
    } catch (error) {
      console.log(error,"error at changePackage")
      throw handleAxiosError(error) 
    }
  }
  
  export const saveProfiletoBackend = async (objData:object)=>{
    try {
      const {data} = await Axios.patch(`${SERVER_URL_COACH}/updatProfile`,{objData})
      console.log(data,"::::::::::::::::::::;")
      return data
    } catch (error) {
      console.log(error,"error at updating profile")
      throw handleAxiosError(error) 
    }
  }
  
  export const saveAchievementBackend = async (dataset:object):Promise<any>=>{
    try {
       const result = await Axios.patch(`${SERVER_URL_COACH}/saveCoachAchievement`,{dataset})
       console.log(result,"from back about achievement")
      return result
    } catch (error) {
      console.log(error)
      throw handleAxiosError(error) 
    }
}
export const updateDiet = async (studentId:any,dietEdit:object):Promise<any>=>{
  try {
    const result = await Axios.put(`${SERVER_URL_COACH}/updateDiet`,{studentId,dietEdit})
    return result.data.success
  } catch (error) {
    console.log(error,"error at updating diet")
    throw handleAxiosError(error) 
  }
}


  