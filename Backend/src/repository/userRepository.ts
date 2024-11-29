import userModel from "../model/userModel";
import { User } from "../interface/user";


export const findUserByEmail = async (email:String)=>{
    try {
        const user = await userModel.findOne({ email }).exec();
        console.log(email,"email")
        return user
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Database Error');
    }
}
export const  fetchuserDataRepo = async (userId:string)=>{
  try {
    const user = await userModel.findOne({ _id:userId, isBlocked: false }).exec();
    return {data:user}
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Database Error');
  }
}

export const createUser = async (user: User): Promise<any>=> {
    try {
      const newUser = new userModel(user);
      return await newUser.save();
    } catch (error) {
      console.log(error)
      throw new Error('Database Error');
    }
  }

  export const verifyAndSaveUser= async (email:string,otp:string)=>{
    const user = await userModel.findOne({email})
    console.log(user)
    console.log(user,"userRepo")
    if(user.otp==otp && user){
      user.otp = null;
      user.otpVerified=true;
      await user.save();
      return user;
    }
    throw new Error("Invalid OTP");
  }
  export const findUserByEmailandUpdate = async (email,otp)=>{
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
export const updateUser = async (email,hashedpassword)=>{
  try {
    const user = await userModel.updateOne({email},{password:hashedpassword})
    return user
  } catch (error) {
    console.log(error)
      throw new Error('Database update forgot password');
  }
}

export const updateUserOTP = async (email,otp)=>{
  try {
    const user = await userModel.updateOne({email},{otp:otp})
    return user
  } catch (error) {
    console.log(error)
      throw new Error('Database resend otp update  Error');
  }
}