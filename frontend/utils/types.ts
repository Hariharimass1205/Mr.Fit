import { Types } from "mongoose";

export type User = { 
    _id:Types.ObjectId;  
    userName: string;   
    phone?: number;   
    email: string;   
    password?: string;   
    profileImage?: string;
    gender?: string;   
    otp?: string;   
    DOB?:string
    otpVerified?: boolean;  
    enrolledPackage:number;
    enrolledDuration:string;
    enrolledDurationExpire:string;
    enrolledDate:string;
    address?: string;   
    state?: string;   
    district?: string;   
    pincode?: number;   
    reviews?: string[];   
    isBlocked?: boolean;
    coachId?:any;     
    isCoach: boolean;
    quizScore:Number;
    isApproved:string;
    role:string;
    slotTaken:string;
    isRegisted:boolean;
    Diet?: {
      Meal1: string | null;
      Meal2: string | null;
      Meal3: string | null;
      Goal:{
        Water:Number|  null,
        Calories:Number|  null,
        Steps:Number|  null,
        Protein:Number|  null,
        Carbohydrates:Number|  null,
        Fats:Number|  null,
        Fiber:Number|  null,
        SleepTime:Number|  null,
      }
    };
  } 

export type Coach = {
    _id:Types.ObjectId;
    name:string,
    phone:number,
    userId:Types.ObjectId;
    age:number;
    height:number;
    weight:number;
    noOfStudentsCoached:number;
    Students: [
      {
        type: Types.ObjectId,
      },
    ],
    availability:string;
    achievementBadges: {
      achievementsOne:string,
      achievementsTwo:string,
      achievementsThree:string 
    }
    package: {
        monthlyPackage: number;
        quarterlyPackage: number;
        yearlyPackage: number;
      };
    address:string;  
    state:string;
    city:string;
    locality:string;
    licenseOrAadhaar:string;
    role:string;
}

export type AuthData = {
    user?: User | null;
};