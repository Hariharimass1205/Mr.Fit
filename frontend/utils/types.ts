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
    role:string
  } 

export type Coach = {
    userId:Types.ObjectId;
    age:number;
    height:number;
    weight:number;
    noOfStudentsCoached:number;
    Students:[string];
    availability:String;
    achievementBadges:[string];
    package:[number];  
    state:String;
    city:String;
    locality:String;
    licenseOrAadhaar:String;
    role:String
}

export type AuthData = {
    user?: User | null;
};