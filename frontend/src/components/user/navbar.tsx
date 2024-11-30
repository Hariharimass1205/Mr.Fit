"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchData, logoutApi } from '@/service/userApi';
import { useAppSelector } from '@/store/hooks/hooks';

const Navbar: React.FC = () => {
  const [user, setUser] = useState();
  const [userStatus,setUserStatus] = useState("")
  const [isRegistered,setIsRegistered] = useState(false)
  const [isAth, setIsAth] = useState<boolean>(false);
  const [isCoach,setIsCoach] = useState(false)
  const [isApprovedBtn,setIsApprovedBtn] = useState("")
  const [quizScore,setQuizScore] = useState(0)
  const router = useRouter();
  const userdataRedux = useAppSelector(state => state?.user?.user)
 console.log(userdataRedux)

   useEffect(() => {
    (async function fetchuserData(){
    try {
      const data = await fetchData()

      setUserStatus(data?.result?.data?.isApproved)
      setIsRegistered(data?.result?.data?.isRegisted)
      console.log(isRegistered,"raw data")
    } catch (error) {
      console.log(error)
    }
  })()
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
  }, [user,isRegistered]);
console.log(isRegistered,"out")
  const handleLogout = async () => {
    try {
      const result = await logoutApi()
      if(result){
      localStorage.removeItem("user");
      }
      setIsAth(false);  
      router.replace("/user/home");
      window.location.reload();  
    } catch (error) {
      console.log(error)
    }
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
      
      {userStatus =="Accept"? "":<a
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
      {userStatus === "Pending" ? (
        <a className="text-lg hover:underline hover:text-yellow-400">
          Approval Pending
        </a>
      ) : userStatus === "Accept" ? (
        !isRegistered ? (
          <a
            onClick={() => router.push('/coaches/coachProfile')}
            className="text-lg hover:underline hover:text-cyan-400"
          >
            Profile
          </a>
          
        ) : (
          <a
            onClick={() => router.push('/coaches/coachFillup')}
            className="text-lg hover:underline hover:text-cyan-400"
          >
            Register Coach
          </a>
        )
      ) : (
        <a
          onClick={handleBecomeCoach}
          className="text-lg hover:underline hover:text-cyan-400"
        >
          Become a Coach
        </a>
      )}
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
