"use client";
import { useState } from "react";
import bg from "../../../../public/assets/backGround/pexels-dogu-tuncer-339534179-15917308.jpg";
import { registerCoach } from "@/service/coachApi";
import { toast ,ToastContainer} from 'react-toastify';
import router, { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

export default function CoachFillup() {
  const router = useRouter()
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

  const [errors, setErrors] = useState({
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

    // Update formData state
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    // Height (should be a number)
    if (!formData.height || isNaN(Number(formData.height)) || Number(formData.height) <= 0 || Number(formData.height)>300) {
      newErrors.height = "Height must be a positive number and lower than 300cm.";
    }

    // Phone (should match a simple phone number pattern)
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Weight (should be a number)
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = "Weight must be a positive number.";
    }

    // Age (should be a number)
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) <= 0 || Number(formData.age) >=110 ) {
      newErrors.age = "Age must be a positive number and below 110.";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    // State, City, Locality (all required)
    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }
    if (!formData.locality.trim()) {
      newErrors.locality = "Locality is required.";
    }

    // License or Aadhaar (alphanumeric validation)
    const licensePattern = /^[A-Za-z0-9]{5,20}$/;
    if (!formData.licenseOrAadhaar || !licensePattern.test(formData.licenseOrAadhaar)) {
      newErrors.licenseOrAadhaar = "License or Aadhaar must be alphanumeric and between 5 to 20 characters long.";
    }

    // Availability
    if (!formData.availability) {
      newErrors.availability = "Availability is required.";
    }

    setErrors(newErrors);

    // Return false if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't submit if form is invalid
    }

    try {
      const response = await registerCoach(formData);
      if (response) {
        router.replace(`/coaches/coachProfile`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <ToastContainer></ToastContainer>
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="p-8 w-full max-w-6xl bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-center text-7xl font-bold text-white mb-16">Coach Registration</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1: Name and Height */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-2 gap-20">
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="height"
                placeholder="Height in CM"
                value={formData.height}
                onChange={handleChange}
                
              />
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>
          </div>

          {/* Row 2: Phone and Weight */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-2 gap-20">
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="weight"
                placeholder="Weight in KG"
                value={formData.weight}
                onChange={handleChange}
                
              />
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
            </div>
          </div>

          {/* Row 3: Age and Address */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-2 gap-20">
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
            <div>
              <textarea
                className="p-3 border border-gray-300 rounded w-full"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-white font-semibold mb-2">Available Time:</label>
            <div className="flex flex-wrap gap-20">
              {["24 Hours", "8AM to 6PM", "8AM to 8PM"].map((time) => (
                <div className="flex items-center" key={time}>
                  <input
                    type="radio"
                    name="availability"
                    value={time}
                    
                    checked={formData.availability === time}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-white">{time}</label>
                </div>
              ))}
            </div>
            {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
          </div>

          {/* Location Details */}
          <div className="grid text-black grid-cols-1 sm:grid-cols-3 gap-10">
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                
              />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div>
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="text"
                name="locality"
                placeholder="Locality"
                value={formData.locality}
                onChange={handleChange}
                
              />
              {errors.locality && <p className="text-red-500 text-sm">{errors.locality}</p>}
            </div>
          </div>

          {/* KYC Verification */}
          <div>
            <input
              className="p-3 text-black border border-gray-300 rounded w-full"
              type="text"
              name="licenseOrAadhaar"
              placeholder="License or Aadhaar"
              value={formData.licenseOrAadhaar}
              onChange={handleChange}
              pattern="^[A-Za-z0-9]{5,20}$"
              title="License or Aadhaar must be alphanumeric and 5-20 characters long."
              
            />
            {errors.licenseOrAadhaar && (
              <p className="text-red-500 text-sm">{errors.licenseOrAadhaar}</p>
            )}
          </div>

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
    </>
  );
}
