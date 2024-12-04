import coachModel from "../model/coachModel"
import userModel from "../model/userModel"
import { Coach } from "../interface/coach"
import { Types } from "mongoose"
import { User } from "../interface/user"
import { ICoachRepository } from "../interface/repository/coachRepository.interface"

export class CoachRepository implements ICoachRepository{ 

 findUserByEmailandUpdateCoach =async (score,email):Promise<any|null> =>{
    try {
        const res = await  userModel.updateOne({email},{quizScore:score,isCoach:true,isApproved:"Pending",role:"coach"})
        const updatedScore = await userModel.findOne({email})
        return updatedScore
    } catch (error) {
        throw new Error(error)
    }
}

 findUserByIdIsCoach = async (id:Types.ObjectId):Promise<User> => {
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


 createCoach = async (coach: Coach): Promise<Coach>=> {
    try {
      const newCoach = new coachModel(coach);
      console.log(newCoach,"updated")
      return await newCoach.save();
    } catch (error) {
      console.log(error)
      throw new Error('Database Error');
    }
  }

fetchCoachDataRepo = async (userId:Types.ObjectId):Promise<any|null>=>{
    try {
      const coachDetails = await coachModel.findOne({ userId:userId }).exec();
      const userImage = await userModel.findOne({_id:userId})
      const data  = {coach:coachDetails,userImg : userImage.profileImage}
      return data
    } catch (error) {
      console.error('Error fetching coach by email:', error);
      throw new Error('Database Error');
    }
  }
  updateProfilePicture = async (url:string,userId:Types.ObjectId):Promise<any|null>=>{
    try {
      const updateMessage = await userModel.updateOne({_id:userId},{profileImage:url})
      const userInfo = await userModel.findOne({_id:userId})
      return userInfo
    } catch (error) {
      console.error('Error at updating profile coach by id:', error);
      throw new Error('Database Error');
    }
  }
  updatePackage = async (objData:any,userId:Types.ObjectId):Promise<any|null>=>{
    try {
      const updateMessage = await coachModel.updateOne(
        { userId: userId },  
        { $set: { "package.monthlyPackage": objData.pack.monthlyPackage,
                  "package.quarterlyPackage": objData.pack.quarterlyPackage,
                  "package.yearlyPackage":objData.pack.yearlyPackage
         } }
      );
      const coachInfo = await coachModel.findOne({userId:userId})
      return coachInfo
    } catch (error) {
      console.error('Error at updating package coach by id:', error);
      throw new Error('Database Error');
    }
  }
  updateProfile = async (objData:any,userId:Types.ObjectId):Promise<any|null>=>{
    try {
      const updateMessage = await coachModel.updateOne(
        { userId: userId },  
        { $set: { 
                  name: objData.objData.name,
                  age: objData.objData.age,
                  height: objData.objData.height,
                  weight: objData.objData.weight,
                  phone: objData.objData.phone,
                  state: objData.objData.state,
                  address:objData.objData.address
         } }
      );
      const coachInfo = await coachModel.findOne({userId:userId})
      return coachInfo
    } catch (error) {
      console.error('Error at updating package coach by id:', error);
      throw new Error('Database Error');
    }
  }
}