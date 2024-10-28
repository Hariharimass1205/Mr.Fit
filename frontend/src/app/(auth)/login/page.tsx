"use client"
import Footer from '@/components/user/footer';
import Navbar from '@/components/user/navbar';
import { useRouter } from 'next/navigation';
const bg = '/assets/backGround/pexels-anush-1431283.jpg';

const Login: React.FC = () => {
  let router = useRouter()
  return (
    <div>
      <Navbar />
      <div 
        className="flex justify-center items-start min-h-screen bg-cover bg-center pt-40" 
        style={{ backgroundImage: `url(${bg})` }} 
      >
        <div className="bg-black bg-opacity-70 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-white text-3xl text-center mb-6">Login</h2>
          <input
            type="email"
            placeholder="Email Address...."
            className="w-full p-3 mb-4 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Passcode..."
            className="w-full p-3 mb-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-right mb-4">
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">forgot passcode?</a>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
            Login
          </button>
          <button onClick={()=>{router.push("/signup")}}  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            New to us?
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
