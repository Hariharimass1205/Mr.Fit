import mongoose, { Schema } from "mongoose";
import { Coach } from "../interface/coach";
  
const coachSchema = new Schema<Coach>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    name:{type:String},
    phone:{type:Number},
    age:{type:Number,required:true},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    noOfStudentsCoached:{type:Number},
    availability:{type:String},
    Students:{ type: [String] },
    achievementBadges:{ type: [String]},
    package:{ type: [Number] },
    state:{ type: String },
    city:{ type: String },
    locality:{ type: String},
    licenseOrAadhaar:{type:String},
    role:{type:String},
})

const coachModel = mongoose.model("coaches", coachSchema)
export default coachModel