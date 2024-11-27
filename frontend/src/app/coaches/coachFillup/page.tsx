"use client";
import { useState } from "react";
import bg from "../../../../public/assets/backGround/pexels-dogu-tuncer-339534179-15917308.jpg";
import { registerCoach } from "@/service/coachApi";

export default function CoachFillup() {
  const [formData, setFormData] = useState({
    fullName: "",
    height: "",
    phone: "",
    weight: "",
    age: "",
    address: "",
    availability: "",
    state: "",
    city: "",
    locality: "",
    licenseOrAadhaar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
     if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await registerCoach(formData)
        if(response){
          alert("mjddl")
        }
    } catch (error) {
    console.log(error)
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="p-8 w-full max-w-6xl bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-center text-7xl font-bold text-white mb-16">
          Coach Registration
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1: Name and Height */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-2 gap-20">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="height"
              placeholder="Height in CM"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2: Phone and Weight */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-2 gap-20">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="weight"
              placeholder="Weight in KG"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 3: Age and Address */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-2 gap-20">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <textarea
              className="p-3 border border-gray-300 rounded w-full"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Available Time:
            </label>
            <div className="flex flex-wrap gap-20">
              {["24 Hours", "8AM to 6PM", "8AM to 8PM"].map((time) => (
                <div className="flex items-center" key={time}>
                  <input
                    type="radio"
                    name="availability"
                    value={time}
                    required
                    checked={formData.availability === time}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-white">{time}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Location Details */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-3 gap-10">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="text"
              name="locality"
              placeholder="Locality"
              value={formData.locality}
              onChange={handleChange}
              required
            />
          </div>

          {/* KYC Verification */}
          <input
            className="p-3 text-black border border-gray-300 rounded w-full"
            type="text"
            name="licenseOrAadhaar"
            placeholder="License or Aadhaar"
            value={formData.licenseOrAadhaar}
            onChange={handleChange}
            pattern="^[A-Z0-9]{5,20}$"
            title="License or Aadhaar must be alphanumeric and 5-20 characters long."
            required
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
