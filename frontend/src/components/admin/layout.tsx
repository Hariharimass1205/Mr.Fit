
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCookie } from "../../../utils/deleteCookie"; 
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const router = useRouter();
  const handleLogoutClick = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    deleteCookie("adminToken");
    router.push("/admin/login"); // Redirect to the home page or login page
  };



  return (
    <div className="min-h-screen flex bg-teal-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <h2 className="text-6xl text-black font-semibold">Mr.Fit</h2>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-6  py-3">
            <div className={`rounded-lg block text-black text-xl  font-semibold 
                  hover:bg-teal-300`}>
            <Link
              href="/admin/dashboard"
              className={`rounded-lg block text-black text-xl p-3 font-semibold 
              hover:text-black-300`}
              >
               Dashboard
            </Link>
            </div>
            </li>
            <li className="px-5  text-black py-3">
            <div className={`rounded-lg block text-black text-xl  font-semibold 
                  hover:bg-teal-300`}>
              <Link
                href="/admin/userList"
                className={`rounded-lg block text-black text-xl p-3 font-semibold 
                  hover:text-black-300`}
              >
                Users
              </Link>
              </div>
            </li>
            <li className="px-6  text-black py-3">
            <div className={`rounded-lg block text-black text-xl  font-semibold 
                  hover:bg-teal-300`}>
              <Link
                href="/admin/coachList"
                className={`rounded-lg block text-black text-xl p-3 font-semibold 
                  hover:text-black-300`}
              >
                Coaches
              </Link>
              </div>
            </li>
            <li className="px-6  text-black py-3">
            <div className={`rounded-lg block text-black text-xl  font-semibold 
                  hover:bg-teal-300`}>
              <Link
                href="/admin/coachList"
                className={`rounded-lg block text-black text-xl p-3 font-semibold 
                  hover:text-black-300`}
              >
                Enrolled Clients
              </Link>
              </div>
            </li>
            <li className="px-6  text-black py-3">
              <div className={`rounded-lg block text-black text-xl p-3 font-semibold 
                  hover:bg-teal-300`}>
              <Link
                href="/admin/CoachApprovals"
                
              >
                Coach Approvals
              </Link>
              </div>
            </li>
            <li className="px-6  text-black py-3">
              
            </li>

            <li className="pl-6 text-black py-3 mt-20 ">
              <div className={`rounded-lg block text-black text-xl mr-8 font-semibold 
                  hover:bg-teal-300`}>
              <button
                type="button"
                onClick={handleLogoutClick}
                className={`rounded-lg block text-black text-xl p-3 font-semibold 
                  hover:text-red-300`}
              >
                Logout
              </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">{children}</div>
    </div>
  );
};

export default Layout;
