"use client";

import Layout from "@/components/admin/layout";
import Modal from "@/components/admin/modal"
import { fetchDataList, handleBlockFun, handleUnBlockFun } from "@/service/adminApi";
import { useEffect, useState } from "react";

interface User {
  id: string;
  userName: string;
  phone: string;
  email: string;
  isBlocked: boolean;
}

const EnrolledUserList: React.FC = () => {



  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataList();
        setUsers(data?.enrolledUsers || []);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      }
    };
    fetchData();
  }, []);




  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };


  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  
  return (
    <Layout>
      <div className="flex justify-between shadow-lg items-center p-4 bg-white rounded-3xl">
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
        Enrolled User Management
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : users.length > 0 ? (
        <>
          <div className="p-4">
            <table className="table-auto text-slate-950 w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border border-gray-300 text-left">Date</th>
                  <th className="px-6 py-3 border border-gray-300 text-left">Name</th>
                  <th className="px-6 py-3 border border-gray-300 text-left">Package</th>
                  <th className="px-6 py-3 border border-gray-300 text-left">Coach Name</th>
                  <th className="px-6 py-3 border border-gray-300 text-center">Transaction Id</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 border border-gray-300 text-gray-700">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 border border-gray-300 text-gray-700">
                      {user.userName.toLocaleUpperCase()}
                    </td>
                    <td className="px-6 py-4 border border-gray-300 text-gray-700">
                      {user.enrolledPackage}
                    </td>
                    <td className="px-6 py-4 border border-gray-300 text-gray-700">
                      {user.coachId.name}
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 mr-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 ml-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-700">Loading users...</p>
      )}

    </Layout>
  );
};

export default EnrolledUserList;
