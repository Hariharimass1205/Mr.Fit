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
  } catch (error) {
    throw error
  }
}