"use client";

import Layout from "@/components/admin/layout";
import Topbar from "@/components/admin/topbar";
import { changeCoachStatus, fetchDataList, handleBlockFun, handleUnBlockFun } from "@/service/adminApi";
import { useEffect, useState } from "react";

interface Coach {
  id: string;
  userName: string;
  phone: string;
  quizScore: string;
  isBlocked: boolean;
  email: string;
  isApproved: string;
}

const CoachList: React.FC = () => {
  const [coach, setCoach] = useState<Coach[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataList();
        setCoach(data?.coaches || []);
      } catch (err) {
        setError("Failed to fetch coaches. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const handleBlock = async (email: string) => {
    try {
      const result = await handleBlockFun(email);
      setCoach((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, isBlocked: true } : user
        )
      );
    } catch (error) {
      console.log("Error blocking user:", error);
    }
  };

  const handleUnBlock = async (email: string) => {
    try {
      const result = await handleUnBlockFun(email);
      setCoach((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, isBlocked: false } : user
        )
      );
    } catch (error) {
      console.log("Error unblocking user:", error);
    }
  };

  const handleApprovalChange = async (email: string, newStatus: string) => {
    setCoach((prevUsers) =>
      prevUsers.map((user) =>
        user.email === email ? { ...user, isApproved: newStatus } : user
      )
    );
    try {
      const result = await changeCoachStatus(email,newStatus)
      if(result){
        console.log(`Approval status for ${email} updated to: ${newStatus}`);
      }
    } catch (error) {
      setError("Failed to set status of coaches. Please try again later.");
    }
  };

  return (
    <Layout>
      <Topbar />
      <h1 className="text-4xl font-bold text-black mt-10 mb-6 text-center">
        Coach Management
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : coach.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {coach.map((coach,index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-300 hover:shadow-slate-700 transition-shadow duration-300"
            >
              <div className="flex flex-col items-center ">
                <div className="text-3xl font-semibold text-black mb-4">
                  {coach.userName.toLocaleUpperCase()}
                </div>
                <div className="text-gray-700">
                  QuizScore :<span className="ml-4 ">{coach.quizScore}</span>
                </div>
                <div  className="text-gray-700">
                  Phone :<span className="ml-4 ">{coach.phone}</span>
                </div>
                
                <div className="text-gray-700 mb-4">
                  Email :<span className="ml-4 ">{coach.email}</span>
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <select
                  value={coach.isApproved}
                  onChange={(e) => handleApprovalChange(coach.email, e.target.value)}
                  className="bg-lime-400 w-32 shadow-lg items-center pl-3 text-black font-medium p-2 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Accept">Accept</option>
                  <option value="Reject">Reject</option>
                </select>
              </div>
              <div className="flex justify-center">
                {!coach.isBlocked ? (
                  <button
                    onClick={() => handleBlock(coach.email)}
                    className="bg-red-500 shadow-lg hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnBlock(coach.email)}
                    className="bg-green-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Unblock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">Loading coaches...</p>
      )}
    </Layout>
  );
};

export default CoachList;
