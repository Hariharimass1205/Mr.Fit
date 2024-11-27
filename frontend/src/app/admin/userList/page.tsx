"use client";

import Layout from "@/components/admin/layout";
import Topbar from "@/components/admin/topbar";
import { fetchDataList, handleBlockFun, handleUnBlockFun } from "@/service/adminApi";
import { useEffect, useState } from "react";

interface User {
  id: string;
  userName: string;
  phone: string;
  email: string;
  isBlocked: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataList();
        setUsers(data?.users || []);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const handleBlock = async (email: string) => {
    try {
      const result = await handleBlockFun(email);
      if (result) {
        setUsers((prevUsers) =>
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
      if (result) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, isBlocked: false } : user
          )
        );
      }
    } catch (error) {
      console.log("Error unblocking user:", error);
    }
  };

  return (
    <Layout>
        <div className="flex justify-between shadow-lg items-center p-4 bg-white  rounded-3xl">
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
        <div className="flex items-center space-x-2">          
        </div>
      </div>
    </div>
      <h1 className="text-4xl font-bold text-black mt-10 mb-6 text-center">
        User Management
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {users.map((user,index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-4 border border-gray-300 hover:shadow-slate-700 transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold text-black mb-4">{user.userName.toLocaleUpperCase()}</div>
                <div className="text-gray-700">Phone : {user.phone}</div>
                <div className="text-gray-700 mb-4">Email : {user.email}</div>
              </div>
              <div className="flex justify-center">
                {!user.isBlocked ? (
                  <button
                    onClick={() => handleBlock(user.email)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnBlock(user.email)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Unblock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">Loading users...</p>
      )}
    </Layout>
  );
};

export default UserList;
