"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EnrollmentSuccess = () => {
   const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 Congratulations, !
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You have successfully enrolled in the{" "}
          <span className="font-semibold text-purple-600">packageName</span>{" "}
          package.
        </p>
        <p className="text-xl text-gray-700 font-medium mb-8">
          Amount Paid: <span className="text-green-600">$amount</span>
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
