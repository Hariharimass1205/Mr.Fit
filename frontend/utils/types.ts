import { Types } from "mongoose";

export type User = {   
    userName: string;   
    phone?: number;   
    email: string;   
    password?: string;   
    profileImage?: string;
    gender?: string;   
    otp?: string;   
    DOB?:string
    otpVerified?: boolean;
    enrolledPackage?:number; 
    enrolledDuration:string
    enrolledDate:string
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
    Diet?: {
        Meal1: string | null;
        Meal2: string | null;
        Meal3: string | null;
      };
  } 

export type Coach = {
    _id:Types.ObjectId;
    userId:Types.ObjectId;
    name:String;
    age:number;
    height:number;
    weight:number;
    noOfStudentsCoached:number;
    Students: [{ 
        type: Types.ObjectId, 
    }],
    availability:String;
    achievementBadges:{
        AchievementsOne:string,
        AchievementsTwo:string,
        AchievementsThree:string
    }
    package: number[];  
    state:String;
    city:String;
    locality:String;
    licenseOrAadhaar:String;
    role:String
}

export type AuthData = {
    user?: User | null;
};