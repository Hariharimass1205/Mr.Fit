import { Request, Response, NextFunction } from 'express';
import { IPaymentController } from "../interface/controllers/paymentController.interface";
import { IPaymentService } from "../interface/services/paymentService.interface";
import { HttpStatus } from "../utils/httpStatusCode";
import { CustomRequest } from '../middlesware/jwtVerification';
let a  = 10

export class PaymentController implements IPaymentController {
  private paymentService: IPaymentService;
  constructor(paymentService: IPaymentService) {
    this.paymentService = paymentService;
  }

  payment = async (req: CustomRequest , res: Response, next: NextFunction): Promise<any> => {
    try {
      const { txnid, amount, productinfo, username, email, udf1  } = req.body;
        if (!txnid || !amount || !productinfo || !username || !email || !udf1) {
        return res.status(HttpStatus.BAD_REQUEST).send("Mandatory fields missing");
      }
      const hash = await this.paymentService.generatePaymentHash({
        txnid,
        amount,
        productinfo,
        username,
        email,
        udf1,
      });
      console.log(hash,"hashed key")
      res.status(HttpStatus.OK).send({ hash });
    } catch (err) {
      next(err);
    }
  };


 saveData= async (req: Request, res: Response, next: NextFunction):Promise<void>=> {
    try {
      const { txnid, email, productinfo, status, amount, udf1 } = req.body;
      const userId = udf1;
      const coachId = productinfo;
      console.log(txnid,"-------------", email,"-------------", productinfo, "-------------",status,"-------------", amount,"-------------", udf1,"-------------")
      const updatedBooking = await this.paymentService.updateBookingStatus({
        txnid,
        email,
        coachId,
        status,
        amount,
        userId,
      });
      if (updatedBooking) {
        console.log(updatedBooking,"result of saveData")
        res.status(HttpStatus.OK).json({ success: true, updatedBookingId: updatedBooking });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: "Booking update failed" });
      }
    } catch (error: any) {
      next(error);
    }
  }
}
