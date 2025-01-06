"use client";
import React, { useState, useEffect } from "react";
import { fetchDataUserDetails, submitDietGoal, updateUserProfile } from "@/service/userApi";
import { useRouter } from "next/navigation";
import { User, Coach } from "../../../../utils/types";
import { FieldError, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { calculateExpirationDate } from "../../../../utils/expirationFinder";
import banner from '../../../../public/assets/backGround/pexels-alesiakozik-7289250.jpg'
import { changeProfilePic } from "@/service/coachApi";

interface IPayment {
  amount: number;
  transactionDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  transactionId?: string; // Optional
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [coach, setCoach] = useState<Coach | null>(null);
  const [payment,setPayment] = useState<any | null>(null)
  const [inputs, setInputs] = useState({
    water: 0,
    calories: 0,
    protein: 0,
    steps: 0,
    Carbohydrates:0,
    Fats:0,
    Fiber:0,
    SleepTime:0
  });

  const [packageExpired, setPackageExpired] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [dailyData, setDailyData] = useState({
    water: 0,
    calories: 0,
    protein: 0,
    steps: 0,
    Carbohydrates:0,
    Fats:0,
    Fiber:0,
    SleepTime:0
  });

  const currentHour = new Date().getHours();
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<string>("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user") as string);
        const {user,coach,payment} = await fetchDataUserDetails(userFromLocalStorage._id, userFromLocalStorage.coachId);
        setUser(user);
        setCoach(coach[0]);
        setPayment(payment)
      if(user?.enrolledDate && user?.enrolledDuration) {
          const calculatedExpiration = calculateExpirationDate(user.enrolledDate, user.enrolledDuration);
          setExpirationDate(calculatedExpiration);
          const today = new Date();
          setPackageExpired(new Date(calculatedExpiration) < today);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [dailyData,inputs]);
console.log(payment)
   const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(URL.createObjectURL(file)); 
              const res = await changeProfilePic(file)
              toast.success("profile pictured changed successfuly")
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleDietSave = async () => {
    setDailyData(inputs);
    if(user?._id){
    const res = await submitDietGoal(user._id,inputs)
    if(res){
      toast.success("successfully submitted the diet goal")
    }
    }
  };

  const onSubmit = async (data: any) => {
    try {
     
      const savedData = await updateUserProfile(data);
      if (savedData) {
        setUser(savedData);
        setIsEditing(false);
        toast.success("Successfully updated your profile");
      }
    } catch (error) {
      console.log(error, "Error editing user profile");
    }
  };

  return (
    <div className="min-h-screen bg-black-50 py-10 px-5">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Back Button */}

      <div className="mb-4 justify-items-end ">
        <button
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
        >
          &larr; Back
        </button>
      </div>
      {/* Rest of the component */}
      <div
        className="h-96 w-full flex relative rounded-xl bg-cover bg-center pt-40"
        style={{ backgroundImage: `url(${banner.src})` }}
      >
        {/* Profile Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full overflow-hidden h-48 w-48">
          {user?.profileImage || newProfileImage ? (
            <img
              src={user?.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center mt-6">
          <h1 className="text-7xl mb-4 text-white font-bold">{user?.userName}</h1>
          <p className="text-sm text-white">{user?.state}</p>
        </div>
      </div>


      {/* Package Status */}
      <section className="mb-8 ">
        <div
          className={`text-center p-4 rounded-md font-bold text-white ${
            packageExpired ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {packageExpired
            ? `Your package expired on ${expirationDate}. Please renew to continue.`
            : `Your package is active until ${expirationDate}. Keep progressing!`}
        </div>
      </section>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 text-black lg:grid-cols-2 gap-8">
        {/* Progress Tracker */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 underline">Submit Your Progress</h2>
          <div className="grid  grid-cols-1 gap-4">
            <div className="border bg-cyan-200 rounded-lg p-4 ">
              <h3 className="font-medium mb-2  ">Daily Summary</h3>
              <p>Water: {`${user?.Diet?.Goal?.Water || "0"}`}</p>
      <p>Calories: {`${user?.Diet?.Goal?.Calories|| "0"}`}</p>
      <p>Protein: {`${user?.Diet?.Goal?.Protein || "0"}`}</p>
      <p>Steps:{`${user?.Diet?.Goal?.Steps || "0"}`}</p>
      <p>Carbohydrates: {`${user?.Diet?.Goal?.Carbohydrates || "0"}`}</p>
      <p>Fats:{`${user?.Diet?.Goal?.Fats || "0"}`}</p>
      <p>Fiber:{`${user?.Diet?.Goal?.Fiber || "0"}`}</p>
      <p>SleepTime: {`${user?.Diet?.Goal?.SleepTime || "0"}`}</p>
            </div>
            <div className="border bg-cyan-200 p-4 rounded-md">
  <h3 className="font-medium mb-4 text-lg">Update Daily Details</h3>
  <form className="grid grid-cols-2 gap-4 mb-6">
    {[
      { label: "Water (L):", name: "water", value: inputs.water },
      { label: "Calories (kcal):", name: "calories", value: inputs.calories },
      { label: "Protein (g):", name: "protein", value: inputs.protein },
      { label: "Steps:", name: "steps", value: inputs.steps },
      { label: "Carbohydrates:", name: "Carbohydrates", value: inputs.Carbohydrates },
      { label: "Fats:", name: "Fats", value: inputs.Fats },
      { label: "Fiber:", name: "Fiber", value: inputs.Fiber },
      { label: "SleepTime:", name: "SleepTime", value: inputs.SleepTime },
    ].map((field) => (
      <div key={field.name} className="flex flex-col">
        <label className="font-medium text-sm mb-1">{field.label}</label>
        <input
          type="number"
          name={field.name}
          value={field.value}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
    ))}
    <div className="col-span-2 flex justify-center">
      {currentHour >= 21?<button
        type="button"
        onClick={handleDietSave}
        className="bg-green-500 hover:bg-green-700 text-white py-1.5 px-3 rounded w-auto text-sm"
      >
        Save
      </button>:
      <h2>Submit your todays diet goal after "9:00 pm"</h2>
      }
      
    </div>
  </form>
  <div>
    <label className="text-sm">Notes:</label>
    <small className="text-black text-xs block">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ut voluptatibus eaque blanditiis ex ea dolore laboriosam incidunt? Consequuntur, re laboriosam incidunt? re laboriosam incidunt? exercitationem!
    </small>
  </div>
</div>


          </div>
        </div>

        {/* User Details */}
        <div className="bg-white  shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 underline">Your Details</h2>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { label: "Name", name: "Name", type: "text", defaultValue: user?.userName },
                { label: "Phone", name: "phone", type: "text", defaultValue: user?.phone },
                { label: "Date of Birth", name: "dob", type: "date", defaultValue: user?.DOB },
                { label: "State", name: "state", type: "text", defaultValue: user?.state },
                { label: "District", name: "district", type: "text", defaultValue: user?.district },
                { label: "Pincode", name: "pincode", type: "text", defaultValue: user?.pincode },
                { label: "Address", name: "address", type: "text", defaultValue: user?.address },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium mb-1">{field.label}:</label>
                  <input
                    type={field.type}
                    defaultValue={field.defaultValue}
                    {...register(field.name, { required: `${field.label} is required` })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">
                      {(errors[field.name] as FieldError)?.message}
                    </p>
                  )}
                </div>
              ))}
               {/* Profile Picture Change */}
      <div className="mt-4">
        <label className="block">Change Profile Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="w-full mt-2 border border-gray-300 p-2 rounded"
        />
      </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              >
                Save Details
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <p>Name: {user?.userName}</p>
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone}</p>
              <p>Date of Birth: {user?.DOB}</p>
              <p>State: {user?.state}</p>
              <p>District: {user?.district}</p>
              <p>Pincode: {user?.pincode}</p>
              <p>Address: {user?.address}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Edit Details
              </button>
            </div>
          )}
            <div className="grid text-black  grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-cyan-200 shadow-md rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">Your Coaching Details</h2>
  <p>Package: {user?.enrolledDuration}</p>
  <p>Package Price: ${user?.enrolledPackage}</p>
  <a href={`/user/coachDetails?coach=${coach?._id}`}>
    <span className="text-blue-500 underline">Coach: {coach?.name}</span>
  </a>
  <p>Date of Enroll: {user?.enrolledDate}</p>
  <p>Expiration Date: {expirationDate}</p>
  <p>Slot Timing: {user?.slotTaken}</p>

  {payment?.length?<div>
  <h2 className="text-xl font-semibold mb-2 mt-5">Your Payment Details</h2>
      <div className="mt-2">
      {(payment ?? []).map((pay:any, index:number) => (
      <div key={index} className="border-b border-gray-300 pb-2 mb-2">
    <p>Amount: ${pay.amount}</p>
    <p>Transaction Date: {new Date(pay.transactionDate).toLocaleDateString()}</p>
    <p>Status: {pay.paymentStatus}</p>
    {pay.transactionId && (
      <p>Transaction ID: {pay.transactionId}</p>
    )}
  </div>
))}
      </div> 
</div>:<h1>No Payment Details</h1>}
</div>

        <div className="bg-cyan-200 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Diet Plan</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Meal 1: {user?.Diet?.Meal1 || "No details available"}</li>
            <li>Meal 2: {user?.Diet?.Meal2 || "No details available"}</li>
            <li>Meal 3: {user?.Diet?.Meal3 || "No details available"}</li>
          </ul>
        </div>
      </div>
        </div>
      </div>

      {/* Coaching and Diet Section */}
    
    </div>
   
  );
}