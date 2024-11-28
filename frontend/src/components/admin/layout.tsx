
"use client"
import Link from "next/link";
import { deleteCookie } from "../../../utils/deleteCookie"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataList } from "@/service/adminApi";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [pending,setPending] = useState(0)
  const router = useRouter();
  
  const handleLogoutClick = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.replace("/admin/login"); 
  };
  
  useEffect(()=>{
    const fetchData= async ()=>{
   try {
    const data = await fetchDataList();
        console.log(data)
        setPending(data?.pendingApprovalsList)
   } catch (error) {
    console.log("Error fetching user list:", error);
   }
  }
  fetchData()
  },[pending])

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
                Coaches  <span className="text-white pl-2.5 pr-2.5 bg-red-600 rounded-full p-1">{pending?pending:0}</span>
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
              
            </li>

            <li className="pl-6 text-black py-3 mt-48 ">
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
