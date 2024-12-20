"use client";
import React, { useState, useEffect } from "react";
import { fetchDataUserDetails, updateUserProfile } from "@/service/userApi";
import { useRouter } from "next/navigation";
import { User, Coach } from "../../../../utils/types";
import { FieldError, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { calculateExpirationDate } from "../../../../utils/expirationFinder";
import banner from '../../../../public/assets/backGround/pexels-alesiakozik-7289250.jpg'
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [coach, setCoach] = useState<Coach | null>(null);
  const [inputs, setInputs] = useState({
    water: "",
    calories: "",
    protein: "",
    steps: "",
  });

  const [packageExpired, setPackageExpired] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [dailyData, setDailyData] = useState({
    water: "0 L",
    calories: "0 kcal",
    protein: "0 g",
    steps: "0 steps",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user") as string);
        const { coach, user } = await fetchDataUserDetails(userFromLocalStorage._id, userFromLocalStorage.coachId);
        setUser(user);
        setCoach(coach[0]);

        if (user?.enrolledDate && user?.enrolledDuration) {
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
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setDailyData(inputs);
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(data, "------");
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

      {/* Header Section */}
      <header className="flex justify-between items-center bg-cyan-400 text-white p-5 rounded-md mb-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="bg-white-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.back()}
        >
          Back
        </button>
       
      </header>
      <Image 
    src={banner}
    alt="Dashboard Banner" 
    className="w-full h-80 object-cover rounded-md mb-4"
  />
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
              <h3 className="font-medium mb-2 ">Daily Summary</h3>
              <p>Water: {dailyData.water}</p>
              <p>Calories: {dailyData.calories}</p>
              <p>Protein: {dailyData.protein}</p>
              <p>Steps: {dailyData.steps}</p>
            </div>
            <div className="border bg-cyan-200 p-4 rounded-md">
              <h3 className="font-medium mb-2">Update Daily Details</h3>
              <form className="space-y-5 mb-10">
                {[
                  { label: "Water (L):", name: "water", value: inputs.water },
                  { label: "Calories (kcal):", name: "calories", value: inputs.calories },
                  { label: "Protein (g):", name: "protein", value: inputs.protein },
                  { label: "Steps:", name: "steps", value: inputs.steps },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-medium mb-1">{field.label}</label>
                    <input
                      type="number"
                      name={field.name}
                      value={field.value}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded w-auto"
                >
                  Save
                </button>
              </form>
              <label>Notes:</label>
              <small className="text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ut voluptatibus eaque blanditiis ex ea dolore laboriosam incidunt? Consequuntur, re laboriosam incidunt? re laboriosam incidunt? exercitationem!</small>
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
                { label: "Email", name: "email", type: "email", defaultValue: user?.email },
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
          <a href={`/user/coachDetails?coach=${coach?._id}`} >
            <span className="text-blue-500 underline">Coach: {coach?.name}</span>
          </a>
          <p>Date of Enroll: {user?.enrolledDate}</p>
          <p>Expiration Date: {expirationDate}</p>
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