import axios from "axios";
import { SERVER_URL_ADMIN } from './serverURL';

  export const adminlogin = async (reqBody: Record<string, any>)=>{
    console.log("from frontt " , reqBody)
    try {
      const response = await axios.post(`${SERVER_URL_ADMIN}/adminlogin`,reqBody)
      console.log(response)
      return response.data
    } catch (error:any) {
      console.log("Error in adminLogin:", error.message || error);
      throw new Error("adminLogin failed. Please try again later."); // Custom error message
    }
  }

  export const fetchDataList = async()=>{
    try {
      const response = await axios.post(`${SERVER_URL_ADMIN}/fetchUserList`)
      const {userList,pendingApprovalsList,users} = response.data
      if(response){
        return {userList,pendingApprovalsList,users}
      }
    } catch (error:any) {
      console.log("Error in adminUserListFetching:", error.message || error);
      throw new Error("adminUserListFetching failed. Please try again later."); 
    }
  }

  export const handleBlockFun = async (email:string) => {
     try {
      const response = await axios.post(`${SERVER_URL_ADMIN}/blockUser`,{email})
      alert("user blocked")
      return response.data.success
     } catch (error) {
      console.log("Error in handling block :",error);
      throw new Error("handling block failed. Please try again later.");
     }
  }

  export const handleUnBlockFun = async (email:string) => {
    try {
     const response = await axios.post(`${SERVER_URL_ADMIN}/unblockUser`,{email})
     alert("user unblocked")
     return response.data.success
    } catch (error) {
     console.log("Error in handling unblock :",error);
     throw new Error("handling block failed. Please try again later.");
    }
 }