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

  return (<nav className="bg-black text-white flex justify-between items-center p-4">
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
      <div className="md:hidden flex items-center">
        <button
          className="text-lg hover:underline hover:text-cyan-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </div>
  
    {/* Mobile Menu */}
    {menuOpen && (
      <div className="absolute top-16 left-0 right-0 bg-black text-white p-4 md:hidden">
        {userStatus === "Accept" ? (
          <a
            onClick={() => router.push(`/coaches/studentsList`)}
            className="text-lg hover:underline hover:text-cyan-400 block"
          >
            Students
          </a>
        ) : (
          <a
            href="/user/coachList"
            className="text-lg hover:underline hover:text-cyan-400 block"
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
              <a className="text-lg hover:underline hover:text-yellow-400 block">
                Approval Pending
              </a>
            ) : userStatus === "Accept" ? (
              isRegistered ? (
                <a
                  onClick={() => router.push('/coaches/coachProfile')}
                  className="text-lg hover:underline hover:text-cyan-400 block"
                >
                  Profile
                </a>
              ) : (
                <a
                  onClick={() => router.push('/coaches/coachFillup')}
                  className="text-lg hover:underline hover:text-cyan-400 block"
                >
                  Register Coach
                </a>
              )
            ) : (
              <a
                onClick={handleBecomeCoach}
                className="text-lg hover:underline hover:text-cyan-400 block"
              >
                {enrolledPackage <= 0 ? "Become a Coach" : "Profile"}
              </a>
            )}
            <a
              onClick={handleLogout}
              className="text-lg hover:underline hover:text-cyan-400 mr-3 block"
            >
              Logout
            </a>
          </>
        ) : (
          <a
            onClick={handleLogin}
            className="text-lg hover:underline hover:text-cyan-400 block"
          >
            Login
          </a>
        )}
      </div>
    )}
  </nav>
  );
};

export default Navbar;
