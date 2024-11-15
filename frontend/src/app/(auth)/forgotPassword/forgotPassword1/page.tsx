"use client"
import Footer from '@/components/user/footer';
import { forgotpasswordEmail } from '@/service/userApi';
import { useRouter } from 'next/navigation';
import {  useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
const bg = '/assets/backGround/neeww.jpg';

type input = {
  email:string
}
const ForgotPassword1: React.FC = () => {
  let router = useRouter()
  let [error , setError] = useState(false)
  
  // accessing query by this
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<input>()

   const onSubmit:SubmitHandler<input> = async(data)=>{
    const {email} = data
    try {
      const response = await forgotpasswordEmail(email)
      if(response){
        router.push(`/forgotPassword/forgotPasswordOTP?email=${email}`)
      }else{
        setError(true)
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
          <h2 className="text-white text-3xl text-center mb-10">Forgot Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          <input
             type="text"
             placeholder=" Enter your email ......."
             id="email"
             className="w-full p-3 mt-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             {...register("email", {
               required: "email required"
             })}
            />
            <small>{errors.email && <p className="text-red-500">{errors.email.message}</p>}</small>
            {error?
            <h3 style={{color:"red"}}>Email Not Found</h3>:
            ""}
          <button type="submit"   className="mt-10 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
            Verify Email
          </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword1;
