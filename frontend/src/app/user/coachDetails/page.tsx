"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCoachDetails, UpdateReview } from "@/service/userApi";
import img from "../../../../public/assets/backGround/pexels-ronin-10754972.jpg";
import { Types } from "mongoose";
import { toast } from "react-toastify";



const generateSlots = (fromTime: string, toTime: string): string[] => {
  const slots: string[] = [];
  const startTime = convertTo24Hour(fromTime.split(/(?=[AP]M)/)[0], fromTime.slice(-2));
  let endTime = convertTo24Hour(toTime.split(/(?=[AP]M)/)[0], toTime.slice(-2));
  // Handle overnight scenarios
  if (endTime <= startTime) {
    endTime += 24; // Move `endTime` to the next day
  }
  for (let i = startTime; i < endTime; i++) {
    const startHour = i % 24;
    const endHour = (i + 1) % 24;
    const startPeriod = startHour < 12 ? "AM" : "PM";
    const endPeriod = endHour < 12 ? "AM" : "PM";
    const startHour12 = startHour % 12 === 0 ? 12 : startHour % 12;
    const endHour12 = endHour % 12 === 0 ? 12 : endHour % 12;
    slots.push(`${startHour12} ${startPeriod} - ${endHour12} ${endPeriod}`);
  }
  
  return slots;
};

const convertTo24Hour = (hour: string, period: string): number => {
  let hour24 = parseInt(hour, 10);
  if (period === "PM" && hour24 !== 12) hour24 += 12;
  if (period === "AM" && hour24 === 12) hour24 = 0;
  return hour24;
};




interface coachState {
  _id:Types.ObjectId
  age: number;
  name: string;
  phone: number;
  height: number;
  weight: number;
  noOfStudentsCoached: number;
  availability: { 
    fromTime:String;
    toTime:String;
    workingDays:[String];
  };
  achievementBadges: {
    achievementsOne:String,
    achievementsTwo:String,
    achievementsThree:String
  },
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
    _id:Types.ObjectId;
    profileImage: any;
    quizScore: number;
  };
}

export default function GymProfile() {
    const router = useRouter() 
  const serachParams = useSearchParams();
  const coach_id = serachParams.get("coach");
  const [coach, setCoach] = useState< any | null>({ });
  const [user, setUser] = useState< any | null>({ });
  const [reviews,setReviews] = useState<any|null>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [selectedSlot,setSelectedSlot] = useState("");
  const [registerSlot,setRegisterSlot] = useState<string[]>([])
  const [slots, setSlots] = useState<string[]>([]);
  const [packageAmount,setPackageAmount] = useState(0)
  const [packageDuration,setPackageDuration] = useState("")
  const [fetchData,setFetchData] = useState<any>()
  const [showSlots, setShowSlots] = useState(true);

  useEffect(() => {
    const fetchdatafn = async () => {
      if (coach_id) {
        const user = JSON.parse(localStorage.getItem("user") as string);
        setUser(user);
        const data = await fetchCoachDetails(coach_id, user._id);
        setFetchData(data)
        setCoach(data.coach);
        const slots = data.studentsList.Students.map((student: { slotTaken: string }) => student.slotTaken);
        setRegisterSlot(slots);
        console.log("Collected Slots:", slots);
        setUser(data.user);
        setReviews(data.reviews);
      } else {
        console.log("coach_id missing in coach details");
      }
    };
    fetchdatafn();
  }, []);

   console.log(reviews,"rererer")

   const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      toast.error("Review cannot be empty");
      return;
    }
  
    try {
      const response = await UpdateReview(coach._id, user._id, reviewText, starRating);
      if (response && response._id) {
        setReviews((prevReviews: any) => {
          return [response, ...prevReviews];
        });
        setReviewText("");
        setStarRating(0);
        setIsModalOpen(false);
        toast.success("Review submitted successfully!");
      } else {
        toast.error("Review not submitted.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review. Please try again.");
    }
  };
  
  

 const handleCloseBtn = ()=>{
  setShowSlots(false)
 }
  const handlePackageSelect = (packageAmount: number, packageDuration: string) => {
    setShowSlots(true)
    if (coach?.availability) {
      const generatedSlots = generateSlots(coach.availability.fromTime, coach.availability.toTime);
      const availableSlots = filterAvailableSlots(generatedSlots, registerSlot || []); // Pass array of taken slots
      setSlots(availableSlots);
      setPackageAmount(packageAmount);
      setPackageDuration(packageDuration);
    }
  };
  
  const filterAvailableSlots = (generatedSlots: string[], slotsTaken: string[] | null) => {
    if (!slotsTaken || slotsTaken.length === 0) return generatedSlots; // If no slots are taken, all slots are available
    return generatedSlots.filter((slot) => !slotsTaken.includes(slot)); // Filter out all taken slots
  };
  
  
  
  //console.log(slots,"---444444444---")

  const setSelectedSlotfunction = (slot:string)=>{
    setSelectedSlot(slot)
    console.log(selectedSlot,"selectedSlotselectedSlot")
    if(packageAmount && selectedSlot){
      localStorage.setItem("coach",JSON.stringify(coach))
    router.push(`/user/payment?coach_Id=${coach?._id}&user_Id=${user?._id}&slotTime=${selectedSlot}&packageAmount=${packageAmount}&packageDuration=${packageDuration}&userEmail=${user?.email}&userName=${user.userName}`)
    }
  }

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
          {user.enrolledPackage>=0?
          <div className="flex space-x-4 mt-6">
{!coach?.Students?.includes(user?._id) ? (
 ""
) : (
  <div>
    <button onClick={()=>router.push(`/user/chatPage?coach=${coach_id}&userId=${user?._id}`)} className=" top-4 right-4 mt-3 bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
    Chat with Coach
  </button>
  </div>
)}
          </div>:""}
            <button
          onClick={()=>router.push("/user/coachList")}
          className=" top-4 right-4 mt-3 bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Back to List
        </button>
        </div>
      </div>
      {user.enrolledPackage<=0?
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
              <button onClick={()=>handlePackageSelect(coach?.package?.monthlyPackage,"monthlyPackage")} className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
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
              <button onClick={()=>handlePackageSelect(coach?.package?.quarterlyPackage,"quarterlyPackage")} className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
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
              <button onClick={()=>handlePackageSelect(coach?.package?.yearlyPackage,"yearlyPackage")} className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>:""}

      
      {showSlots && slots.length > 0 ? (
        <section className="py-12 bg-gray-900 relative m-20">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-1 text-white">Available Slots</h2>

            {/* Close Button in the top-right corner */}
            <button
              className="absolute top-4 right-8 rounded-lg bg-slate-400 p-2 text-sm cursor-pointer"
              onClick={handleCloseBtn}
            >
              X close
            </button>

            <p className="text-center mb-6 text-xs">
              Note: Choose your slot as per the requirement; it can't be changed after the payment.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-1 m-2">
              {slots.map((slot, index) => {
                const normalizeSlot = (slot: string) =>
                  slot.replace(/\s/g, "").replace("-", "to").toLowerCase();

                // Find the corresponding registered slot with expiration details
                const matchedStudent = fetchData.studentsList.Students.find(
                  (student: { slotTaken: string }) => normalizeSlot(student.slotTaken) === normalizeSlot(slot)
                );

                const isSlotTaken = !!matchedStudent;
                const expirationDate = matchedStudent ? matchedStudent.enrolledDurationExpire : "";

                return (
                  <button
                    key={index}
                    className={`p-6 m-2 rounded-lg shadow-lg text-center relative overflow-hidden ${
                      isSlotTaken
                        ? "bg-red-500 cursor-not-allowed"
                        : "bg-gray-700 hover:bg-green-400"
                    }`}
                    onClick={() => !isSlotTaken && setSelectedSlotfunction(slot)}
                    disabled={isSlotTaken}
                  >
                    <h3 className="text-lg font-semibold">
                      {slot} {/* Display the time range */}
                    </h3>

                    {/* Tooltip to display the expiration date on hover */}
                    {isSlotTaken && (
                      <span className="absolute inset-0 mt-10 text-sm flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                        Available after: {expirationDate}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}







 
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
        <ol className="space-y-4">
          <li>No. of Students Coached: {coach?.noOfStudentsCoached}</li>
         
          <li>Time Availability : {coach?.availability?.fromTime}   to : {coach?.availability?.toTime}</li>
          <li >Days Availability :</li>
          {coach?.availability?.workingDays.map((days:string,i:number)=>(
            <li className="ml-32 text-orange-400" key={i} >{i + 1}.{days}</li>
          ))}
        </ol>
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
         <li className="mt-4 bg-red-500 px-4 py-2 rounded-lg font-semibold w-fit">{coach?.achievementBadges?.achievementsOne}</li>
         <li>{coach?.achievementBadges?.achievementsTwo}</li>
         <li>{coach?.achievementBadges?.achievementsThree}</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Reviews Section */}
<section className="py-12 bg-gray-900">
  <div className="container mx-auto px-6">
    <h2 className="text-2xl font-bold text-center mb-8 text-white">Reviews</h2>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      {reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review: any, index: number) => (
            <div
              key={review._id || index}
              className="border-b border-gray-700 pb-4 mb-4"
            >
              <h3 className="text-lg font-bold text-cyan-500">
                {review.userId?.userName || "Anonymous"}{" "}
                <span className="text-sm text-gray-400">({review.userId?.state || "Unknown"})-({review.transactionDate
                })</span>
              </h3>
              <p className="italic text-gray-300 mt-1">{review.review}</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={starIndex < review.starRating ? "gold" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={`w-5 h-5 ${
                      starIndex < review.starRating
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                    aria-label={`Star ${starIndex + 1}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.885 5.797a1 1 0 00.95.69h6.104c.969 0 1.371 1.24.588 1.81l-4.947 3.585a1 1 0 00-.364 1.118l1.885 5.797c.3.921-.755 1.688-1.54 1.118l-4.947-3.585a1 1 0 00-1.176 0l-4.947 3.585c-.785.57-1.84-.197-1.54-1.118l1.885-5.797a1 1 0 00-.364-1.118L2.463 11.224c-.783-.57-.38-1.81.588-1.81h6.104a1 1 0 00.95-.69l1.885-5.797z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">No reviews available yet.</p>
      )}

      <div className="mt-6">
        {!coach?.Students?.includes(user?._id) ? (
          <p className="text-cyan-500">Only enrolled people can add reviews</p>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-600"
          >
            Add Your Review
          </button>
        )}
      </div>
    </div>
  </div>

  {/* Review Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        {/* Star Rating */}
        <div className="mb-4 flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setStarRating(star)}
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= starRating ? "gold" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className={`w-8 h-8 cursor-pointer ${
                star <= starRating ? "text-yellow-500" : "text-gray-400"
              }`}
              aria-label={`Rate ${star} stars`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.885 5.797a1 1 0 00.95.69h6.104c.969 0 1.371 1.24.588 1.81l-4.947 3.585a1 1 0 00-.364 1.118l1.885 5.797c.3.921-.755 1.688-1.54 1.118l-4.947-3.585a1 1 0 00-1.176 0l-4.947 3.585c-.785.57-1.84-.197-1.54-1.118l1.885-5.797a1 1 0 00-.364-1.118L2.463 11.224c-.783-.57-.38-1.81.588-1.81h6.104a1 1 0 00.95-.69l1.885-5.797z"
              />
            </svg>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border border-gray-300 rounded p-3 mb-4"
          rows={5}
          placeholder="Share your experience with this coach..."
        ></textarea>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleReviewSubmit}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  )}
</section>


    </div>
  );
}