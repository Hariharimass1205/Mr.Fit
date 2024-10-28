import Footer from '@/components/user/footer';
import Navbar from '@/components/user/navbar';
const bg = '/assets/backGround/pexels-dogu-tuncer-339534179-15917308.jpg';
const Signup: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div 
        className="flex justify-center items-start min-h-screen bg-cover bg-center pt-40" 
        style={{ backgroundImage: `url(${bg})` }} 
      >
        <div className="bg-black bg-opacity-70 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-white text-3xl text-center mb-6">Sign Up</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email..."
            className="w-full p-3 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Phone..."
            className="w-full p-3 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Passcode..."
            className="w-full p-3 mb-5 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         
         <div>
      <h2>Select Gender:</h2>
      
      <label className='p-8'>
        <input
          type="radio"
          name="gender"
          value="male"
        />
        Male
      </label>

      <label className='p-8'>
        <input
          type="radio"
          name="gender"
          value="female"
        />
        Female
      </label>

      <label className='p-8'>
        <input
          type="radio"
          name="gender"
          value="other"
        />
        Other
      </label>
      </div>
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 mb-4">
            Login
          </button>
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Already have an account?
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
