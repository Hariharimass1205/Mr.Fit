// pages/coach-profile.js

export default function CoachProfile() {
    return (
      <div className="min-h-screen bg-gray-900 text-white font-sans p-4">
        {/* Notification Badge */}
        <div className="absolute top-4 right-6">
          <div className="relative">
            <span className="text-gray-400">🔔</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>
        </div>
  
        {/* Profile Section */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="h-20 w-20 bg-gray-700 rounded-full overflow-hidden">
              <img
                src="/coach-placeholder.jpg" // Replace with your image URL
                alt="Coach Image"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name and Rating */}
            <div>
              <h1 className="text-2xl font-bold">Sri Ragh</h1>
              <p className="text-gray-400">Tamil Nadu</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
          </div>
        </div>
  
        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Coach Profile */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold">Coach Profile</h2>
            <p>Name: Sri Ragh</p>
            <p>Age: 23</p>
            <p>Height: 187 cm</p>
            <p>Weight: 78 kg</p>
            <p>Phone: 9868894332</p>
          </div>
  
          {/* Achievement Badges */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold">Achievement Badges</h2>
            <p className="mt-2 bg-yellow-500 text-black font-bold inline-block py-1 px-3 rounded">
              Mr. Tamil Nadu 2024 ⭐
            </p>
          </div>
  
          {/* Package Details */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold">Package Details</h2>
            <p>Monthly: $ 3999</p>
            <p>Quarterly: $ 9999</p>
            <p>Yearly: $ 17999</p>
          </div>
        </div>
  
        {/* Students Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Students Coached */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold">Students Coached</h2>
            <p>Total: 49</p>
            <p>Current Student: Hari</p>
          </div>
  
          {/* Buttons */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 flex justify-around">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Show Availability
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Student List
            </button>
          </div>
        </div>
      </div>
    );
  }
  