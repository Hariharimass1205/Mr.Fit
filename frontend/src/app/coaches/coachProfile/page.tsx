"use client";

import { changeProfilePic, fetchCoachData, savePackageBackend, saveProfiletoBackend } from "@/service/coachApi";
import { useEffect, useState } from "react";
import { Coach } from "../../../../utils/types";
import { Types } from "mongoose";
import bg from "../../../../public/assets/backGround/pexels-leonardho-1552106.jpg";
import { useRouter } from "next/navigation";
import { toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAchievementBackend } from "@/service/coachApi";

export default function CoachProfile() {
  const router = useRouter();

  const [coach, setCoach] = useState<Coach>({
    userId: new Types.ObjectId(),
    name: "",
    age: 0,
    height: 0,
    weight: 0,
    noOfStudentsCoached: 0,
    Students: [""],
    availability: "",
    achievementBadges:{
      AchievementsOne:"",
      AchievementsTwo:"",
      AchievementsThree:""
    },
    package: [0, 0, 0],
    state: "",
    city: "",
    locality: "",
    licenseOrAadhaar: "",
    role: "",
  });

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [isEditingAchievement,setIsEditingAchievement]= useState(false);
  const [monthlyPackage, setMonthlyPackage] = useState(3999);
  const [achievementsOne,setAchievementsOne] = useState("")
  const [achievementsTwo,setAchievementsTwo] = useState("")
  const [achievementsThree,setAchievementsThree] = useState("")
  const [quarterlyPackage, setQuarterlyPackage] = useState(9999);
  const [yearlyPackage, setYearlyPackage] = useState(17999);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [states, setStates] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchCoachDatafn = async () => {
      try {
        const response = await fetchCoachData();
        setCoach(response.coach);
        setName(response?.coach.name);
        setAge(response.coach.age);
        setStates(response.coach.state);
        setWeight(response.coach.weight);
        setMonthlyPackage(response.coach.package.monthlyPackage)
        setQuarterlyPackage(response.coach.package.quarterlyPackage)
        setYearlyPackage(response.coach.package.yearlyPackage)
        setAchievementsThree(response.coach.achievementBadges.achievementsThree)
        setAchievementsTwo(response.coach.achievementBadges.achievementsTwo)
        setAchievementsOne(response.coach.achievementBadges.achievementsOne)
        setHeight(response.coach.height);
        setPhone(response.coach.phone);
        setProfileImageUrl(response.userImg)
        setAddress(response.coach.address);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch coach data.");
        setLoading(false);
      }
    };
    fetchCoachDatafn();
  }, []);
   
  const handleProfileSave = async () => {
     const objData={
      name: name,
      age:age,
      height:height,
      weight:weight,
      phone:phone,
      states:states,
      address:address
     } 
     const res = await saveProfiletoBackend(objData)
     setCoach(res)
    setIsEditingProfile(false);
    toast.success("profile successfully updated")
  };

  
  const handleAchievementSave = async () => {
    if (!achievementsOne && !achievementsTwo && !achievementsThree) {
      toast.error("Please add an achievement before saving.");
      return;
    }
    try {
      let achieve={
          achievementsOne:achievementsOne,
          achievementsTwo:achievementsTwo,
          achievementsThree:achievementsThree
      }
      let dataSet = { coachId: coach.userId, achievement: achieve };
      const res = await saveAchievementBackend(dataSet);
      console.log(res,"111111111111111111111")
      setCoach(res);
      setIsEditingAchievement(false);
      toast.success("Achievement successfully added!");
    } catch (error) {
      toast.error("Failed to save achievement.");
    }
  };
  console.log(achievementsOne,"AchievementsOneAchievementsOneAchievementsOne")


  const handlePackageSave = async () => {
    let pack ={
      monthlyPackage:monthlyPackage,
      quarterlyPackage:quarterlyPackage,
      yearlyPackage:yearlyPackage
    }
     const res = await savePackageBackend(pack)
     setMonthlyPackage(res.package.monthlyPackage)
     setQuarterlyPackage(res.package.quarterlyPackage)
     setYearlyPackage(res.package.yearlyPackage)
     setIsEditingPackage(false)
     toast.success("package successfully updated")
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageUrl(URL.createObjectURL(file)); 
      const res = await changeProfilePic(file)
      toast.success("profile pictured changed successfuly")
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 relative">
      {/* Back Button */}
      <ToastContainer></ToastContainer>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.push("/user/home")}
          className="bg-slate-600 m-4 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Back Home
        </button>
      </div>

      {/* Header Section with Background Image */}
      <div
        className="h-80 w-full flex justify-start rounded-xl items-start bg-cover bg-center pt-40"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="ml-10 flex items-start gap-4">
          {/* Profile Image */}
          <div className="relative bg-gray-700 rounded-full overflow-hidden h-28 w-28">
            {profileImageUrl ? (
              <div className="justify-item-center">
              <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
             
              </div>
            ) : (
              <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
            )}
           
          </div>
          {/* Name and State */}
          <div>
            <h1 className="text-7xl mb-4 text-white font-bold">{name}</h1>
            <p className="text-sm ml-2 text-white">{states}</p>
            <p className="ml-2 text-yellow-500">
              ★★★<span className="text-white">★★</span>
            </p>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Coach Profile */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full mx-auto mt-2">
  <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center">
    Coach Profile
    <button
      onClick={() => setIsEditingProfile(!isEditingProfile)}
      className="ml-4 text-sm text-blue-400 hover:text-blue-600 underline">
      {isEditingProfile ? "Cancel" : "Edit"}
    </button>
  </h2>
  <div className="mb-4">
    {isEditingProfile ? (
      <div>
        <label className="block text-white mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">State:</label>
        <input
          type="text"
          value={states}
          onChange={(e) => setStates(e.target.value)}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Phone:</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Profile Image:</label>
        <input
          type="file" 
          accept="image/*"
          onChange={handleProfileImageChange}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <button
          onClick={handleProfileSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Save
        </button>
      </div>
    ) : (
      <div className="text-white">
        <p className="mb-2"><span className="font-semibold">Name:</span> {name}</p>
        <p className="mb-2"><span className="font-semibold">Age:</span> {age}</p>
        <p className="mb-2"><span className="font-semibold">Height:</span> {height} cm</p>
        <p className="mb-2"><span className="font-semibold">Weight:</span> {weight} kg</p>
        <p className="mb-2"><span className="font-semibold">Phone:</span> {phone}</p>
        <p className="mb-2"><span className="font-semibold">Address:</span> {address}</p>
      </div>
    )}
  </div>
</div>


   <div className="bg-gray-700 rounded-lg shadow-md p-6">
   <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center"> 
          Achievement Badges
            <button
              onClick={() => setIsEditingAchievement(!isEditingAchievement)}
              className="ml-4 text-sm text-blue-400 underline"
            >
             {isEditingAchievement ? "Cancel" : "Edit"}
            </button>
          </h2>
          {isEditingAchievement ? (
            <div>
              <label>Add Achievement :</label>

      <input
        type="text"
        value={achievementsOne}
        onChange={(e) => setAchievementsOne(e.target.value)}
        className="w-full bg-gray-600 text-white p-2 rounded mb-2"
      />
      <input
        type="text"
        value={achievementsTwo}
        onChange={(e) => setAchievementsTwo(e.target.value)}
        className="w-full bg-gray-600 text-white p-2 rounded mb-2"
      />
      <input
        type="text"
        value={achievementsThree}
        onChange={(e) => setAchievementsThree(e.target.value)}
        className="w-full bg-gray-600 text-white p-2 rounded mb-2"
      />
              <button
                onClick={handleAchievementSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="text-center p-2 bg-gray-900 rounded-xl shadow-lg mt-2 max-w-3xl mx-auto">
  <h2 className="text-3xl font-extrabold text-slate-600-600 mb-6">Coach Achievements</h2>
  <div className="flex justify-around gap-4 flex-wrap">
    <div className="bg-orange-800 p-2 rounded-lg shadow-md w-48 h-16 text-center flex flex-col justify-between items-center">
      <h3 className="text-gray-300 text-sm">Achievement One</h3>
      <p className="text-xl font-semibold text-white mb-2">{achievementsOne}</p>
    </div>
    <div className="bg-orange-800 p-2 rounded-lg shadow-md w-48 h-16 text-center flex flex-col justify-between items-center">
      <h3 className="text-gray-300 text-sm">Achievement Two</h3>
      <p className="text-xl font-semibold text-white mb-2">{achievementsTwo}</p>
    </div>
    <div className="bg-orange-800 p-2 rounded-lg shadow-md w-48 h-16 text-center flex flex-col justify-between items-center">
      <h3 className="text-gray-300 text-sm">Achievement Three</h3>
      <p className="text-xl font-semibold text-white mb-2">{achievementsThree}</p>
    </div>
  </div>
</div>

          
          )}
        </div> 






        {/* Package Details */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full   mx-auto mt-2">
  <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center">
    Package Details
    <button
      onClick={() => setIsEditingPackage(!isEditingPackage)}
      className="ml-4 text-sm text-blue-400 hover:text-blue-600 underline">
      {isEditingPackage ? "Cancel" : "Edit"}
    </button>
  </h2>
  <div className="mb-4">
    {isEditingPackage ? (
      <div>
        <label className="block text-white mb-2">Monthly Package:</label>
        <input
          type="number"
          value={monthlyPackage}
          onChange={(e) => setMonthlyPackage(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Quarterly Package:</label>
        <input
          type="number"
          value={quarterlyPackage}
          onChange={(e) => setQuarterlyPackage(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <label className="block text-white mb-2">Yearly Package:</label>
        <input
          type="number"
          value={yearlyPackage}
          onChange={(e) => setYearlyPackage(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-3 rounded mb-4"
        />
        
        <button
          onClick={handlePackageSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Save
        </button>
      </div>
    ) : (
      <div className="text-white">
        <p className="mb-2"><span className="font-semibold">Monthly:</span> ₹ {monthlyPackage}</p>
        <p className="mb-2"><span className="font-semibold">Quarterly:</span> ₹ {quarterlyPackage}</p>
        <p className="mb-2"><span className="font-semibold">Yearly:</span> ₹ {yearlyPackage}</p>
      </div>
    )}
  </div>
</div>

        
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
        <div className="bg-gray-700 rounded-lg shadow-md p-6 flex justify-around">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Show Reviews
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            List Reviews
          </button>
        </div>
      </div>
    </div>
  );
}