"use client"
import Link from 'next/link'; 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [user, setUser] = useState(""); // Example user name, you can fetch/set this dynamically
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      try {
        const user = JSON.parse(storedData);
        const userName = user.userName;
        setUser(userName);
      } catch (error) {
        console.log(error);
      }
    }
  },[]);

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <h1>Mr.Fit</h1>
      </div>
      <div className="flex gap-7">
        <Link href="/get-coach" className="text-lg hover:underline  hover:text-cyan-400">
          Get Coach
        </Link>
        <Link href="/coaches/becomeACoach" className="text-lg hover:underline  hover:text-cyan-400">
          Become Coach
        </Link>
        {user && (
          <span  className="text-lg hover:underline mr-3  hover:text-cyan-400">Hi.. {user}</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
