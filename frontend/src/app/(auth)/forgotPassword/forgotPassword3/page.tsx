"use client"
import Footer from '../../../../components/user/footer'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { saveNewPassword } from '../../../../service/userApi';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const bg = '/assets/backGround/neeww.jpg';

type input = {
  password:string
  confirmpassword:string
  email:string
}
const ForgotPassword3: React.FC = () => {
  const router = useRouter()
  const  [error , setError] = useState(false)
  
  // accessing query by this
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<input>()

const onsubmit:SubmitHandler<input> = async (data)=>{
  try {
    const {password} = data
    const response = await saveNewPassword(password,email)
    if(response){
      toast.success("Successfully password changed",{onClose:()=>router.replace(`/login`)})
    }
  } catch (err) {
    setError(true)
    console.log(err)
  }
}
  return (
    <>
    <ToastContainer></ToastContainer>
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
          <form onSubmit={handleSubmit(onsubmit)} >
          <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="password..."
                className="w-full  p-3 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <small>{errors.password && <p className="text-red-500">{errors.password.message}</p>}</small>
              <input
                type="password"
                id="confirmpassword"
                {...register("confirmpassword", {
                  required: "Please confirm your password",
                  validate: value => value === getValues("password") || "Passwords do not match",
                })}
                placeholder="confirmPassword..."
                className="w-full  p-3 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <small>{errors.confirmpassword && <p className="text-red-500">{errors.confirmpassword.message}</p>}</small>
            {error?
            <h3 style={{color:"red"}}>Invalide OTP</h3>:
            ""}
          <button type="submit"   className="mt-10 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
            Change Password
          </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default ForgotPassword3;
