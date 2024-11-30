import coachModel from "../model/coachModel"
import userModel from "../model/userModel"
import { Coach } from "../interface/coach"

export const findUserByEmailandUpdateCoach =async (score,email)=>{
    try {
        const res = await  userModel.updateOne({email},{quizScore:score,isCoach:true,isApproved:"Pending",role:"coach"})
        const updatedScore = await userModel.findOne({email})
        return updatedScore
    } catch (error) {
        throw new Error(error)
    }
}

export const findUserByIdisCoach = async (id:any)=>{
    try {
        const updateRegistorFeild = await userModel.updateOne({id},{isRegisted:true})
        const coach = await userModel.findOne({ id, isCoach: true }).exec();
        console.log(coach,"from coach repo",updateRegistorFeild)
        return coach
    } catch (error) {
        throw new Error(error)
    }
}

export const createCoach = async (coach: any): Promise<any>=> {
    try {
        console.log(coach,"from repo")
      const newCoach = new coachModel(coach);
      console.log(newCoach,"updated")
      return await newCoach.save();
    } catch (error) {
      console.log(error)
      throw new Error('Database Error');
    }
  }

  export const  fetchCoachDataRepo = async (userId:string)=>{
    try {
      const coach = await coachModel.findOne({ userId:userId }).exec();
      return {data:coach}
    } catch (error) {
      console.error('Error fetching coach by email:', error);
      throw new Error('Database Error');
    }
  }