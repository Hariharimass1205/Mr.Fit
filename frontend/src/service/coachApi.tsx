import axios from "axios";
import { SERVER_URL_COACH } from './serverURL';

export const  sentCoachScore = async (score:any,coach:any): Promise<any>=>{
    try {
        console.log("hi from front axios",score,coach)
      const response = await axios.post(`${SERVER_URL_COACH}/sendScore`,{score,coach})
    } catch (error) {
      console.log(error)
      throw new Error("error at sending score mail to admin  failed. Please try again later.");
    }
  }