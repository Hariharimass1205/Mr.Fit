"use client";
import Image from 'next/image';
import Navbar from '../../../components/user/navbar';
import Footer from '../../../components/user/footer';
import topBg from '../../../../public/assets/backGround/neeww.jpg';
import box1 from '../../../../public/assets/sustainable_habits_124af7fc55.webp';
import box3 from '../../../../public/assets/tailor_made_plans_326e72bd7f.webp';
import box2 from '../../../../public/assets/Biostrap-Labs.webp';
import bottombg from '../../../../public/assets/backGround/fittr_community_judgement_free_c2ff664eb3.webp';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getRoomId } from '../../../service/chatApi';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [coachId, setCoachId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);

  // Fetch userId and coachId from localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof window !== "undefined") {
          const user = localStorage.getItem("user");
          if (user) {
            const parsedUser = JSON.parse(user);
            setUserId(parsedUser?._id || null);
            setCoachId(parsedUser?.coachId || null);
          }
        }
      } catch (error) {
        console.log("Error reading from localStorage:", error);
      }
    };

    fetchUserData();
  }, []); 

  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        if (userId && coachId) {
          const response = await getRoomId(userId, coachId);
          if (response?.data) {
            setRoomId(response.data);
          } else {
            console.log("Room ID is undefined");
          }
        } else {
          console.log("Waiting for userId and coachId...");
        }
      } catch (error) {
        console.log("Error fetching roomId:", error);
      }
    };

    fetchRoomId();
  }, [userId, coachId]); 

  const handleJoinRoom = () => {
    if (videoLink) {
      console.log("Joining video room:", videoLink);
      setVideoLink(null)
      window.open(videoLink, "_blank");
    }    
  };

  // Socket setup
  useEffect(() => {
    // const socketConnection = io("http://localhost:5000", { withCredentials: true });
   const socketConnection = io("https://mr-fit.onrender.com", { withCredentials: true });
    socketConnection.on("connect", () => {
      console.log("Socket connected:", socketConnection.id);
    });
    socketConnection.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    socketConnection.on("linkNotification", (data) => {
      console.log("Incoming video call link:", data);
      setVideoLink(data.link); // Store the video link
    });
    setSocket(socketConnection);
    return () => {
      if (socketConnection) {
        socketConnection.disconnect();
        console.log("Socket connection cleaned up");
      }
    };
  }, []);

  useEffect(() => {
    if (socket && roomId) {
      console.log(`Joining room: ${roomId}`);
      socket.emit("joinRoom", roomId);
      socket.on("roomJoined", (confirmation) => {
        console.log("Room join confirmed:", confirmation);
      });
    }
  }, [socket, roomId]);

  return (
    <>
      <Navbar />

      {/* Video call notification div */}
      {videoLink && (
        <div
          className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg cursor-pointer z-50"
        >
          <p className="font-bold">Incoming Video Call</p>
          <p>Click here to join the call</p>
          <button className='p-2 mt-4 bg-green-600 mr-7 rounded-lg' onClick={handleJoinRoom}>Answer</button>
          <button className='p-2 mt-4 bg-red-600 rounded-lg' onClick={()=>setVideoLink(null)}>Reject</button>
        </div>
      )}

      <div>
        {/* Hero Section */}
        <section className="relative text-center bg-cover bg-center h-[80vh] flex flex-col justify-center text-white">
          <Image
            src={topBg}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={80}
            className="z-[-1]"
          />
          <div className="z-10">
            <h1 className="text-5xl md:text-8xl font-bold">
              <div>Helping people live their</div>
              <div className="mt-6 text-cyan-300 text-6xl md:text-9xl">BEST LIVES</div>
            </h1>
            <p className="mt-60 text-lg md:text-xl max-w-70">
              Ready to take the first step towards a healthier you? Mr.Fit is here to help with tailored plans, sustainable habits, and consistent monitoring to keep you on track!
            </p>
          </div>
        </section>

        {/* "How Mr.Fit helps you" Section */}
        <section className="text-center py-16 bg-teal-100">
          <h2 className="text-6xl text-black font-semibold pb-10">How Mr.Fit helps you...</h2>
          <button className="mt-6 bg-cyan-400 w-48 rounded-2xl text-white py-2 px-6 hover:bg-cyan-700 transition">
            Start Training
          </button>

          {/* Benefits */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Large Top Box */}
            <div className="w-full md:w-1/3 lg:w-1/4 m-5">
              <Image src={box1} alt="Tailored Plans" width={300} height={200} className="rounded" />
              <h3 className="text-gray-900 font-semibold text-3xl mt-4">Tailored Plans</h3>
              <p className="mt-2 text-gray-600">
                At Mr.Fit, we understand your goals and current fitness levels. Our experts create a plan that works for YOU.
              </p>
            </div>

            {/* Smaller Boxes */}
            <div className="w-full md:w-1/3 lg:w-1/4 m-5">
              <Image src={box3} alt="Building Sustainable Habits" width={300} height={200} className="rounded" />
              <h3 className="text-gray-900 font-semibold text-3xl mt-4">Building Sustainable Habits</h3>
              <p className="mt-2 text-gray-600">
                Our team focuses on sustainable habits that you can keep long-term, ensuring a lifestyle change that lasts.
              </p>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/4 m-5">
              <Image src={box2} alt="Monitoring and Accountability" width={300} height={200} className="rounded" />
              <h3 className="text-gray-900 font-semibold text-3xl mt-4">Monitoring and Accountability</h3>
              <p className="mt-2 text-gray-600">
                With regular check-ins, our team ensures that you stay on track and reach your goals.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="text-center py-16 bg-teal-200 relative">
          <h2 className="text-6xl text-black font-semibold mb-8">A judgement-free space for everyone...</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div
              className="w-full h-[100vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${bottombg.src})` }}
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
