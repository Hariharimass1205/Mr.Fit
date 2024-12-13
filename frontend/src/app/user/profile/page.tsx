"use client"
import { fetchData, fetchDataUserDetails } from "@/service/userApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {User,Coach} from "../../../../utils/types"

export default function Dashboard() {
  const router = useRouter();
  const [user,setUser] = useState<User>()
  const [coach,setCoach] = useState<Coach>()



useEffect(() => {
    async function fetchuserData(){
    try {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user") as string)
      const {coach,user} = await fetchDataUserDetails(userFromLocalStorage._id,userFromLocalStorage.coachId)
      setUser(user)
      setCoach(coach[0])
    } catch (error) {
      console.log(error)
    }
  }
  fetchuserData()
},[])
 console.log(user,"user..............")
 console.log(coach,"coach..........")


  return (
    <div className="bg-cover text-black bg-center min-h-screen" style={{ backgroundImage: 'url(/gym-background.jpg)' }}>
      <div className="p-6">
        <div className="flex ">
        <button 
          className="mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => router.back()}
        >
          Back
        </button>
        <h1 className="text-6xl w-full font-bold ml-90 text-white text-center">Monitor Your Progress</h1>
        </div>
        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            {['25/50kg', '20/25kg', '35/50kg', '25/50kg'].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4">
                <span>{item}</span>
                <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${(parseInt(item) / parseInt(item.split('/')[1])) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Today's Workout Goal</h2>
            <div className="grid grid-cols-3 gap-2">
              {['+', '-', '+', '-'].map((sign, idx) => (
                <div key={idx} className="text-center text-xl border border-gray-300 rounded p-4">
                  {sign}
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded">Start Workout</button>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
          <img
                src={user?.profileImage}
                alt="Img"
                className="w-48 h-48 object-cover"
              />
            <div>
              <h3 className="text-xl font-bold">Your Details</h3>
              {/* //<p>Location: {user.}</p> */}
              <p>Gender: Male</p>
              <p>Email: liston@gmail.com</p>
              <p>Phone: 98877 78944</p>
              <p>DOB: 23 Aug</p>
              <p>Weight: 88kg | Height: 178cm</p>
              <p>Password: xxxxxxx</p>
            </div>
          </div>
        </div>

        {/* Diet Chart */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Diet Chart</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Day 1', 'Day 2', 'Day 3'].map((day, idx) => (
              <div key={idx} className="border p-4 rounded">
                <h4 className="font-bold">{day}</h4>
                <p>Healthy diet details for {day.toLowerCase()}.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coaching Details */}
        <div className="mt-8 bg-white p-6  rounded-lg shadow">
          <div className="flex items-center gap-4">
          <img
                src={coach?.userId?.profileImage}
                alt="Img"
                className="w-48x` h-48 object-cover"
              />
            <div>
              <h3 className="text-xl font-bold">Your Coaching Details</h3>
              <p>Package: 3 Months</p>
              <p>Coach: {coach?.name}</p>
              <p>Date of Enroll: 23 Aug</p>
              <p>Expiring Date: 23 Oct</p>
            </div>
          </div>
        </div>

        {/* Progress Graph */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Progress Graph</h3>
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            {/* Placeholder for graph */}
            <p>Graph will display here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
