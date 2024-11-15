import mongoose, { Schema } from "mongoose";
import { Coach } from "../interface/coach";
  
const coachSchema = new Schema<Coach>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    age:{type:Number,required:true},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    noOfStudentsCoached:{type:Number,required:true},
    Students:{ type: [String] },
    achievementBadges:{ type: [String]},
    package:{ type: [Number] },
    score:{ type: Number }
})

const coachModel = mongoose.model("coaches", coachSchema)
export default coachModel