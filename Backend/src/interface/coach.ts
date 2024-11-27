import { Schema } from "inspector/promises";
import { Types } from "mongoose";
export interface Coach{
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