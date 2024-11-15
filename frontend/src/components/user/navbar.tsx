"use client";
import { cookies } from 'next/headers';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteCookie } from '../../../utils/deleteCookie';

const Navbar: React.FC = () => {
  const [user, setUser] = useState("");
  const [isAth, setIsAth] = useState<boolean>(false);
  const router = useRouter();
  
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedData) {
      try {
        const user = JSON.parse(storedData);
        const userName = user.userName;
        setUser(userName);
      } catch (error) {
        console.log(error);
      }
      if (token && user) {
        setIsAth(true);
      } else {
        setIsAth(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    deleteCookie("token");
    setIsAth(false);  // Update isAth after logout
    router.push("/user/home");
    window.location.reload();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <h1>Mr.Fit</h1>
      </div>
      <div className="flex gap-7">
        <Link href="/get-coach" className="text-lg hover:underline hover:text-cyan-400">
          Get Coach
        </Link>
        <Link href="/coaches/becomeACoach" className="text-lg hover:underline hover:text-cyan-400">
          Become Coach
        </Link>
        {user && (
          <span className="text-lg hover:underline mr-3 hover:text-cyan-400">Hi.. {user}</span>
        )}
        {user ? (
          <a onClick={handleLogout} className="text-lg hover:underline hover:text-cyan-400">
            logout
          </a>
        ) : (
          <a onClick={handleLogin} className="text-lg hover:underline hover:text-cyan-400">
            login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
