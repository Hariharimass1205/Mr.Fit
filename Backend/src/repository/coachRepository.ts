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

export const findUserByIdIsCoach = async (id: any) => {
  try {
      const userExists = await userModel.findOne({_id:id}).exec();
      if (!userExists) {
        console.log(userExists,"hiiiiiiiiiiiii")
          throw new Error(`User with id ${id} not found.`);
      }
      console.log(userExists?.userName,"userName")
      const updateRegistorField = await userModel.updateOne(
          { _id:id },
          { $set: { isRegisted: true } }
      );
      const coach = await userModel.findOne({ _id:id, isRegisted:true }).exec();
      console.log(coach, "from coach repo", updateRegistorField);
      return coach;
  } catch (error) {
      console.error('Error in findUserByIdIsCoach:', error.message);
      throw new Error(error.message);
  }
};


export const createCoach = async (coach: any): Promise<any>=> {
    try {
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