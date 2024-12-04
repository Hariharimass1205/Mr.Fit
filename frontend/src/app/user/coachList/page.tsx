"use client"
import { useState, useEffect } from "react";
import { fetchcoachList } from "@/service/userApi";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface Coach {
  userId: any;
  state: any;
  package: any;
  id: number;
  name: string;
  location: string;
  age: number;
  price: {
    monthlyPackage: number;
  };
  noOfStudentsCoached: number;
  states: string;
}

export default function CoachList() {
  const [coaches, setCoaches] = useState<Coach[]>([]); // Original fetched data
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]); // Filtered data
  const router = useRouter()
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    minAge: "",
    maxAge: "",
    minStudents: "",
    maxStudents: "",
  });

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coachesData = await fetchcoachList();
        setCoaches(coachesData); // Set original data
        setFilteredCoaches(coachesData); // Initialize filtered data
      } catch (err) {
        console.error("Failed to fetch coaches. Please try again later.");
      }
    };
    fetchData();
  }, []);

  console.log(coaches, "coaches state");

  // Apply filters
  useEffect(() => {
    let filtered = [...coaches]; // Work on a copy of the original data

    if (filters.search) {
      filtered = filtered.filter((coach) =>
        coach.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((coach) =>
        coach.states.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (coach) => coach.price.monthlyPackage >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (coach) => coach.price.monthlyPackage <= Number(filters.maxPrice)
      );
    }

    if (filters.minAge) {
      filtered = filtered.filter((coach) => coach.age >= Number(filters.minAge));
    }

    if (filters.maxAge) {
      filtered = filtered.filter((coach) => coach.age <= Number(filters.maxAge));
    }

    if (filters.minStudents) {
      filtered = filtered.filter(
        (coach) => coach.noOfStudentsCoached >= Number(filters.minStudents)
      );
    }

    if (filters.maxStudents) {
      filtered = filtered.filter(
        (coach) => coach.noOfStudentsCoached <= Number(filters.maxStudents)
      );
    }

    setFilteredCoaches(filtered); // Update the filtered data
  }, [filters, coaches]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar Filters */}
       {/* Sidebar Filters */}
       <aside className="w-full md:w-1/4 p-8 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl shadow-xl space-y-8 hover:scale-105 transition-all duration-300">
  <h2 className="text-2xl font-extrabold text-white text-shadow-md">Filter Coaches</h2>

  {/* Location Filter */}
  <div className="space-y-4">
    <label htmlFor="location" className="text-sm text-gray-200">Location</label>
    <input
      type="text"
      name="location"
      id="location"
      placeholder="Enter location"
      className="w-full p-5 rounded-xl bg-gray-800 text-white text-lg shadow-xl focus:ring-4 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
      value={filters.location}
      onChange={handleFilterChange}
    />
  </div>

  {/* Price Range Filter (Neon Sliders) */}
  <div className="space-y-4">
    <label htmlFor="priceRange" className="text-sm text-gray-200">Price Range</label>
    <div className="flex justify-between text-sm text-gray-200 mb-3">
      <span>{filters.minPrice || "Min Price"}</span>
      <span>{filters.maxPrice || "Max Price"}</span>
    </div>
    <div className="space-y-2">
      <input
        type="range"
        name="minPrice"
        min="0"
        max="10000"
        step="100"
        value={filters.minPrice}
        onChange={handleFilterChange}
        className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 rounded-full outline-none shadow-lg cursor-pointer transition-all duration-300"
      />
      <input
        type="range"
        name="maxPrice"
        min="0"
        max="10000"
        step="100"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        className="w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 rounded-full outline-none shadow-lg cursor-pointer transition-all duration-300"
      />
    </div>
  </div>

  {/* Age Range Filter (Neon Sliders) */}
  <div className="space-y-4">
    <label htmlFor="ageRange" className="text-sm text-gray-200">Age Range</label>
    <div className="flex justify-between text-sm text-gray-200 mb-3">
      <span>{filters.minAge || "Min Age"}</span>
      <span>{filters.maxAge || "Max Age"}</span>
    </div>
    <div className="space-y-2">
      <input
        type="range"
        name="minAge"
        min="18"
        max="100"
        value={filters.minAge}
        onChange={handleFilterChange}
        className="w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-400 rounded-full outline-none shadow-lg cursor-pointer transition-all duration-300"
      />
      <input
        type="range"
        name="maxAge"
        min="18"
        max="100"
        value={filters.maxAge}
        onChange={handleFilterChange}
        className="w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-400 rounded-full outline-none shadow-lg cursor-pointer transition-all duration-300"
      />
    </div>
  </div>

  {/* Students Coached Range (Neon Sliders) */}
  <div className="space-y-4">
    <label htmlFor="studentsRange" className="text-sm text-gray-200">Students Coached</label>
    <div className="flex justify-between text-sm text-gray-200 mb-3">
      <span>{filters.minStudents || "Min Students"}</span>
      <span>{filters.maxStudents || "Max Students"}</span>
    </div>
    <div className="space-y-2">
      <input
        type="range"
        name="minStudents"
        min="0"
        max="500"
        value={filters.minStudents}
        onChange={handleFilterChange}
        className="w-full h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 rounded-full outline-none shadow-lg cursor-pointer transition-all duration-300"
      />
      <input
        type="range"
        name="maxStudents"
        min="0"
        max="500"
        value={filters.maxStudents}
        onChange={handleFilterChange}
        className="w-full h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 rounded-full outline-none shadow-lg cursor-pointer transition-all duration-300"
      />
    </div>
  </div>

  {/* Apply Button */}
  <div className="mt-8">
    <button
      className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-600 hover:scale-105 transition-all duration-300 transform shadow-xl focus:ring-4 focus:ring-cyan-500"
      onClick={() => setFilteredCoaches(coaches)} // Placeholder for filter application logic
    >
      Apply Filters
    </button>
  </div>
</aside>




      {/* Main Content */}
      <main className="flex-1 p-5">
        {/* Search Bar */}
        <div className=" flex mb-5">
          <input
            type="text"
            name="search"
            placeholder="Search Coaches"
            className="w-full p-3 rounded-md bg-gray-700 text-white"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <button className="bg-slate-600 rounded-lg p-3 pl-6 ml-2" onClick={()=>router.push("/user/home")}>Back</button>
        </div>

        {/* Coach List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCoaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-gray-800 rounded-md overflow-hidden shadow-lg"
            >
              <img
                src={coach.userId.profileImage}
                alt={coach.name}
                className="w-full  h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-3xl mb-2 font-bold">{coach.name}</h3>
                <p>Location: {coach.state}</p>
                <p>Price: ${coach.package.monthlyPackage}</p>
                <p>Age: {coach.age}</p>
                <p>Students Coached: {coach.noOfStudentsCoached}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
