import { IPaymentRepository } from "../interface/repository/paymentRepository.interface";
import coachModel from "../model/coachModel";
import paymentModel from "../model/paymentModel";
import userModel from "../model/userModel";


export class PaymentRepository implements IPaymentRepository{
 paymentDetails=async(bookingData:any): Promise<any|null>=> {
    try {
       const{ txnid,amount,productinfo, username,email,udf1}=bookingData
       const paymentDetail= await paymentModel.create({
       coachName:username,
       coachEmail:email,
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
      console.log( 
        txnid,
        email,
        coachId,
        status,
        amount,
        userId,"in repoooo")
        const updatedPayment = await paymentModel.updateOne({coachEmail:email},{$set:{paymentStatus:"completed"}})
        const payment = await paymentModel.findOne({coachEmail:email,userId:userId})
        const paymentDate = new Intl.DateTimeFormat("en-US").format(new Date(payment.transactionDate));
        const userCoachIdUpdate = await userModel.updateOne({_id:userId},{$set:{enrolledPackage:amount,coachId:coachId,enrolledDate:paymentDate}})
        const addUserIdToCoach = await coachModel.updateOne(
          { _id: coachId },
          { $addToSet: { students: userId } }
      );
        const updatedUser =  await userModel.findOne({_id:userId})
        console.log(updatedUser,"user after payment")
        return updatedPayment
  } catch (error) {
    console.error("Error in payment doc creation:", error);
     throw new Error(error.message);
  }
}
}