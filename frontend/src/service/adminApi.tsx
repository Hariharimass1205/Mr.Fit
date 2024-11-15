import axios from "axios";
import { SERVER_URL_ADMIN } from './serverURL';

  export const adminlogin = async (reqBody: Record<string, any>)=>{
    console.log("from frontt " , reqBody)
    try {
      const response = await axios.post(`${SERVER_URL_ADMIN}/adminlogin`,reqBody)
      console.log(response)
      return response.data
    } catch (error:any) {
      console.error("Error in signupApi:", error.message || error);
      throw new Error("Signup failed. Please try again later."); // Custom error message
    }
  }