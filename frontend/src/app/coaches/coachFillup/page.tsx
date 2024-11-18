"use client"
import { useSearchParams } from 'next/navigation';
import bg from '../../../../public/assets/backGround/pexels-dogu-tuncer-339534179-15917308.jpg';

export default function CoachFillup() {
    const user = localStorage.getItem("user");
    console.log(user)  
    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg.src})`,
            }}
        >
            <div className="p-8 w-full max-w-6xl bg-opacity-90 rounded-lg shadow-lg">
                <h2 className="text-center text-7xl font-bold  text-cyan-300 mb-16">
                     Let's know a bit more about you.
                </h2>

                <form className="space-y-6">
                    {/* Row 1: Name and Height */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
                        <input
                            className="p-3 border border-white-900   rounded w-full"
                            type="text"
                            placeholder="Full Name"
                        />
                        <input
                            className="p-3 border border-white-300 rounded w-full"
                            type="text"
                            placeholder="Height"
                        />
                    </div>

                    {/* Row 2: Phone and Weight */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            type="text"
                            placeholder="Phone"
                        />
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            type="text"
                            placeholder="Weight"
                        />
                    </div>

                    {/* Row 3: Age and Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
                        <input
                            className="p-3 border border-gray-300 rounded w-full"
                            type="text"
                            placeholder="Age"
                        />
                        <textarea
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Address"
                        ></textarea>
                    </div>

                    {/* Availability */}
                    <div>
                        <label className="block text-white-800 font-semibold mb-2">Available Time:</label>
                        <div className="flex flex-wrap gap-20">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="availability"
                                    value="24 Hours"
                                    className="mr-2"
                                />
                                <label className="text-white-800">24 Hours</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="availability"
                                    value="8AM to 6PM"
                                    className="mr-2"
                                />
                                <label className="text-white-800">8AM to 6PM</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="availability"
                                    value="8AM to 8PM"
                                    className="mr-2"
                                />
                                <label className="text-white-800">8AM to 8PM</label>
                            </div>
                        </div>
                    </div>

                    {/* Working Days */}
                    <div>
                        <label className="block text-white-800 font-semibold mb-2">Working Days:</label>
                        <div className="flex flex-wrap gap-20">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="working_days"
                                    value="24 Hours"
                                    className="mr-2"
                                />
                                <label className="text-white-800">24 Hours</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="working_days"
                                    value="8AM to 8PM"
                                    className="mr-2"
                                />
                                <label className="text-white-800">8AM to 8PM</label>
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                        <input
                            className="p-3 border border-white-300 rounded w-full"
                            type="text"
                            placeholder="State"
                        />
                        <input
                            className="p-3 border border-white-300 rounded w-full"
                            type="text"
                            placeholder="City"
                        />
                        <input
                            className="p-3 border border-white-300 rounded w-full"
                            type="text"
                            placeholder="Locality"
                        />
                    </div>

                    {/* KYC Verification */}
                    <input
                        className="p-3 border border-white-300 rounded w-full"
                        type="text"
                        placeholder="License or Aadhaar"
                    />

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-cyan-500 text-white px-6 py-3 rounded font-semibold hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
