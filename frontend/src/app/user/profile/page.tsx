"use client";
import React, { useState, useEffect } from "react";
import { fetchDataUserDetails, updateUserProfile } from "@/service/userApi";
import { useRouter } from "next/navigation";
import { User, Coach } from "../../../../utils/types";
import { FieldError, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  const calculateExpirationDate = (enrolledDate: string, duration: string): string => {
    const startDate = new Date(enrolledDate);
    switch (duration) {
      case "monthlyPackage":
        startDate.setMonth(startDate.getMonth() + 1);
        break;
      case "quarterlyPackage":
        startDate.setMonth(startDate.getMonth() + 3);
        break;
      case "yearlyPackage":
        startDate.setFullYear(startDate.getFullYear() + 1);
        break;
      default:
        break;
    }
    return startDate.toLocaleDateString("en-US"); // Formats date as MM/DD/YYYY
  };

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
      console.log(data,"------")
      const savedData = await updateUserProfile(data)
      if(savedData){
      setUser(savedData)
       setIsEditing(false);
       toast.success("successfully updated your profile")
      }
     } catch (error) {
      console.log(error,"error at editng user profile")
     }
  };

  return (
    <div className="bg-cover text-black bg-center min-h-screen">
         <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button
        className="mb-4 m-3 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={() => router.back()}
      >
        Back
      </button>

      {/* Package Status */}
      {packageExpired ? (
        <div className="text-center bg-red-500 text-white p-4 rounded-lg font-bold">
          Your package expired on {expirationDate}. Please renew to continue.
        </div>
      ) : (
        <div className="text-center bg-green-500 text-white p-4 rounded-lg font-bold">
          Your package is active until {expirationDate}. Keep progressing!
        </div>
      )}

      <div className="p-10">
        <div
          className="bg-cover text-black bg-center min-h-screen"
          style={{ backgroundImage: "url(/Weightgain/pexels-ivan-samkov-4162494.jpg)" }}
        >
          <div className="p-6">
            <div className="p-4 bg-white rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-semibold mb-4">Monitor Your Progress</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                  <h2 className="text-lg font-medium mb-2">Daily Summary</h2>
                  <p>Water: {dailyData.water}</p>
                  <p>Calories: {dailyData.calories}</p>
                  <p>Protein: {dailyData.protein}</p>
                  <p>Steps: {dailyData.steps}</p>
                </div>
                <div className="p-4 border rounded">
                  <h2 className="text-lg font-medium mb-2">Fill your Tracking details</h2>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Water (L):</label>
                      <input
                        type="number"
                        name="water"
                        value={inputs.water}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Calories (kcal):</label>
                      <input
                        type="number"
                        name="calories"
                        value={inputs.calories}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Protein (g):</label>
                      <input
                        type="number"
                        name="protein"
                        value={inputs.protein}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Steps:</label>
                      <input
                        type="number"
                        name="steps"
                        value={inputs.steps}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <button
                      onClick={handleSave}
                      className="mt-2 w-full bg-green-500 text-white py-1 rounded text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Details Section */}
          <div className="mt-4 bg-white p-6 ml-8 rounded-lg shadow">
  <div className="flex items-center gap-4">
    <div>
      <h3 className="text-xl font-bold">Your Details</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label>Name:</label>
            <input
              id="Name"
              defaultValue={user?.userName}
              type="text"
              {...register("Name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
           {errors.Name && <p className="text-red-500">{(errors.Name as FieldError)?.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label>Email:</label>
            <input
              type="email"
              defaultValue={user?.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {errors.email && <p className="text-red-500">{(errors.email as FieldError)?.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label>Phone:</label>
            <input
             defaultValue={user?.phone}
              type="text"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {errors.phone && <p className="text-red-500">{(errors.phone as FieldError)?.message}</p>}
          </div>

          {/* DOB */}
          <div>
            <label>Date of Birth:</label>
            defaultValue={user?.DOB}
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {errors.dob && <p className="text-red-500">{(errors.dob as FieldError)?.message}</p>}
          </div>

          {/* State */}
          <div>
            <label>State:</label>
            <input
              type="text"
              defaultValue={user?.state}
              {...register("state", { required: "State is required" })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {errors.state && <p className="text-red-500">{(errors.state as FieldError)?.message}</p>}
          </div>

          {/* District */}
          <div>
            <label>District:</label>
            <input
             defaultValue={user?.district}
              type="text"
              {...register("district", { required: "District is required" })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {errors.district && <p className="text-red-500">{(errors.district as FieldError)?.message}</p>}
          </div>

          {/* Pincode */}
          <div>
            <label>Pincode:</label>
            <input
             defaultValue={user?.pincode}
              type="text"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Pincode must be 6 digits",
                },
              })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {errors.pincode && <p className="text-red-500">{(errors.pincode as FieldError)?.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label>Address:</label>
            <input
              type="text"
              defaultValue={user?.address}
              {...register("address", { required: "Address is required" })}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {errors.address && <p className="text-red-500">{(errors.address as FieldError)?.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Save
          </button>
        </form>
      ) : (
        <div>
          {/* Display user details when not editing */}
          <p>Name: {user?.userName}</p>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phone}</p>
          <p>DOB: {user?.DOB}</p>
          <p>State: {user?.state}</p>
          <p>District: {user?.district}</p>
          <p>Pincode: {user?.pincode}</p>
          <p>Address: {user?.address}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Edit Details
          </button>
        </div>
      )}

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
    </div>
  </div>
</div>


          {/* Coaching Details */}
          <div className="m-8 bg-white p-10 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">Your Coaching Details</h3>
                <p>Package: {user?.enrolledDuration}</p>
                <p>Package Price: ${user?.enrolledPackage}</p>
                <a href={`/user/coachDetails?coach=${coach?._id}`}>
                  Coach: <span className="text-blue-500">{coach?.name}</span>
                </a>
                <p>Date of Enroll: {user?.enrolledDate}</p>
                <p>Expiration Date: {expirationDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
