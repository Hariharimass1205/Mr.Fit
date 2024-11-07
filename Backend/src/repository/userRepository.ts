import userModel from "../model/userModel";
import { User } from "../interface/user";


export const findUserByEmail = async (email:String)=>{
    try {
      console.log("back user repo")
        const user = await userModel.findOne({ email, isBlocked: false }).exec();
        return user
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Database Error');
    }
}

export const createUser = async (user: User): Promise<any>=> {
    try {
      const newUser = new userModel(user);
      return await newUser.save();
    } catch (error) {
      throw new Error('Database Error');
    }
  }
