"use client"
import Footer from '@/components/user/footer';
import Navbar from '@/components/user/navbar';
import { otpVerify, signupApi } from '@/service/userApi';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
const bg = '/assets/backGround/neeww.jpg';

type input = {
    otp:number
}
const Login: React.FC = () => {
  let router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<input>()

  const onSubmit: SubmitHandler<input> = async (data) => {
    const { otp} = data;
    try {
        const response = await otpVerify(otp);
        if(response.statusCode==200){
          router.push('/home')
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div>
      <Navbar />
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
          <h1>......................................................................................</h1><br/>
          <button type="submit"   className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
            verify
          </button>
          </form>
          <button onClick={()=>{router.push("/login")}}  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Already have an account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
