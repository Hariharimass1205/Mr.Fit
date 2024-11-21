"use client";

import Layout from "@/components/admin/layout";
import Topbar from "@/components/admin/topbar";
import { fetchDataList, handleBlockFun, handleUnBlockFun } from "@/service/adminApi";
import { useEffect, useState } from "react";

interface User {
  id: string; // Ensure this is unique in your backend API response
  userName: string;
  phone: string;
  email:string;
  isBlocked:boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State for users
  const [isBlockedBtn,setIsBlockedBtn] = useState(false)
  const [error, setError] = useState<string | null>(null); // Error handling
  const [message,setMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataList();
        console.log("Fetched users:", data?.users); 
        setUsers(data?.users || []);
      } catch (err: any) {
        console.log("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      }
    };
    fetchData();
  }, []); 

  const handleBlock = async (email: string) =>{
    console.log("block")
   try {
    const result = await handleBlockFun(email)
    if(result){
      setIsBlockedBtn(true)
    }
   } catch (error) {
    console.log("Error handling block users:", error);
   }
  }
    const handleunBlock = async (email: string) =>{
   try {
    console.log("unblock")
    const result = await handleUnBlockFun(email)
    if(result){
      setIsBlockedBtn(false)
    }
   } catch (error) {
    console.log("Error handling unblock users:", error);
   }
  }
  return (
    <Layout>
      <Topbar />
      <h1 className="text-5xl text-black font-semibold mt-10 mb-8">User List</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length > 0 ? (
        <table className="w-full text-black text-center  border-gray-300 mt-10">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-2xl">Name</th>
              <th className="border border-gray-300 p-2 text-2xl">Phone</th>
              <th className="border border-gray-300 p-2 text-2xl">Email</th>
              <th className="border border-gray-300 p-2 text-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
  <tr key={user.id} className="hover:bg-gray-100">
    <td className="border border-gray-300 p-2">{user.userName}</td>
    <td className="border border-gray-300 p-2">{user.phone}</td>
    <td className="border border-gray-300 p-2">{user.email}</td>
    <td className="border border-gray-300 p-2">


   {!user.isBlocked ?
      <button
        onClick={() => handleBlock(user.email)}
        className="bg-red-500 p-2 rounded-md text-white"
      >
        Block
      </button>
      :
      <button 
      onClick={() => handleunBlock(user.email)}
      className="bg-green-500 p-2 rounded-md text-white">
        Unblock
      </button>
   }

    </td>
  </tr>
))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </Layout>
  );
};

export default UserList;
