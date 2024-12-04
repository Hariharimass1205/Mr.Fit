import { Types } from "mongoose";
export interface Coach{
    name:string,
    phone:{type:Number},
    userId:Types.ObjectId;
    age:number;
    height:number;
    weight:number;
    noOfStudentsCoached:number;
    Students: string[];
    availability:String;
    achievementBadges: string[]
    package: {
        monthlyPackage: number;
        quarterlyPackage: number;
        yearlyPackage: number;
      };
    address:{type:String};  
    state:String;
    city:String;
    locality:String;
    licenseOrAadhaar:String;
    role:String;
}