import userModel from "../model/userModel";
import cron from "node-cron";
import { User } from "../interface/user";
import { IUserRepository } from "../interface/repository/userRepository.interface";
import coachModel from "../model/coachModel";
import mongoose, { Types } from "mongoose";
import reviewModel from "../model/reviewModel";
import paymentModel from "../model/paymentModel";


export class UserRepository implements IUserRepository{
    constructor() {
      cron.schedule("0 0 * * *", async () => {
        console.log("Running cron job to reset diet goals daily.");
        await this.resetDietGoals();
      });
  

      cron.schedule("0 0 * * *", async () => {
        console.log("Running cron job to handle expired enrollments.");
        await this.handleExpiredEnrollments();
      });
    }


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
    return {data:user}
  } catch (error) {
    console.error('Error fetching coach List:', error);
    throw new Error('Database Error');
  }
}
fetchCoachDetailsRep = async (coach_id:Types.ObjectId,user_Id:Types.ObjectId)=>{
  try {
    const coach = await coachModel.findOne({_id:coach_id}).populate("userId","profileImage quizScore email ")
    const studentsList = await coachModel.findOne({_id:coach_id}).populate("Students", "userName slotTaken enrolledDurationExpire");
    const user = await userModel.findOne({_id:user_Id})
    const reviews = await reviewModel.find({coachId:coach_id}).populate("userId","userName state")
    let data = {coach:coach,user:user,reviews:reviews,studentsList:studentsList}
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
    const userPayment = await paymentModel.find({userId:user_Id})
    const data = {user:user,coach:coach,payment:userPayment}
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


googleUser= async (email: string, name: string)=> {
  try {
    const users = await userModel.updateOne(
      { email: email }, 
      {
        $set: {
          userName:name,
          phone:'Not Provider',
        },
      },
      { upsert: true } 
    )
    const user=await userModel.findOne({email:email}) 
         if (!user) {
      throw new Error("User not found after upsert.");
    }
    return {
      _id: user._id.toString(),
      userName: user.userName,
      email: user.email,
    };
  } catch (error) {
      console.error('Error handling Google user:', error);
      throw error;
  }
}


addReview= async (coachId:Types.ObjectId,userId:Types.ObjectId,review:string,starRating:number):Promise<any|null>=>{
  try {
     const coach_Id = new mongoose.Types.ObjectId(coachId)
     const user_Id = new mongoose.Types.ObjectId(userId)
     await reviewModel.create({
      userId:user_Id,
      coachId:coach_Id,
      review:review,
      starRating:starRating
     })
     return {success:true}
  } catch (error) {
    console.error('Error user add review:', error);
    throw new Error('Database Error');
  }
}
addDietGoalRepo= async (userId:Types.ObjectId,data: {
  water?: number;
  calories?: number;
  protein?: number;
  steps?: number;
  Carbohydrates?: number;
  Fats?: number;
  Fiber?: number;
  SleepTime?: number;
}):Promise<any|null>=>{
  try {
    const user_Id = new mongoose.Types.ObjectId(userId)
    const savedData = await userModel.updateOne(
      { _id: user_Id },
      {
        $set: {
          "Diet.Goal": {
            Water: data.water || null,
            Calories: data.calories || null,
            Protein: data.protein || null,
            Steps: data.steps || null,
            Carbohydrates: data.Carbohydrates || null,
            Fats: data.Fats || null,
            Fiber: data.Fiber || null,
            SleepTime: data.SleepTime || null,
          },
        },
      }
    );
    return savedData;
  } catch (error) {
    console.error('Error at diet goal:', error);
    throw new Error('Database Error');
  }
}


//jobs 
private async handleExpiredEnrollments() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const result = await userModel.updateMany(
      { enrolledDurationExpire: today },
      {
        $set: {
          'Diet.Meal1': null,
          'Diet.Meal2': null,
          'Diet.Meal3': null,
          'Diet.Goal.Water': null,
          'Diet.Goal.Calories': null,
          'Diet.Goal.Steps': null,
          'Diet.Goal.Protein': null,
          'Diet.Goal.Carbohydrates': null,
          'Diet.Goal.Fats': null,
          'Diet.Goal.Fiber': null,
          'Diet.Goal.SleepTime': null,
          enrolledPackage: 0,
          enrolledDurationExpire: "",
          enrolledDuration: "",
          enrolledDate: "",
          coachId: null,
          slotTaken:null
        },
      }
    );
    console.log(`${result.modifiedCount} user(s) updated.`);
  } catch (error) {
    console.error('Error updating expired enrollments:', error);
  }
}

private resetDietGoals = async (): Promise<void> => {
  try {
    const result = await userModel.updateMany(
      {},
      { $set: { "Diet.Goal": {
        Water: null,
        Calories: null,
        Protein: null,
        Steps: null,
        Carbohydrates: null,
        Fats: null,
        Fiber: null,
        SleepTime: null,
      } } }
    );
    console.log(`Diet goals reset successfully for ${result.modifiedCount} users.`);
  } catch (error) {
    console.error("Error resetting diet goals:", error);
  }
};

}
