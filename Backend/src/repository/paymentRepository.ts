const mongoose = require('mongoose');
import { IPaymentRepository } from "../interface/repository/paymentRepository.interface";
import coachModel from "../model/coachModel";
import paymentModel from "../model/paymentModel";
import userModel from "../model/userModel";
import { calculateExpirationDate } from "../utils/calculateDateExpire";


export class PaymentRepository implements IPaymentRepository{
  paymentDetails=async(bookingData:any): Promise<any|null>=> {
    try {
      const{ txnid,amount,productinfo, username,email,udf1}=bookingData
      const paymentDetail= await paymentModel.create({
       userName:username,
       userEmail:email,
       userId:udf1,
       coachId:productinfo,
       transactionId:txnid,
       amount:amount,
     })
   if (!paymentDetail) {
       throw new Error(`Doctor with slot not found.`);
     }
     return {
       status:'pending',
       success:true,
       message:'payment updated successfully'
     }
   } catch (error: any) {
     console.error("Error in payment doc creation:", error);
     throw new Error(error.message);
   }
}

updateBookingStatus=async(bookingData:any): Promise<any|null>=> {
  try {
    const{ 
      txnid,email,coachId,status,amount,userId,packageType
    }=bookingData
    console.log( txnid,email,coachId,status,amount,userId,"details  deatils //////////")
    const enrolledPackage = `${packageType}`;
        const updatedPayment = await paymentModel.updateOne({userEmail:email},{$set:{paymentStatus:"completed"}})

        const payment = await paymentModel.findOne({userEmail:email,userId:userId})
        const paymentDate = new Intl.DateTimeFormat("en-US").format(new Date(payment.transactionDate));
        const expireDate = calculateExpirationDate(paymentDate,enrolledPackage)
        const userCoachIdUpdate = await userModel.updateOne(
          { _id: userId },
          {
            $set: {
              enrolledPackage:amount,
              enrolledDuration:enrolledPackage, 
              coachId: coachId,
              enrolledDate: paymentDate,
              enrolledDurationExpire:expireDate
            },
          }
        );
        const addUserIdToCoach = await coachModel.updateOne(
          { _id: new mongoose.Types.ObjectId(coachId) },
          {
            $addToSet: { Students: new mongoose.Types.ObjectId(userId) },
            $inc: { noOfStudentsCoached: 1 }
          }
        );
      console.log(userId,addUserIdToCoach,coachId,"coach student updated result")
        const updatedUser =  await userModel.findOne({_id:userId})
        return updatedPayment
  } catch (error) {
    console.error("Error in payment doc creation:", error);
     throw new Error(error.message);
  }
}
}