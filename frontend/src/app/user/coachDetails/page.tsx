"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCoachDetails } from "@/service/userApi";
import img from "../../../../public/assets/backGround/pexels-ronin-10754972.jpg";
import Image from "next/image";


interface coachState {
  age: number;
  name: string;
  phone: number;
  height: number;
  weight: number;
  noOfStudentsCoached: number;
  availability: string;
  achievementBadges: string[];
  package: {
    monthlyPackage: number;
    quarterlyPackage: number;
    yearlyPackage: number;
  };
  state: string;
  address: string;
  city: string;
  locality: string;
  userId: {
    profileImage: any;
    quizScore: number;
  };
}

export default function GymProfile() {
    const router = useRouter()
  const serachParams = useSearchParams();
  const [coach, setCoach] = useState< coachState | null>(null);

  useEffect(() => {
    const fetchdatafn = async () => {
      const coach_id = serachParams.get("coach");
      if (coach_id) {
        const data = await fetchCoachDetails(coach_id);
        console.log(data)
        setCoach(data);
      } else {
        console.log("coach_id missing in coach details");
      }
    };
    fetchdatafn();
  }, []);

  console.log(coach?.userId?.profileImage,"ojegnvekv");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div
        className="relative bg-cover bg-center bg-fixed py-16"
        style={{ backgroundImage: `url(${img.src})` }}
      >
        

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500">
                
            <img
              src={coach?.userId?.profileImage || "/default-avatar.jpg"}
              alt="Coach Avatar"    
              width={128}
              height={128}
            />
          </div>

          <h1 className="text-3xl font-bold mt-4">{coach?.name}</h1>
          <p className="mt-2 text-gray-300 text-center max-w-lg">
            "Transforming lives one rep at a time. Specializing in personalized
            fitness programs and coaching."
          </p>

          <div className="flex space-x-4 mt-6">
            <button className="bg-cyan-500 px-6 py-2 rounded-lg font-semibold hover:bg-red-600">
              Book a Slot
            </button>
            <button className="bg-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700">
              Chat with Coach
            </button>
            <button
          onClick={()=>router.push("/user/coachList")}
          className=" top-4 right-4 bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Back to List
        </button>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold font-sans text-center mb-20">
            Choose Your Transformation Package
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700  p-6 ml-10 rounded-3xl shadow-lg text-center">
              <h3 className="text-xl font-semibold">Monthly</h3>
              <p className="mt-4 text-2xl font-bold text-red-500">
                ${coach?.package?.monthlyPackage}
              </p>
              <p className="mt-2 text-gray-300">
                Access to gym workouts and online coaching
              </p>
              <button className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
                Select Plan
              </button>
            </div>

            <div className="bg-gray-700 p-6  rounded-3xl shadow-lg text-center">
              <h3 className="text-xl font-semibold">Quarterly</h3>
              <p className="mt-4 text-2xl font-bold text-red-500">
                ${coach?.package?.quarterlyPackage}
              </p>
              <p className="mt-2 text-gray-300">
                Advanced plans with trainer guidance
              </p>
              <button className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
                Select Plan
              </button>
            </div>

            <div className="bg-gray-700 p-6 mr-10 rounded-3xl shadow-lg text-center">
              <h3 className="text-xl font-semibold">Yearly</h3>
              <p className="mt-4 text-2xl font-bold text-red-500">
                ${coach?.package?.yearlyPackage}
              </p>
              <p className="mt-2 text-gray-300">
                Full transformation plan with VIP perks
              </p>
              <button className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>
 
<section className="py-12 mt-10 w-fit mx-auto rounded-3xl bg-black-800">
  <div className="container mx-auto px-6 flex flex-col items-center">
    <h2 className="text-4xl font-bold font-sans text-center mb-10">
      Coach Details
    </h2>
    <div className="flex flex-wrap justify-center gap-10 text-gray-300">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="font-semibold text-lg mb-4 text-center">General Info</h3>
        <ul className="space-y-4">
          <li>Age: {coach?.age}</li>
          <li>Height: {coach?.height} cm</li>
          <li>Weight: {coach?.weight} kg</li>
          <li>Contact: {coach?.phone}</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="font-semibold text-lg mb-4 text-center">Training Info</h3>
        <ul className="space-y-4">
          <li>No. of Students Coached: {coach?.noOfStudentsCoached}</li>
          <li>Availability: {coach?.availability}</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="font-semibold text-lg mb-4 text-center">Locating Info</h3>
        <ul className="space-y-4">
          <li>State: {coach?.state}</li>
          <li>City: {coach?.city}</li>
          <li>Locality: {coach?.locality}</li>
          <li>Address: {coach?.address}</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="font-semibold text-lg mb-4 text-center">Achievements</h3>
        <ul className="space-y-4">
          {coach?.achievementBadges?.map((badge, index) => (
            <li key={index}>{badge}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>


      {/* Reviews Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Reviews</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="italic text-gray-300">
              "The best fitness coach I've ever had. Harikaran pushed me to my limits and beyond!"
              - Alex
            </p>
            <button className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
              Add Your Review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
