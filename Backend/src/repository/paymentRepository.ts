import { IPaymentRepository } from "../interface/repository/paymentRepository.interface";
import paymentModel from "../model/paymentModel";
import userModel from "../model/userModel";


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
      txnid,
      email,
      coachId,
      status,
      amount,
      userId,}=bookingData
      console.log( txnid,
        email,
        coachId,
        status,
        amount,
        userId,"in repoooo")
        const updatedPayment = await paymentModel.updateOne({userEmail:email},{$set:{paymentStatus:"completed"}})
        const userCoachIdUpdate = await userModel.updateOne({_id:userId},{$set:{enrolledPackage:amount,coachId:coachId}})
        const updatedUser =  await userModel.findOne({_id:userId})
        console.log(updatedUser,"user after payment")
        return updatedPayment
  } catch (error) {
    console.error("Error in payment doc creation:", error);
     throw new Error(error.message);
  }
}
}