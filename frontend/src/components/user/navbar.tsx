"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchData, logoutApi } from '../../service/userApi';

const Navbar: React.FC = () => {
  const [user, setUser] = useState();
  const [score,setScore] = useState(0)
  const [userStatus,setUserStatus] = useState("")
  const [isRegistered,setIsRegistered] = useState(false)
  const [enrolledPackage,setEnrolledPackage] = useState(0)
  const [isAth, setIsAth] = useState<boolean>(false);
  const [isCoach,setIsCoach] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizScore,setQuizScore] = useState(0)
  
  const router = useRouter();
  //const userdataRedux = useAppSelector(state => state?.user?.user)




   useEffect(() => {
    
    (async function fetchuserData(){
    try {
      const data = await fetchData()
      if(data){
      localStorage.setItem("user",JSON.stringify(data?.result?.data))
      }
      setUserStatus(data?.result?.data?.isApproved)
      setScore(data?.result?.data?.quizScore)
      
      setIsRegistered(data?.result?.data?.isRegisted)
      setEnrolledPackage(data?.result?.data?.enrolledPackage)
      setQuizScore(quizScore)
      setIsCoach(data?.result?.data?.isCoach);
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
  

 
  const handleLogout = async () => {
    try {
      const result = await logoutApi()
      if(result){
      localStorage.removeItem("user");
      localStorage.removeItem("coach");
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



 const handleBecomeCoach = ()=>{
  if(enrolledPackage<=0){
   if(isCoach){
   router.push(`/coaches/greetings?quizScore=${quizScore}`)
   }else{
    router.push('/coaches/becomeACoach')
   }
  }else{
    router.push("/user/profile")
  }
 }

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 relative">
    <div className="text-2xl font-bold">
      <h1>Mr.Fit</h1>
    </div>
    <div className="flex items-center gap-7">
      {userStatus === "Accept" ? (
        <a
          onClick={() => router.push(`/coaches/studentsList`)}
          className="text-lg hover:underline hover:text-cyan-400 hidden md:block"
        >
          Students
        </a>
      ) : (
        <a
          href="/user/coachList"
          className="text-lg hover:underline hover:text-cyan-400 hidden md:block"
        >
          Get Coaches
        </a>
      )}
      {user && (
        <span className="hidden md:flex items-center">
          <span className="text-lg hover:underline mr-3 hover:text-cyan-400">
            Hi.. {user}
          </span>
          {score <= 0 ? (
            <a
              href="/user/FreeWorkOutPlans"
              className="ml-7 hover:underline mr-3 hover:text-orange-400"
            >
              Free training
            </a>
          ) : (
            ""
          )}
        </span>
      )}
      {user && isAth ? (
        <>
          <div className="hidden md:flex space-x-3">
            {userStatus === "Pending" ? (
              <a className="text-lg hover:underline hover:text-yellow-400">
                Approval Pending
              </a>
            ) : userStatus === "Accept" ? (
              isRegistered ? (
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
                {enrolledPackage <= 0 ? "Become a Coach" : "Profile"}
              </a>
            )}
          </div>
          <a
            onClick={handleLogout}
            className="text-lg hover:underline hover:text-cyan-400 mr-3 hidden md:block"
          >
            Logout
          </a>
        </>
      ) : (
        <a
          onClick={handleLogin}
          className="text-lg hover:underline hover:text-cyan-400 hidden md:block"
        >
          Login
        </a>
      )}

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center z-10">
        <button
          className="text-lg hover:underline hover:text-cyan-400"
          onClick={() => setMenuOpen(true)}  // Open the modal
        >
          ☰
        </button>
      </div>
    </div>

    {/* Modal */}
    {menuOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white p-6 rounded-lg w-4/5 md:w-1/2">
          <h2 className="text-xl font-bold mb-4 text-center text-black">Menu</h2>
          {userStatus === "Accept" ? (
            <a
              onClick={() => router.push(`/coaches/studentsList`)}
              className="text-lg hover:underline hover:text-cyan-400 block mb-2"
            >
              Students
            </a>
          ) : (
            <a
              href="/user/coachList"
              className="text-lg hover:underline hover:text-cyan-400 block mb-2"
            >
              Get Coaches
            </a>
          )}
          {user && (
            <span className="block">
              <span className="text-lg hover:underline mr-3 hover:text-cyan-400">
                Hi.. {user}
              </span>
              {score <= 0 ? (
                <a
                  href="/user/FreeWorkOutPlans"
                  className="ml-7 hover:underline mr-3 hover:text-orange-400 block"
                >
                  Free training
                </a>
              ) : (
                ""
              )}
            </span>
          )}
          {user && isAth ? (
            <>
              {userStatus === "Pending" ? (
                <a className="text-lg hover:underline hover:text-yellow-400 block mb-2">
                  Approval Pending
                </a>
              ) : userStatus === "Accept" ? (
                isRegistered ? (
                  <a
                    onClick={() => router.push('/coaches/coachProfile')}
                    className="text-lg hover:underline hover:text-cyan-400 block mb-2"
                  >
                    Profile
                  </a>
                ) : (
                  <a
                    onClick={() => router.push('/coaches/coachFillup')}
                    className="text-lg hover:underline hover:text-cyan-400 block mb-2"
                  >
                    Register Coach
                  </a>
                )
              ) : (
                <a
                  onClick={handleBecomeCoach}
                  className="text-lg hover:underline hover:text-cyan-400 block mb-2"
                >
                  {enrolledPackage <= 0 ? "Become a Coach" : "Profile"}
                </a>
              )}
              <a
                onClick={handleLogout}
                className="text-lg hover:underline hover:text-cyan-400 mr-3 block mb-2"
              >
                Logout
              </a>
            </>
          ) : (
            <a
              onClick={handleLogin}
              className="text-lg hover:underline hover:text-cyan-400 block mb-2"
            >
              Login
            </a>
          )}
          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setMenuOpen(false)}  // Close the modal
              className="px-6 py-2 mt-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </nav>
  );
};

export default Navbar;
