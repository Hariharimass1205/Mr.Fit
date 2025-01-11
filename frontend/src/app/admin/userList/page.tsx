"use client";

import Layout from "@/components/admin/layout";
import Modal from "@/components/admin/modal";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataList();
        setUsers(data?.users || []);
      } catch (err) {
        console.log(err)
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

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const confirmBlock = async () => {
    if (selectedUser) {
      await handleBlock(selectedUser.email);
      closeModal();
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  // Paginate the filtered users
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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
            placeholder="Search by Name, Email, or Phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 text-black"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span role="img" aria-label="Notifications">🔔</span>
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-black mt-10 mb-6 text-center">
        User Management
      </h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : filteredUsers.length > 0 ? (
        <>
          <div className="p-4">
            <table className="table-auto text-slate-950 w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border border-gray-300 text-left">#</th>
                  <th className="px-6 py-3 border border-gray-300 text-left">Name</th>
                  <th className="px-6 py-3 border border-gray-300 text-left">Phone</th>
                  <th className="px-6 py-3 border border-gray-300 text-left">Email</th>
                  <th className="px-6 py-3 border border-gray-300 text-center">Action</th>
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
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 border border-gray-300 text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 border border-gray-300 text-center">
                      {!user.isBlocked ? (
                        <button
                          onClick={() => openModal(user)}
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
        <p className="text-center text-gray-700">No users found</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmBlock}
        userName={selectedUser?.userName || ""}
      />
    </Layout>
  );
};

export default UserList;
