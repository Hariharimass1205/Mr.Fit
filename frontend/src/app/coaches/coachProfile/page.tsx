"use client";

import { changeProfilePic, fetchCoachData, saveAvailabilityBackend, saveCoachImg, savePackageBackend, saveProfiletoBackend, updateDiet } from "@/service/coachApi";
import { useEffect, useState } from "react";
import { Coach } from "../../../../utils/types";
import { Types } from "mongoose";
import bg from "../../../../public/assets/backGround/pexels-leonardho-1552106.jpg";
import { useRouter } from "next/navigation";
import { toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAchievementBackend } from "@/service/coachApi";
interface Student {
  _id: string;
  userName: string;
  phone: string;
  district: string;
  enrolledDuration: string;
   enrolledDurationExpire:""
  enrolledDate: string;
  Diet: {
    Meal1: string;
    Meal2: string;
    Meal3: string;
    Goal:{
      Water:Number|  null;
      Calories:Number|  null;
      Steps:Number|  null;
      Protein:Number|  null;
      Carbohydrates:Number|  null;
      Fats:Number|  null;
      Fiber:Number|  null;
      SleepTime:Number|  null;
    }
  };
}
export default function CoachProfile() {
  const router = useRouter();

  const [coach, setCoach] = useState<Coach>({
    _id:new Types.ObjectId(),
    userId: new Types.ObjectId(),
    name: "",
    age: 0,
    phone:0,
    height: 0,
    weight: 0,
    noOfStudentsCoached: 0,
    Students: [
      {
        type: new Types.ObjectId(),
      },
    ],
    availability: "",
    achievementBadges: {
      achievementsOne: "",
      achievementsTwo: "",
      achievementsThree: ""
    },
    package: {
      monthlyPackage: 0,
      quarterlyPackage: 0,
      yearlyPackage: 0
    },
    address:"",
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
  const [studentsCoached , setStudentsCoached] = useState(0)
  const [height, setHeight] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [states, setStates] = useState("");
  const [isEditingPictures, setIsEditingPictures] = useState(false);
  const [selectedImages, setSelectedImages] = useState([null, null, null]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [availability, setAvailability] = useState({
    fromTime: "",
    toTime: "",
    workingDays: [""],
  });
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [tempAvailability, setTempAvailability] = useState({ ...availability });
  useEffect(() => {
    const fetchCoachDatafn = async () => {
      try {
        const response = await fetchCoachData();
        setCoach(response.coach);
        setName(response?.coach.name);
        setStudents(response.coach.Students)
        setAvailability({
          fromTime : response.coach.availability.fromTime,
          toTime:response.coach.availability.toTime,
          workingDays:response.coach.availability.workingDays,
        })
        setAge(response.coach.age);
        setStates(response.coach.state);
        setWeight(response.coach.weight);
        setStudentsCoached(response.coach.noOfStudentsCoached)
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
    try {
      const achieve = { achievementsOne ,achievementsTwo,achievementsThree};
      const dataSet = { coachId: coach.userId, achievement: achieve };
      const res = await saveAchievementBackend(dataSet);
      // Update the coach state and clear the input
      setCoach((prev) => ({
        ...prev,
        achievementBadges: {
          ...prev.achievementBadges,
          AchievementsOne: achievementsOne,
        },
      }));
      setIsEditingAchievement(false);
      toast.success("Achievement successfully added!");
    } catch (error) {
      toast.error("Failed to save achievement.");
    }
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


  // Availability Availability process

  const handleSave =async  () => {
    setAvailability(tempAvailability);
    const res = await saveAvailabilityBackend(tempAvailability)
    if(res){
      toast.success("availability changed successfuly")
    }
    setIsEditingAvailability(false);
  };
  const handleCancel = () => {
    setTempAvailability({ ...availability });
    setIsEditingAvailability(false);
  };
  const handleWorkingDaysChange = (day:any) => {
    const updatedDays = tempAvailability.workingDays.includes(day)
      ? tempAvailability.workingDays.filter((d) => d !== day)
      : [...tempAvailability.workingDays, day];

    setTempAvailability({ ...tempAvailability, workingDays: updatedDays });
  };

  const convertTo24Hour = (time:any) => {
    const match = time.match(/(\d+)\s?(AM|PM)/i);
    if (!match) return "";
    const [_, hour, period] = match;
    let hours = parseInt(hour, 10);
    if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}`;
  };

  const convertTo12Hour = (time:any) => {
    const intHour = parseInt(time, 10);
    const period = intHour >= 12 ? "PM" : "AM";
    const formattedHour = intHour % 12 === 0 ? 12 : intHour % 12;
    return `${formattedHour} ${period}`;
  };


//handle pictues
const handleImageChange = (e:any, index:number) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    const updatedImages:any = [...selectedImages];
    updatedImages[index] = imageUrl;
    setSelectedImages(updatedImages);
  }
};
const handlePicturesSave = async  () => {
  try {
    console.log(selectedImages);
    const img1 = selectedImages[3]
    const img2 = selectedImages[1]
    const img3 = selectedImages[2]
    console.log(img1,"img1",img2,"img1",img3,"img1")
    
    const response = await saveCoachImg(img1,img2,img3)
    if(response){
      toast.success("successfully added Images")
    }
  } catch (error:any) {
    toast.error(error)
  }
 
};

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
   {/* Achievements Section */}
<div className="bg-gray-800 rounded-lg shadow-md p-6 w-full mx-auto mt-2">
  <h2 className="text-2xl mb-4 font-extrabold text-red-500 flex justify-between items-center">
    Achievements
    <button
      onClick={() => setIsEditingAchievement(!isEditingAchievement)}
      className="ml-4 text-sm text-blue-400 hover:text-blue-600 underline"
    >
      {isEditingAchievement ? "Cancel" : "Edit"}
    </button>
  </h2>
  
  {isEditingAchievement ? (
    <div>
      <label className="block text-white mb-2">Add Achievement:</label>
     <div className="flex">
      <input
        type="text"
        value={achievementsOne}
        onChange={(e) => setAchievementsOne(e.target.value)}
        className="w-full bg-gray-700 text-white p-3 rounded mb-4"
      />
       <button onClick={()=>setAchievementsOne("")} className="text-black ml-3 bg-slate-400 rounded-lg">remove</button>
       </div>
       <div className="flex">
         <input
        type="text"
        value={achievementsTwo}
        onChange={(e) => setAchievementsTwo(e.target.value)}
        className="w-full bg-gray-700 text-white p-3 rounded mb-4"
      />
       <button onClick={()=>setAchievementsTwo("")} className="text-black ml-3 bg-slate-400 rounded-lg">remove</button>

      </div>

      <div className="flex">
         <input
        type="text"
        value={achievementsThree}
        onChange={(e) => setAchievementsThree(e.target.value)}
        className="w-full bg-gray-700 text-white p-3 rounded mb-4"
      />
       <button onClick={()=>setAchievementsThree("")} className="text-black ml-3 bg-slate-400 rounded-lg">remove</button>

      </div>
      
      <button
        onClick={handleAchievementSave}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Save Achievement
      </button>
    </div>
  ) : (
    <div className="flex flex-col gap-2 mt-4">
      {achievementsOne && (
        <div className="bg-orange-500 text-white p-3 rounded-lg shadow-sm">
          {achievementsOne}
        </div>
      )}
      {achievementsTwo && (
        <div className="bg-orange-500 text-white p-3 rounded-lg shadow-sm">
          {achievementsTwo}
        </div>
      )}
      {achievementsThree && (
        <div className="bg-orange-500 text-white p-3 rounded-lg shadow-sm">
          {achievementsThree}
        </div>
      )}
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
      <div>
      <div className="text-white">
        <p className="mb-2"><span className="font-semibold">Monthly:</span> ₹ {monthlyPackage}</p>
        <p className="mb-2"><span className="font-semibold">Quarterly:</span> ₹ {quarterlyPackage}</p>
        <p className="mb-2"><span className="font-semibold">Yearly:</span> ₹ {yearlyPackage}</p>
      </div>
      <div className="bg-gray-700 mt-10  rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center">
         Coaching History
         </h2>
          <p className="flex ">Total Students : {studentsCoached} </p>
        </div>
      </div>
    )}
  </div>
 </div>

        
 <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full mx-auto mt-2">
      <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center">
        Availability Details
        <button
          onClick={() => setIsEditingAvailability(!isEditingAvailability)}
          className="ml-4 text-sm text-blue-400 hover:text-blue-600 underline">
          {isEditingAvailability ? "Cancel" : "Edit"}
        </button>
      </h2>
      <div className="mb-4">
        {isEditingAvailability ? (
          <div>
            <label className="block text-white mb-2">From Time:</label>
            <input
              type="number"
              min="0"
              max="23"
              value={convertTo24Hour(tempAvailability.fromTime)}
              onChange={(e) =>
                setTempAvailability({
                  ...tempAvailability,
                  fromTime: convertTo12Hour(e.target.value),
                })
              }
              className="w-full bg-gray-700 text-white p-3 rounded mb-4"
            />

            <label className="block text-white mb-2">To Time:</label>
            <input
              type="number"
              min="0"
              max="23"
              value={convertTo24Hour(tempAvailability.toTime)}
              onChange={(e) =>
                setTempAvailability({
                  ...tempAvailability,
                  toTime: convertTo12Hour(e.target.value),
                })
              }
              className="w-full bg-gray-700 text-white p-3 rounded mb-4"
            />

            <label className="block text-white mb-2">Working Days:</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tempAvailability.workingDays.includes(day)}
                      onChange={() => handleWorkingDaysChange(day)}
                      className="mr-2"
                    />
                    <span className="text-white">{day}</span>
                  </label>
                )
              )}
            </div>

            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2">
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
              Cancel
            </button>
          </div>
        ) : (
          <div className="text-white">
            <p className="mb-2">
              <span className="font-semibold">From Time:</span> {availability.fromTime}
            </p>
            <p className="mb-2">
              <span className="font-semibold">To Time:</span> {availability.toTime}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Working Days:</span> {availability.workingDays.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  
    
       {/* Additional Pictures Section */}
<div className="bg-gray-800 rounded-lg shadow-md p-6 w-full mx-auto mt-2">
  <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center">
    Additional Pictures
    <button
      onClick={() => setIsEditingPictures(!isEditingPictures)}
      className="ml-4 text-sm text-blue-400 hover:text-blue-600 underline"
    >
      {isEditingPictures ? "Cancel" : "Edit"}
    </button>
  </h2>
  
  {isEditingPictures ? (
    <div>
      <label className="block text-white mb-2">Select Images:</label>
      <div className="flex gap-4 mb-4">
        {/* Upload Input for Each Image */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative bg-gray-700 rounded-md overflow-hidden h-28 w-28">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, i)}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            {selectedImages[i] && (
              <img
                src={selectedImages[i]}
                alt={`Additional Image ${i}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handlePicturesSave}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Save Pictures
      </button>
    </div>
  ) : (
    <div className="flex gap-4 mt-4">
      {selectedImages.map((image, index) => (
        image ? (
          <div key={index} className="bg-gray-700 rounded-md overflow-hidden h-28 w-28">
            <img
              src={image}
              alt={`Displayed Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null
      ))}
    </div>
  )}
</div>


      </div>
    </div>
  );
}
