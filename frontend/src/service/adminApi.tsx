import axios from "axios";
import { SERVER_URL_ADMIN } from '../../utils/serverURL';

const Axios = axios.create({
  baseURL:`${SERVER_URL_ADMIN}`,
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

  export const adminlogin = async (reqBody: Record<string, any>)=>{
    console.log("from frontt " , reqBody)
    try {
      const response = await Axios.post(`${SERVER_URL_ADMIN}/adminlogin`,reqBody)
      console.log(response)
      return response.data
    } catch (error:any) {
      console.log("Error in adminLogin:", error.message || error);
      throw new Error("adminLogin failed. Please try again later."); // Custom error message
    }
  }

  export const fetchDataList = async()=>{
    try {
      const response = await Axios.post(`${SERVER_URL_ADMIN}/fetchUserList`)
      const {userList,pendingApprovalsList,users,coachList,coaches,enrolledUsers} = response.data
      if(response){
        return {userList,pendingApprovalsList,users,coachList,coaches,enrolledUsers}
      }
    } catch (error:any) {
      console.log("Error in adminUserListFetching:", error.message || error);
      throw new Error("adminUserListFetching failed. Please try again later."); 
    }
  }

  export const handleBlockFun = async (email:string) => {
     try {
      const response = await Axios.post(`${SERVER_URL_ADMIN}/blockUser`,{email})
      return response.data.success
     } catch (error) {
      console.log("Error in handling block :",error);
      throw new Error("handling block failed. Please try again later.");
     }
  }

  export const handleUnBlockFun = async (email:string) => {
    try {
     const response = await Axios.post(`${SERVER_URL_ADMIN}/unblockUser`,{email})
     return response.data.success
    } catch (error) {
     console.log("Error in handling unblock :",error);
     throw new Error("handling block failed. Please try again later.");
    }
 }

 export const changeCoachStatus = async (email:string,newStatus:string)=>{
  try {
    const response = await Axios.post(`${SERVER_URL_ADMIN}/changeStatus`,{email,newStatus})
    const {result} = response.data
    console.log(result,"cahnegedd roll")
    if(result){
      localStorage.setItem("user",JSON.stringify(result))
    }
    return response.data.success
  } catch (error) {
    console.log("Error in changing status of coach :",error);
    throw new Error("changing status of coach failed. Please try again later.");
  }
 }