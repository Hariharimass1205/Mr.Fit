"use client"
import Footer from '../../../../components/user/footer'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { resendOTP, verifyOTPforForgotOtp } from '../../../../service/userApi';
const bg = '/assets/backGround/neeww.jpg';

type input = {
    otp:string
}
const ForgotPassword2: React.FC = () => {
  const router = useRouter()
  const [error , setError] = useState(false)
  const [timer,setTimer] = useState(60)
  const [buttonVisible,setButtonVisible] = useState(false)
  const [resendOTPmsg,setResendOTPmsg] = useState(false)

  useEffect(()=>{
    if(timer>0){
    const intervalId =  setInterval(() => { 
       setTimer((prevTime)=>prevTime-1)
    }, 1000);
    return ()=> clearInterval(intervalId)
   }else{
     setButtonVisible(true)
   }
   },[timer])
  


  // accessing query by this
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<input>()

  const onsubmit:SubmitHandler<input> = async (data)=>{
     try {
      const {otp} = data 
      const response = await verifyOTPforForgotOtp(otp,email);
      if(response){
        router.replace(`/forgotPassword/forgotPassword3?email=${email}`)
      }
     } catch (err) {
      setError(true)
      console.log(err)
     }
  }

  const handleResendOTP = async ()=>{
    try {
      const response = await resendOTP(email)
      if(response){
        setResendOTPmsg(true)
      }
    } catch (err) {
      setError(true)
      console.log(err);
    }
}
  return (
    <div>
      <nav className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <h1>Mr.Fit</h1>
      </div>
    </nav>
      <div 
        className="flex justify-center items-start min-h-screen bg-cover bg-center pt-40" 
        style={{ backgroundImage: `url(${bg})` }} 
      >
        <div className="bg-black bg-opacity-70 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-white text-3xl text-center mb-10">We have send an OTP to your Email</h2>
          <form onSubmit={handleSubmit(onsubmit)}>
            <input
             type="text"
             placeholder=" Enter your OTP ......."
             id="otp"
             className="w-full p-3 mt-5 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             {...register("otp", {
               required: "OTP required"
             })}
              />
            <small>{errors.otp && <p className="text-red-500">{errors.otp.message}</p>}</small>
            {resendOTPmsg?
          <h1>OTP resend Successful</h1>  : ""
          }
            {error?
            <h3 style={{color:"red"}}>Invalide OTP</h3>:
            ""}
          <h1>Time left : {timer}</h1>
              {buttonVisible?
          <button  onClick={handleResendOTP}   className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
            Resent otp
          </button>:
          <button type="submit"   className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
          verify
        </button>
}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword2;
