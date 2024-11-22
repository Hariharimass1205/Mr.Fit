
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
    gender:{ type: String }, 
    address: { type: String },
    state: { type: String },
    district: { type: String },
    pincode: { type: Number },
    reviews: { type: [String] },
    coachId:{type:Schema.Types.ObjectId,default:null},
    isBlocked:{ type: Boolean, default:false},
    isCoach:{type:Boolean,default:false},
    quizScore:{type:Number},
    isApproved:{type:String}
})

const userModel = mongoose.model("users",userSchema)
export default userModel