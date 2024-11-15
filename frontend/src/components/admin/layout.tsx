
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCookie } from "../../../utils/deleteCookie"; 
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const [activePath, setActivePath] = useState<string | null>(null);
  const router = useRouter();

  const handleLogoutClick = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    deleteCookie("adminToken");
    router.push("/admin/login"); // Redirect to the home page or login page
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) => activePath === path;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl text-black font-semibold">Mr.Fit</h2>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-6 py-3">
              <Link
                href="/admin/dashboard"
                className={`rounded-lg block text-xl p-3 font-semibold ${isActive("/admin/dashboard")
                    ? "bg-cyan-300 text-white" 
                    : "hover:bg-gray-200"
                  }`}
              >
                Dashboard
              </Link>
            </li>
            <li className="px-5 py-3">
              <Link
                href="/admin/adminUser"
                className={`rounded-lg block text-xl p-3 font-semibold ${isActive("")
                    ? "bg-pink-700 text-white"
                    : "hover:bg-gray-200"
                  }`}
              >
                clients
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                href="/admin/adminVendor"
                className={`rounded-lg block text-xl p-3 font-semibold  ${isActive("")
                    ? "bg-pink-700 text-grey-700"
                    : "hover:bg-gray-200"
                  }`}
              >
                coaches
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                href="/admin/salesReport"
                className={`rounded-lg block text-xl p-3 font-semibold ${isActive("")
                    ? "bg-pink-700 text-white"
                    : "hover:bg-gray-200"
                  }`}
              >
                enrolls
              </Link>
            </li>

            <li className="px-6 py-3 mt-12">
              <button
                type="button"
                onClick={handleLogoutClick}
                className={`rounded-lg block text-xl p-3 font-semibold ${isActive("")
                    ? "bg-pink-700 text-white"
                    : "hover:bg-gray-200"
                  }`}
              >
                Logout
              </button>
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
