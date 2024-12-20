import userModel from "../model/userModel";
import { User } from "../interface/user";
import { IUserRepository } from "../interface/repository/userRepository.interface";
import coachModel from "../model/coachModel";
import { Types } from "mongoose";

export class UserRepository implements IUserRepository{

 findUserByEmail = async (email:String)=>{
    try {
        const user = await userModel.findOne({ email }).exec();
        return user
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Database Error');
    }
}
    fetchuserDataRepo = async (userId:string)=>{
    try {
      const user = await userModel.findOne({ _id:userId, isBlocked: false }).exec();
      return {data:user}
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Database Error');
    }
  }

 createUser = async (user: User): Promise<any>=> {
    try {
      const newUser = new userModel(user);
      return await newUser.save();
    } catch (error) {
      console.log(error)
      throw new Error('Database Error');
    }
  }

   verifyAndSaveUser= async (email:string,otp:string)=>{
    const user = await userModel.findOne({email})
    if(user.otp==otp && user){
      user.otp = null;
      user.otpVerified=true;
      await user.save();
      return user;
    }
    throw new Error("Invalid OTP");
  }
   findUserByEmailandUpdate = async (email:string,otp:string)=>{
    try {
      const user = await userModel.findOne({email})
    user.otp=otp
    await user.save()
    return user
    } catch (error) {
      console.log(error)
      throw new Error('Database forgototp Error');
    }
  }
 updateUser = async (email:string,hashedpassword:string)=>{
  try {
    const user = await userModel.updateOne({email},{password:hashedpassword})
    return user
  } catch (error) {
    console.log(error)
      throw new Error('Database update forgot password');
  }
}

 updateUserOTP = async (email:string,otp:string)=>{
  try {
    const user = await userModel.updateOne({email},{otp:otp})
    return user
  } catch (error) {
    console.log(error)
      throw new Error('Database resend otp update  Error');
  }
}

fetchCoachListRep = async ()=>{
  try {
    const user = await coachModel.find().populate("userId","profileImage")
    console.log(user,"repoo 1st")
    return {data:user}
  } catch (error) {
    console.error('Error fetching coach List:', error);
    throw new Error('Database Error');
  }
}
fetchCoachDetailsRep = async (coach_id:Types.ObjectId,user_Id:Types.ObjectId)=>{
  try {
    const coach = await coachModel.findOne({_id:coach_id}).populate("userId","profileImage quizScore email")
    const user = await userModel.findOne({_id:user_Id})
    let data = {coach:coach,user:user}
    return data
  } catch (error) {
    console.error('Error fetching coach List:', error);
    throw new Error('Database Error');
  }
}
fetchUserDetailsRep = async (coach_Id:Types.ObjectId,user_Id:Types.ObjectId)=>{
  try {
    const user = await userModel.findOne({_id:user_Id})
    const coach = await coachModel.find({_id:user.coachId}).populate("userId","profileImage quizScore")
    const data = {user:user,coach:coach}
    return data
  } catch (error) {
    console.error('Error fetching coach List:', error);
    throw new Error('Database Error');
  }
}
updateUserDatas= async (idd:Types.ObjectId,data:any):Promise<any|null>=>{
  try {
    const {Name,address,district,dob,email,phone,pincode,state} = data
    const savedData = await userModel.updateOne({_id:idd},{$set:{
      userName:Name,
      address:address,
      district:district,
      DOB:dob,
      email:email,
      phone:phone,
      pincode:pincode,
      state:state
    }})  
    const user = await userModel.find({_id:idd})
    return user
  } catch (error) {
    console.error('Error user data savinf after profile edit:', error);
    throw new Error('Database Error');
  }
}
}