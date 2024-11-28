"use client";

import Layout from "@/components/admin/layout";
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
      if(result){
        setCoach((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, isBlocked: true } : user
          )
        );
      }
    } catch (error) {
      console.log("Error blocking user:", error);
    }
  };

  const handleUnBlock = async (email: string) => {
    try {
      const result = await handleUnBlockFun(email);
      if(result){
        setCoach((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, isBlocked: false } : user
          )
        );
      }
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
      const result = await changeCoachStatus(email, newStatus);
      if(result){
        console.log(`Approval status for ${email} updated to: ${newStatus}`);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to set status of coaches. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="flex  justify-between shadow-lg items-center p-4 bg-white rounded-3xl">
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Search" 
            className="px-4 py-2 rounded-full border border-gray-300" 
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span role="img" aria-label="Notifications">🔔</span>
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-black mt-10 mb-6 text-center">
        Coach Management
      </h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : coach.length > 0 ? (
        <div className="text-black overflow-x-auto px-4 py-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Quiz Score</th>
                <th className="border px-4 py-2">Approval</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coach.map((coach, index) => (
                <tr key={index} className= "text-center hover:bg-gray-100">
                  <td className="border px-4 py-2">{coach.userName}</td>
                  <td className="border px-4 py-2">{coach.phone}</td>
                  <td className="border px-4 py-2">{coach.email}</td>
                  <td className="border px-4 py-2">{coach.quizScore}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={coach.isApproved}
                      onChange={(e) => handleApprovalChange(coach.email, e.target.value)}
                      className="bg-lime-400 w-32 shadow-lg items-center pl-3 text-black font-medium p-2 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    {!coach.isBlocked ? (
                      <button
                        onClick={() => handleBlock(coach.email)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnBlock(coach.email)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700">Loading coaches...</p>
      )}
    </Layout>
  );
};

export default CoachList;
