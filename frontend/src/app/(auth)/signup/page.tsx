"use client"
import Footer from '@/components/user/footer';
import { toast,ToastContainer } from 'react-toastify';
import { signupApi } from '@/service/userApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import bg from "../../../../public/assets/backGround/pexels-olly-3775164.jpg"

type input = {
  userName: string,
  email: string,
  phone: number,
  password: string,
  confirmPassword: string,
  gender: string
}
const Signup: React.FC = () => {
  const router = useRouter()
  const [userExsit,SetUserExsit] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<input>()
  const onSubmit: SubmitHandler<input> = async (data) => {
    const { userName, email, phone, password, gender } = data;
    const reqBody = {
      userName,
      email,
      phone: phone.toString(),
      password,
      gender, 
    };
    try {
      const response = await signupApi(reqBody);
      if(response.success){
        toast.success("Successfully otp sent successfully")
        router.replace(`/otp?email=${email}`)
      }
    } catch (error:any) {
      toast.error(error?.message)
      SetUserExsit(true)
    }
  };
  return (
    <div>
      <ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar
  newestOnTop
  closeOnClick
  rtl={true}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
      <nav className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <h1>Mr.Fit</h1>
      </div>
    </nav>
    <div
        className="flex justify-center items-start min-h-screen bg-cover bg-center pt-40"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="bg-black bg-opacity-20 p-10 rounded-lg max-w-md w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-white text-3xl text-center mb-6">Sign Up</h2>
          
            <input
              type="text"
              placeholder=" Your full Name......."
              id="userName"
              className="w-full p-3  text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("userName", {
                required: "Your userName is required"
              })}
            />
             <small>{errors.userName && <p className="text-red-500">{errors.userName.message}</p>}</small>
            <input
              type="email"
              placeholder="Email..."
              id="email"
              {...register("email", {
                required: "Your email is required"
              })}
              className="w-full p-3 mt-3 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             <small>{errors.email && <p className="text-red-500">{errors.email.message}</p>}</small>
            <input
              type="number"
              id="phone"
              {...register("phone", {
                required: "Your phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits only "
                }
              })}
              placeholder="Phone..."
              className="w-full p-3 mt-3 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small> {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}</small>

            <div className='flex'>
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
                className="w-full  p-3 mt-3 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === getValues("password") || "Passwords do not match",
                })}
                placeholder="confirmPassword..."
                className="w-full p-3 mt-3 ml-4 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <small>{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}</small>
            <div className='mb-10 mt-10'>
              <h2>Select Gender:</h2>

              <label className='p-8'>
                <input
                  type="radio"
                  value="male"
                  {...register('gender', { required: true })}
                />
                Male
              </label>
              <label className='p-8'>
                <input
                  type="radio"
                  value="female"
                  {...register('gender', { required: true })}
                />
                Female
              </label>
              <label className='p-8'>
                <input
                  type="radio"
                  value="other"
                  {...register('gender', { required: true })}
                />
                Other
              </label>
            </div>
            <button  type='submit' className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
              Signup
            </button>
          </form>
          <button onClick={() => { router.push("/login") }} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Already have an account?
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
