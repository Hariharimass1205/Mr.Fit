import {SERVER_URL} from './serverURL'
import axios from 'axios' 

const axiosInstance = axios.create({
    baseURL:`${SERVER_URL}`,
    headers:{
        "Content-Type":"application/json"
    }
})
export const signupApi = async (reqBody:any)=>{
  try {
     const response = await axios.post(`${SERVER_URL}/signup`,reqBody)
     return response
  } catch (error) {
    throw error
  }
}
export const  otpVerify = async (otp:any):Promise<any>=>{
  console.log("otp",otp)
 try {
   const response = await axios.post(`${SERVER_URL}/sentOTP`,otp)
   console.log(response);
  return response
 } catch (error) {
  throw error
 }
}