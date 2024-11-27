"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteCookie } from '../../../utils/deleteCookie';

const Navbar: React.FC = () => {
  const [user, setUser] = useState("");
  const [isAth, setIsAth] = useState<boolean>(false);
  const [isCoach,setIsCoach] = useState(false)
  const [isApprovedBtn,setIsApprovedBtn] = useState("")
  const [quizScore,setQuizScore] = useState(0)
  const router = useRouter();
  
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
      if (user) {
        setIsAth(true);
      } else {
        setIsAth(false);
      }
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    deleteCookie("userToken");
    setIsAth(false);  // Update isAth after logout
    router.push("/user/home");
    window.location.reload();
  };

  const handleLogin = () => {
    router.replace("/login");
  };

  useEffect(() => {
    const updatedUser = localStorage.getItem("user");
    console.log(updatedUser,"updatedUser")
    if (updatedUser) {
      try {
        const user = JSON.parse(updatedUser);
        const isCoachs = user.isCoach;
        const quizScore = user.quizScore;
        const isApproved = user.isApproved;
       
        setQuizScore(quizScore)
        setIsCoach(isCoachs);
        setIsApprovedBtn(isApproved)
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);
  console.log(isApprovedBtn,"isApproved")
  console.log(isCoach,"isCoach")

 const handleBecomeCoach = ()=>{
   

   if(isCoach){
   router.push(`/coaches/greetings?quizScore=${quizScore}`)
   }else{
    router.push('/coaches/becomeACoach')
   }
 }

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4">
    <div className="text-2xl font-bold">
      <h1>Mr.Fit</h1>
    </div>
    <div className="flex gap-7">
      
      {isApprovedBtn=="Accept"? "":<a
              href="/get-coach"
              className="text-lg hover:underline hover:text-cyan-400"
            >
              Get Coach
            </a>}
           

    {user && (
        <span className="text-lg hover:underline mr-3 hover:text-cyan-400">
          Hi.. {user}
        </span>
      )}

      {/* Conditional rendering for logged-in user */}
      {user && isAth ? (
        <>
         <div className="flex space-x-3">
           {isApprovedBtn=="Pending"?
           <a
              className="text-lg hover:underline hover:text-yellow-400"
            >
              Approval Pending
            </a>
           :isApprovedBtn=="Accept"?
            <a
            onClick={()=>router.push('/coaches/coachFillup')}
              className="text-lg hover:underline hover:text-cyan-400"
            >
              Register Coach
            </a>:<a
              onClick={handleBecomeCoach}
              className="text-lg hover:underline hover:text-cyan-400"
            >
              Become a Coach
            </a>
          }
          </div>
          <a
            onClick={handleLogout}
            className="text-lg hover:underline hover:text-cyan-400 mr-3"
          >
            Logout
          </a>
         
        </>
      ) : (
        // Conditional rendering for guest user
        <a
          onClick={handleLogin}
          className="text-lg hover:underline hover:text-cyan-400"
        >
          Login
        </a>
      )}
    </div>
  </nav>
  );
};

export default Navbar;
