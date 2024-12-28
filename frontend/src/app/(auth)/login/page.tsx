"use client";
import Footer from '@/components/user/footer';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { googleLogin, loginApi } from '@/service/userApi';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer} from 'react-toastify';
import bg from "../../../../public/assets/backGround/pexels-zakaria-2827392.jpg"
import { useAppDispatch } from "@/store/hooks/hooks";
import { setUser } from '@/store/slices/userSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase/config";
import axios from 'axios';

type input = {
  email: string;
  password: string;
};

const Login: React.FC = () => {

  const router = useRouter();
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>();

  const onSubmit: SubmitHandler<input> = async (data) => {
    const { email, password } = data;
    const reqBody = { email, password };
    try {
      const response = await loginApi(reqBody);
      if(response){
        localStorage.setItem("user",JSON.stringify(response))
        dispatch(setUser(response))
        toast.success('Login Successful', { onClose:()=>router.replace(`/user/home`) });
      }
    } catch (error:any) {
      toast.error(error.message)
    }
  };
  const handleForgotPassword = ()=>{
    router.replace("/forgotPassword/forgotPassword1")
  }


  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      console.log(userData)
      const response = await googleLogin(userData)
      if (response.data) {
        localStorage.setItem("user",JSON.stringify(response))
        dispatch(setUser(response.data))
        toast.success(`Welcome back, Dr. ${response.data.userName}!`, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        toast.info("Redirecting to your Home...", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        setTimeout(() => {
          
          router.replace("/user/home");
        }, 3000);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Please check your email & password";
        toast.error(errorMessage);
      } else {
       console.log(error)
      }
    }
  };

  return (
    <>
      <ToastContainer 
      autoClose={2000}
     position="top-center"
/>
    <div>
      <nav className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <h1>Mr.Fit</h1>
      </div>
    </nav>


      <div
        className="flex justify-center items-start min-h-screen bg-cover bg-center pt-40"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="bg-black bg-opacity-20 p-8 rounded-lg max-w-md w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-white text-3xl text-center mb-6">Login</h2>
            <input
              type="email"
              placeholder="Email Address..."
              id="email"
              {...register("email", { required: "Your email is required" })}
              className="w-full p-3 mb-1 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small>{errors.email && <p className="text-red-500">{errors.email.message}</p>}</small>

            <input
  type="password"
  placeholder="Password..."
  id="password"
  autoComplete="current-password"
  aria-describedby="password-helper"
  {...register("password", { required: "Your Passcode is required" })}
  className="w-full p-3 mb-1 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<small id="password-helper" className="text-white-500">
  Your password should be at least 8 characters.
</small>
            <small>{errors.password && <p className="text-red-500">{errors.password.message}</p>}</small>
            <div className="text-right mb-4">

              <a onClick={handleForgotPassword} href="#" className="text-black-400 hover:text-gray-300 text-sm">
                Forgot passcode?
              </a>
            </div>
            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
              Login
            </button>
            <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-300 transform mb-4 hover:scale-105"
          >
            <FaGoogle className="mr-3" /> Google
          </button>
          </form>
          <button onClick={() => router.push("/signup")} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            New to us?
          </button>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Login;
