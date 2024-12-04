"use client";

import { changeProfilePic, fetchCoachData, savePackageBackend, saveProfiletoBackend } from "@/service/coachApi";
import { useEffect, useState } from "react";
import { Coach } from "../../../../utils/types";
import { Types } from "mongoose";
import bg from "../../../../public/assets/backGround/pexels-leonardho-1552106.jpg";
import { useRouter } from "next/navigation";
import { toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    achievementBadges: [""],
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
  const [monthlyPackage, setMonthlyPackage] = useState(3999);
  const [quarterlyPackage, setQuarterlyPackage] = useState(9999);
  const [yearlyPackage, setYearlyPackage] = useState(17999);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [states, setStates] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchCoachDatafn = async () => {
      try {
        const response = await fetchCoachData();
        setName(response?.coach.name);
        setAge(response.coach.age);
        setStates(response.coach.state);
        setWeight(response.coach.weight);
        setMonthlyPackage(response.coach.package.monthlyPackage)
        setQuarterlyPackage(response.coach.package.quarterlyPackage)
        setYearlyPackage(response.coach.package.yearlyPackage)
        setHeight(response.coach.height);
        setPhone(response.coach.phone);
        setProfileImageUrl(response.userImg)
        setAddress(response.coach.address);
        setCoach(response.coach);
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
     console.log(objData,"profile data")
     const res = await saveProfiletoBackend(objData)
    setIsEditingProfile(false);
    toast.success("profile successfully updated")
  };

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
    console.log(file,"file")
    if (file) {
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file)); 
      const res = await changeProfilePic(file)
        setProfileImage(res.profileImage)
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
              <p className="my-3">....add pic</p>
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
<div className="bg-gray-700 rounded-lg shadow-md p-6">
  <h2 className="text-2xl mb-3 font-bold">
    Coach Profile
    <button
      onClick={() => setIsEditingProfile(!isEditingProfile)}
      className="ml-4 text-sm text-blue-400 underline"
    >
      {isEditingProfile ? "Cancel" : "Edit"}
    </button>
  </h2>
  <div className="mb-4">
  </div>
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
      <label>State:</label>
      <input
        type="text"
        value={states}
        onChange={(e) => setStates(e.target.value)}
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
      <label>Address:</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full bg-gray-600 text-white p-2 rounded mb-2"
      />
      <label >profile image</label>
      <input
            type="file" 
            accept="image/*"
            onChange={handleProfileImageChange}
            placeholder=" "
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
      <p>Address: {address}</p>
    </div>
  )}
</div>


        {/* Achievement Badges */}
        <div className="bg-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-2xl mb-10 font-bold">Achievement Badges</h2>
          <p className="mt-2 bg-orange-500 text-black font-bold inline-block py-7 px-7 rounded-full">
            Mr. Tamil Nadu 2024 ⭐
          </p>
        </div>

        {/* Package Details */}
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
              <p>Monthly: ₹ {monthlyPackage}</p>
              <p>Quarterly: ₹ {quarterlyPackage}</p>
              <p>Yearly: ₹ {yearlyPackage}</p>
            </div>
          )}
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
      </div>
    </div>
  );
}
