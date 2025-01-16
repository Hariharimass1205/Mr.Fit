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
    quizScore:number;
    isApproved:string;
    role:string;
    slotTaken:string;
    isRegisted:boolean;
    Diet?: {
      Meal1: string | null;
      Meal2: string | null;
      Meal3: string | null;
      Goal:{
        Water:number|  null,
        Calories:number|  null,
        Steps:number|  null,
        Protein:number|  null,
        Carbohydrates:number|  null,
        Fats:number|  null,
        Fiber:number|  null,
        SleepTime:number|  null,
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