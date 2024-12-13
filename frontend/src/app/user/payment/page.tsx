"use client";

import { useEffect, useRef, useState } from "react";
import { generateTxnId } from "../../../../utils/generateTxnld";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CLIENT_URL } from "../../../../utils/serverURL";
import { useSearchParams, useRouter } from "next/navigation";
import payUApiCalls from "../../../../utils/apiCalls/payUApiCalls";

const PayUPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const txnidRef = useRef(generateTxnId(8)); // txnid is created once
  const txnid = txnidRef.current;
  const requestSentRef = useRef(false);

  // Fetch query parameters from URL
  const user_Id = searchParams.get('user_Id');
  const coach_Id = searchParams.get('coach_Id');
  const packageData = searchParams.get('packageAmount');
  const packageDuration = searchParams.get('packageDuration');
  const userEmail = searchParams.get('userEmail');
  const userName = searchParams.get('userName');

  // Ensure that all parameters are available before proceeding
  if (!user_Id || !coach_Id || !packageData || !userEmail || !userName) {
    return <div>Missing necessary query parameters!</div>;
  }

 console.log(packageDuration,"packageDuration")

  const BookedData = {
    advanceAmount: packageData,
    vendorId: coach_Id,
    user_Id: user_Id,
    username: userName,
    userEmail: userEmail,
  };

  const amount = BookedData.advanceAmount || 0;
  const productinfo = BookedData.vendorId || "";
  const username = BookedData.username;
  const email = BookedData.userEmail;
  const surl = `${CLIENT_URL}/api/paymentSuccess`;
  const furl = `${CLIENT_URL}/api/paymentFailure`;
  const udf1 = BookedData.user_Id || "";

  const key = "PMd9OW";

  useEffect(() => {
    const data = {
      txnid,
      amount,
      productinfo,
      username,
      email,
      udf1,
      packageDuration,
    };
console.log(data,"99999999999999")
    const makePaymentRequest = async () => {
      try {
        console.log("Sending Payment Request:", data);
        // Replace with your actual API call to generate hash
        const res = await payUApiCalls.paymentReq(data);
        console.log(res, "ressss");
        setHash(res.hash);
        requestSentRef.current = true;
      } catch (error: any) {
        console.error("Payment Error: " + error.message);
        toast.error(error.message);
      }
    };

    if (!requestSentRef.current) {
      makePaymentRequest();
    }
  }, [amount, email, productinfo, txnid, udf1, username]);

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hash) {
      event.currentTarget.submit();
    } else {
      setError("Hash not generated yet, form submission blocked.");
      console.error("Hash not generated yet, form submission blocked.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundImage: 'url(/gym-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-black shadow-md rounded-lg p-6 max-w-md w-full text-white">
        {!isConfirmed ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Confirmation</h2>
            <p className="text-gray-300 mb-6">
              Ready to level up your fitness? Confirm your payment to proceed with your gym package booking.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div>
            {error && <div className="mb-4 text-red-500 font-medium">{error}</div>}
            <form action="https://test.payu.in/_payment" method="post" onSubmit={handleFormSubmit}>
              <input type="hidden" name="key" value={key} />
              <input type="hidden" name="txnid" value={txnid} />
              <input type="hidden" name="productinfo" value={productinfo} />
              <input type="hidden" name="amount" value={amount} />
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="firstname" value={username} />
              <input type="hidden" name="udf1" value={udf1} />
              <input type="hidden" name="surl" value={surl} />
              <input type="hidden" name="furl" value={furl} />
              <input type="hidden" name="hash" value={hash || ""} />
              {hash ? (
                <button
                  type="submit"
                  value="submit"
                  className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Complete Payment
                </button>
              ) : (

                <button
                  type="button"
                  className="w-full bg-gray-400 text-white px-4 py-3 rounded-lg font-medium cursor-not-allowed"
                  disabled
                >
                  Generating Payment Link...
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayUPage;
