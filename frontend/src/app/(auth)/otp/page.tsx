"use client"
import Footer from '@/components/user/footer';
import Navbar from '@/components/user/navbar';
import { otpVerify, signupApi } from '@/service/userApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
const bg = '/assets/backGround/neeww.jpg';

type input = {
    otp:string
}
const OTP: React.FC = () => {
  let router = useRouter()
  let [error , setError] = useState(false)
  let [timeLeft,setTimeLeft] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  
  // accessing query by this
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // Handle Resend OTP click
      const handleResentOTP = () => {
        console.log("Resend OTP");
        setTimeLeft(60);
        setIsResendDisabled(true);
        };

  useEffect(()=>{
    if(timeLeft==0){
      setIsResendDisabled(false)
    }
    if(timeLeft>0){
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      },1000);
      return ()=> clearInterval(timer)
    }
  },[timeLeft])


  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<input>()

  const onSubmit: SubmitHandler<input> = async (data) => {
        const { otp} = data;
    try {
      if (!email) {
        console.error("Email is missing in the query params.");
        return;  // Exit if email is missing
      }
        const response = await otpVerify(otp,email);
        console.log(response)
        if(response){
          router.push('/login')
        }
      } catch (error:any) {
        setError(true)
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
          <h2 className="text-white text-3xl text-center mb-6">OTP Verification</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          <input
             type="number"
             placeholder=" ENter your OTP ......."
             id="otp"
             className="w-full p-3 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             {...register("otp", {
               required: "OTP required"
             })}
            />
            <small>{errors.otp && <p className="text-red-500">{errors.otp.message}</p>}</small>
            {error?
            <h3 style={{color:"red"}}>Invalide OTP</h3>:
            ""}
          <h1>......................................................................................</h1><br/>
          <button type="submit"   className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
            verify
          </button>
          </form>
          {isResendDisabled ? (
            <p className="text-sm text-white-600">
            Resend OTP in{" "}
            <span className="font-medium text-red-900">
              {timeLeft} seconds
            </span>
          </p>
          ):
          (
            <button onClick={handleResentOTP}   className="w-1/2  bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-800 mb-4">
            resent otp
          </button>
          ) }
          
          <button onClick={()=>{router.push("/login")}}  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Already have an account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OTP;
