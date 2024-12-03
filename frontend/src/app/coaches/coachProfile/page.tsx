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
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [monthlyPackage, setMonthlyPackage] = useState(3999);
  const [quarterlyPackage, setQuarterlyPackage] = useState(9999);
  const [yearlyPackage, setYearlyPackage] = useState(17999);
  const [weight,setWeight] = useState(0)
  const [height,setHeight] = useState(0)
  const [address,setAddress] = useState("")
  const [phone,setPhone] = useState(0)
  const [states,setStates] = useState("")
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchCoachDatafn = async () => {
      try {
        const response = await fetchCoachData();
        setName(response?.name)
        setAge(response.age)
       setStates(response.state)
        setWeight(response.weight)
        setHeight(response.height)
        setPhone(response.phone)
        setAddress(response.address)
        setCoach(response); 
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch coach data.");
        setLoading(false);
      }
    };
    fetchCoachDatafn();
  }, []); 

  const handleProfileSave = () => {
    setIsEditingProfile(false);
  };
  const handlePackageSave = () => {
    setIsEditingPackage(false);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
    return (

    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 relative">
      <div className="absolute top-4 right-4">
        <button onClick={()=>router.push("/user/home")} className="bg-slate-600 m-4 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          Back Home
        </button>
      </div>
      <div
        className="h-80 w-full flex justify-start rounded-xl items-start  bg-cover bg-center pt-40"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="ml-10  flex items-start gap-4">
          {/* Profile Image */}
          <div className=" bg-gray-700 rounded-full overflow-hidden">
          </div>
          {/* Name and Rating */}
          <div>
            <h1 className="text-7xl mb-4 text-white font-bold">{name}</h1>
            <p className="text-sm ml-2 text-white">{states}</p>
            <p className= "ml-2 text-yellow-500">
              ★★★<span className="text-white">★★</span>
            </p>
          </div>
        </div>
      </div>
      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
       {/* Coach Profile */}
       <div className="bg-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-2xl justify-items-center mb-3 font-bold">
            Coach Profile
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="ml-4 text-sm justify-end   text-blue-400 underline"
            >
              {isEditingProfile ? "Cancel" : "Edit"}
            </button>
          </h2>
          {isEditingProfile ? (
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <label>Age:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <label>Height:</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <label>Weight:</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <label>Phone:</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <button
                onClick={handleProfileSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
              <p>Phone: {phone}</p>
              <p className="w-40">address: {address}</p>
            </div>
          )}
        </div>
      
        {/* Achievement Badges */}
        <div className="bg-gray-700 rounded-lg shadow-md p-6 justify-items-center">
          <h2 className="text-2xl mb-10 font-bold">Achievement Badges</h2>
          <p className="mt-2  bg-orange-500 text-black font-bold inline-block py-7 px-7 rounded-full">
            Mr. Tamil Nadu 2024 ⭐
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-2xl mb-3 font-bold">
            Package Details
            <button
              onClick={() => setIsEditingPackage(!isEditingPackage)}
              className="ml-4 text-sm text-blue-400 underline"
            >
              {isEditingPackage ? "Cancel" : "Edit"}
            </button>
          </h2>
          {isEditingPackage ? (
            <div>
              <label>Monthly:</label>
              <input
                type="number"
                value={monthlyPackage}
                onChange={(e) => setMonthlyPackage(Number(e.target.value))}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <label>Quarterly:</label>
              <input
                type="number"
                value={quarterlyPackage}
                onChange={(e) => setQuarterlyPackage(Number(e.target.value))}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <label>Yearly:</label>
              <input
                type="number"
                value={yearlyPackage}
                onChange={(e) => setYearlyPackage(Number(e.target.value))}
                className="w-full bg-gray-600 text-white p-2 rounded mb-2"
              />
              <button
                onClick={handlePackageSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>Monthly: $ {monthlyPackage}</p>
              <p>Quarterly: $ {quarterlyPackage}</p>
              <p>Yearly: $ {yearlyPackage}</p>
            </div>
          )}
          
      </div>
      </div>
    
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Students Coached */}
        <div className="bg-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-3">Students Coached</h2>
          <p>Total: 49</p>
          <p>Current Student: Hari</p>
        </div>
    
        {/* Buttons */}
        <div className="bg-gray-700 rounded-lg shadow-md p-6 flex justify-around">
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
  