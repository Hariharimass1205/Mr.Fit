"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EnrollmentSuccess = () => {
  const searchParams = useSearchParams();
  const order = searchParams.get("order");
  const data = searchParams.get("data");
  const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;
   const router = useRouter();
console.log(parsedData,"successpage 888888888888888888  data")



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 Congratulations, { parsedData.userName.toUpperCase()}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You have successfully enrolled in the 
          package.
        </p>
        <p className="text-xl text-gray-700 font-medium mb-8">
          Amount Paid: <span className="text-green-600">$</span>{parsedData?.packageAmount
          }
        </p>
        <button
          onClick={() => router.push("/user/home")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default EnrollmentSuccess;
