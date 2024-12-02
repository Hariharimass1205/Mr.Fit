"use client"

import { fetchCoachData } from "@/service/coachApi";
import { useEffect, useState } from "react";
import { Coach } from "../../../../utils/types";
import { Types } from "mongoose";
import bg from "../../../../public/assets/backGround/pexels-leonardho-1552106.jpg"
import { useRouter } from "next/navigation";

export default function CoachProfile() {
  const router = useRouter()
  const [coach, setCoach] = useState<Coach>({
    userId: new Types.ObjectId(),    
    name: "",                        
    age: 0,
    height: 0,
    weight: 0,
    noOfStudentsCoached: 0,
    Students: [""],                  
    availability: "",
    achievementBadges: [""],         
    package: [0, 0, 0],              
    state: "",
    city: "",
    locality: "",
    licenseOrAadhaar: "",
    role: "",
  });

  const [name,setName] = useState("")
  const [age,setAge] = useState(0)
  const [weight,setWeight] = useState(0)
  const [height,setHeight] = useState(0)
  const [phone,setPhone] = useState(0)
  const [states,setStates] = useState("")
  const [loading, setLoading] = useState<boolean>(true);  // To show loading state
  const [error, setError] = useState<string | null>(null); // To handle errors

  useEffect(() => {
    // Fetching coach data from backend
    const fetchCoachDatafn = async () => {
      try {
        const response = await fetchCoachData();
        console.log(response,"page") 
        setName(response?.name)
        setAge(response.age)
       setStates(response.state)
        setWeight(response.weight)
        setHeight(response.height)
        setPhone(response.phone)
        setCoach(response); 
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch coach data.");
        setLoading(false);
      }
    };

    fetchCoachDatafn();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  console.log(name,"state")
  // Show loading or error states while fetching data
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
    return (<div className="min-h-screen bg-gray-900 text-white font-sans p-4 relative">
      <div className="absolute top-4 right-4">
        <button onClick={()=>router.push("/user/home")} className="bg-slate-600 m-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          Back Home
        </button>
      </div>
    
      <div className="bg-white flex rounded-lg shadow-md p-16">
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="h-40 w-40 bg-gray-700 rounded-full overflow-hidden">
            <img
              src={bg.src}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Name and Rating */}
          <div>
            <h1 className="text-6xl text-black font-bold">{name}</h1>
            <p className="text-sm text-black">{states}</p>
            <p className="text-yellow-500">
              ★★★<span className="text-white">★★</span>
            </p>
          </div>
        </div>
      </div>
    
      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Coach Profile */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold">Coach Profile</h2>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          <p>Phone: {phone}</p>
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
  