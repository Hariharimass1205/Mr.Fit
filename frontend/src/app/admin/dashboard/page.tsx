
"use client";

import Layout from "@/components/admin/layout"; 
import { fetchDataList } from "@/service/adminApi";
import { useEffect, useState } from "react";


const Dashboard: React.FC = () => {
  const [user,setUser] = useState(0)
  const [coach,setCoach] = useState(0)
  const [enrolledUsersList , setEnrolledUsersList] = useState(0)
  const [pending,setPending] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataList();
        setUser(data?.userList)
        setPending(data?.pendingApprovalsList)
        setEnrolledUsersList(data?.enrolledUsers)
        setCoach(data?.coachList)
      } catch (error) {
        console.log("Error fetching user list:", error);
      }
    };
    fetchData();
  }, []); 
  return (
    <>
    <Layout >
      <h1 className="text-5xl  text-black font-semibold mt-10 mb-8 ">Dashboard</h1>
      {/* Dashboard content */}
      <div className="grid   grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg  text-black font-semibold">Total Clients : {user}</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg  text-black font-semibold">Total Coaches : {coach}</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg  text-black font-semibold">Waiting for aprovals : {pending}</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg  text-black font-semibold">Enrolled Clients : {enrolledUsersList}</h3>
        </div>
      </div>
      </Layout>
     
      </> 
  );
};

export default Dashboard;
