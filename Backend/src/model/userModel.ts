import mongoose,{Schema} from 'mongoose'
import { User } from '../interface/user'

const userSchema = new Schema<User>({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number},
    password:{type: String, required: false },
    profileImage: { type: String },
    DOB:{type: String },
    otp: { type: String },
    otpVerified: { type: Boolean, default: false },
    address: { type: String },
    state: { type: String },
    district: { type: String },
    pincode: { type: Number },
    reviews: { type: [String] },
    coachId:{type:String},
    isBlocked:{ type: Boolean, default: false },
})

const userModel = mongoose.model("users",userSchema)
export default userModel