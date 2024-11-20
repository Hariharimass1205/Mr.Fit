import axios from "axios";
import { SERVER_URL_COACH } from './serverURL';

export const  saveQuizScore = async (score:string,coach:any): Promise<any>=>{
    try {
      const response = await axios.post(`${SERVER_URL_COACH}/saveQuizScore`,{score,coach})
      return response
    } catch (error) {
      console.log(error)
      throw new Error("error at sending score mail to admin  failed. Please try again later.");
    }
  }