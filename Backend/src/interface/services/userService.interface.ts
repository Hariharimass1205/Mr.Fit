
import { 
    checkUserAndOtpSentInput,
    fetchuserdataServiceOutput,
    forgotPassverifyOTPServiceInput,
    loginUserInput,
    loginUserOutput,
    registerUserInput,
     registerUserOutput,
     saveNewPasswordInput,
     saveOTPtoModelInput,
     verifyOTPServiceInput,
} from "./userService.type";

export interface IUserService {
  registerUser(user: registerUserInput): Promise<registerUserOutput | null>;
  verifyOTPService(otpData:verifyOTPServiceInput): Promise<string | null>;
  fetchuserdataService(userId: string): Promise<fetchuserdataServiceOutput | null>;
  loginUser(loginData:loginUserInput): Promise<loginUserOutput>;
  checkUserAndOtpSent(data:checkUserAndOtpSentInput): Promise<any | null>;
  forgotPassverifyOTPService(data:forgotPassverifyOTPServiceInput): Promise<string>;
  saveNewPassword(data:saveNewPasswordInput): Promise<any | null>;
  saveOTPtoModel(data:saveOTPtoModelInput): Promise<any | null>;
}
