"use client";

import { changeProfilePic, fetchCoachData, savePackageBackend, saveProfiletoBackend, updateDiet } from "@/service/coachApi";
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
    height: 0,
    weight: 0,
    noOfStudentsCoached: 0,
    Students: [
      {
        type: new Types.ObjectId(),
      },
    ],
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
  const [editingStudentId, setEditingStudentId] = useState<Student | null>();
  const [dietEdit, setDietEdit] = useState({ Meal1: '', Meal2: '', Meal3: '' });
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchCoachDatafn = async () => {
      try {
        const response = await fetchCoachData();
        setCoach(response.coach);
        setName(response?.coach.name);
        setStudents(response.coach.Students)
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
   console.log(students,"pppppppppp")
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


  const handleViewClick = (student:any) => {
    setViewingStudent(student);
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


  // diet process

  const handleEditClick = (student:any) => {
    setEditingStudentId(student._id);
    setDietEdit(student.Diet || { Meal1: '', Meal2: '', Meal3: '' });
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setDietEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (studentId:any) => {
    // Here you would call the API to update the student's Diet field
    console.log('Saving diet for student:', studentId, dietEdit);
    const res = await updateDiet(studentId,dietEdit)
    if(res){
      toast.success("successfully Diet Edited")
    }
    setEditingStudentId(null);
  };

  const handleCancel = () => {
    setEditingStudentId(null);
    setDietEdit({ Meal1: '', Meal2: '', Meal3: '' });
  };
  console.log(students,"ppppppppp")
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
      <div className="text-white">
        <p className="mb-2"><span className="font-semibold">Monthly:</span> ₹ {monthlyPackage}</p>
        <p className="mb-2"><span className="font-semibold">Quarterly:</span> ₹ {quarterlyPackage}</p>
        <p className="mb-2"><span className="font-semibold">Yearly:</span> ₹ {yearlyPackage}</p>
      </div>
    )}
  </div>
 </div>

        
  <div className="bg-gray-700  rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center">
         Coaching History
         </h2>
          <p className="flex ">Total Students : {studentsCoached} </p>
        </div>
    
        {/* Buttons */}
        <div className="bg-gray-700 w-max rounded-lg shadow-md p-6">
    <h2 className="text-2xl mb-4 font-extrabold text-red-600 flex justify-between items-center">
    Students List
    </h2>
   <div>
    <table className="table-auto w-max text-left text-sm text-gray-300">
      <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
        <tr>
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Phone</th>
          <th className="px-4 py-2">District</th>
          <th className="px-4 py-2">Enrolled Duration</th>
          <th className="px-4 py-2">Enrolled Date</th>
          <th className="px-4 py-2">Edit Diet</th>
          <th className="px-4 py-2">View Goal</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={student._id} className="border-b border-gray-600 hover:bg-gray-600">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{student?.userName}</td>
            <td className="px-4 py-2">{student?.phone}</td>
            <td className="px-4 py-2">{student?.district}</td>
            <td className="px-4 py-2">{student?.enrolledDuration}</td>
            <td className="px-4 py-2">{student?.enrolledDate}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleEditClick(student)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </td>
            <td className="px-4 py-2 "><button
                onClick={() => handleViewClick(student)}
                className=  "bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                   View
                </button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    {viewingStudent && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-gray-700 rounded-lg p-6 w-full max-w-lg">
      <h3 className="text-xl font-bold text-white mb-4">
        View todays diet for {viewingStudent?.userName}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Water Goal</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.Water != null ? String(viewingStudent?.Diet?.Goal?.Water) : "Not added"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Calories Goal</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.Calories != null ? String(viewingStudent?.Diet?.Goal?.Calories) : "Not added"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Protein Goal</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.Protein != null ? String(viewingStudent?.Diet?.Goal?.Protein) : "Not added"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Steps Goal</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.Steps != null ? String(viewingStudent?.Diet?.Goal?.Steps) : "Not added"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Carbohydrates Goal</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.Carbohydrates != null ? String(viewingStudent?.Diet?.Goal?.Carbohydrates) : "Not added"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Fats Goal</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.Fats != null ? String(viewingStudent?.Diet?.Goal?.Fats) : "Not added"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Fiber Goal</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.Fiber != null ? String(viewingStudent?.Diet?.Goal?.Fiber) : "Not added"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Sleep Time Goal (hours)</label>
          <p className="text-white">{viewingStudent?.Diet?.Goal?.SleepTime != null ? String(viewingStudent?.Diet?.Goal?.SleepTime) : "Not added"}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => setViewingStudent(null)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



    </div>

    {/* Modal for Diet Editing */}
    {editingStudentId && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-bold text-white mb-4">Edit Diet for {editingStudentId?.userName}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Meal 1</label>
            <textarea
              name="Meal1"
              value={dietEdit.Meal1 || ""}
              onChange={handleInputChange}
              className="block w-full bg-gray-800 text-white px-3 py-2 rounded"
              placeholder="Enter Meal 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Meal 2</label>
            <textarea
              name="Meal2"
              value={dietEdit.Meal2 || ""}
              onChange={handleInputChange}
              className="block w-full bg-gray-800 text-white px-3 py-2 rounded"
              placeholder="Enter Meal 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Meal 3</label>
            <textarea
              name="Meal3"
              value={dietEdit.Meal3 || ""}
              onChange={handleInputChange}
              className="block w-full bg-gray-800 text-white px-3 py-2 rounded"
              placeholder="Enter Meal 3"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave(editingStudentId)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    )}
  </div>
      </div>
    </div>
  );
}
