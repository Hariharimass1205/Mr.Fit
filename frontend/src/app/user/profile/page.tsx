"use client"
import React, { useState, useEffect } from "react";
import { fetchDataUserDetails } from "@/service/userApi";
import { useRouter } from "next/navigation";
import { User, Coach } from "../../../../utils/types";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [coach, setCoach] = useState<Coach>();
  const [inputs, setInputs] = useState({
    water: "",
    calories: "",
    protein: "",
    steps: "",
  });

  const [dailyData, setDailyData] = useState({
    water: "0 L",
    calories: "0 kcal",
    protein: "0 g",
    steps: "0 steps",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableUserDetails, setEditableUserDetails] = useState({
    email: "",
    Name: "",
    phone: "",
    weight: "",
    height: "",
  });

  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user") as string);
        console.log(userFromLocalStorage,"*****************")
        const { coach, user } = await fetchDataUserDetails(userFromLocalStorage._id, userFromLocalStorage.coachId);
        setUser(user);
        setCoach(coach[0]);
        setEditableUserDetails({
          email: user.email,
          Name: user.userName,
          phone: user.phone,
          weight: user.weight,
          height: user.height,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);
  console.log(coach,"^^^&&&&&&&&&*********")

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
      console.log(file,"file")
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setDailyData(inputs);
  };

  const handleEditUserDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const saveUserDetails = () => {
    setIsEditing(false);
   
  };

  return (
    <div className="bg-cover text-black bg-center min-h-screen" style={{ backgroundImage: 'url(/gym-background.jpg)' }}>
      <button
        className="mb-4 m-3 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={() => router.back()}
      >
        Back
      </button>
      <img
                src={user?.profileImage}
                alt="User Profile"
                className="w-48 h-48 object-cover rounded-full"
              />
      <div className="p-10">
        <div className="bg-cover text-black bg-center min-h-screen" style={{ backgroundImage: "url(/Weightgain/pexels-ivan-samkov-4162494.jpg)" }}>
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

       <div className="flex">
          <div className="mt-4 bg-white p-6 ml-8 rounded-lg shadow">
            <div className="flex items-center gap-4">

              <div>
                <h3 className="text-xl font-bold">Your Details</h3>
                {isEditing ? (
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="Name"
                      value={editableUserDetails.Name}
                      onChange={handleEditUserDetails}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                    />
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editableUserDetails.email}
                      onChange={handleEditUserDetails}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                    />
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={editableUserDetails.phone}
                      onChange={handleEditUserDetails}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                    />
                    <label>Weight:</label>
                    <input
                      type="text"
                      name="weight"
                      value={editableUserDetails.weight}
                      onChange={handleEditUserDetails}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                    />
                    <label>Height:</label>
                    <input
                      type="text"
                      name="height"
                      value={editableUserDetails.height}
                      onChange={handleEditUserDetails}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                    />
                    <button
                      onClick={saveUserDetails}
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Name: {editableUserDetails.Name}</p>
                    <p>Email: {editableUserDetails.email}</p>
                    <p>Phone: {editableUserDetails.phone}</p>
                    <p>Weight: {editableUserDetails.weight}kg</p>
                    <p>Height: {editableUserDetails.height}cm</p>
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
             {/* Diet Chart */}
        <div className="mt-4 bg-white p-6 rounded-lg ml-5 w-full shadow">
          <h3 className="text-xl w-56 font-bold mb-4">Diet Chart</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Day 1', 'Day 2', 'Day 3'].map((day, idx) => (
              <div key={idx} className="border p-4 rounded">
                <h4 className="font-bold">{day}</h4>
                <p>Healthy diet details for Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, tempore harum voluptas unde dolorem ut minus nobis quis dicta arum suscipit ipsam nostrum quos, doloremque, dicta veritatis soluta nobis qui esse, ipsa maxime. Dicta illo aliquam harum dolorem! Asperiores!{day.toLowerCase()}.</p>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Coaching Details */}
        <div className="m-8 bg-white p-10  rounded-lg shadow">
          <div className="flex items-center gap-4">
          {/* <img
                src={coach?.userId?.profileImage}
                alt="Img"
                className="w-48x h-48 object-cover"
              /> */}
            <div>
              <h3 className="text-xl font-bold">Your Coaching Details</h3>
              <p>Package: 3 Months</p>
              <p>Coach: {coach?.name}</p>
              <p>Date of Enroll: 23 Aug</p>
              <p>Expiring Date: 23 Oct</p>
            </div>
          </div>
        </div>



        </div>
      </div>
    </div>
  );
}
