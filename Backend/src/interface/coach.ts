import { Schema } from "inspector/promises";
import { Types } from "mongoose";
export interface Coach{
    userId:Types.ObjectId;
    age:number;
    height:number;
    weight:number;
    noOfStudentsCoached:number;
    Students:[string];
    achievementBadges:[string];
    package:[number];  
    score:number; 
}