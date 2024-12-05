"use client";
import { useState, useEffect } from "react";
import { fetchcoachList } from "@/service/userApi";
import { useRouter } from "next/navigation";
import Footer from "@/components/user/footer";
import Navbar from "@/components/user/navbar";

interface Coach {
  userId: any;
  state: string;
  package: { monthlyPackage: number };
  id: number;
  name: string;
  location: string;
  age: number;
  noOfStudentsCoached: number;
}

export default function CoachList() {
  const [coaches, setCoaches] = useState<Coach[]>([]); // Original fetched data
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]); // Filtered data
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
  const router = useRouter();

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters on button click
  const applyFilters = () => {
    let filtered = [...coaches];

    if (filters.search) {
      filtered = filtered.filter((coach) =>
        coach.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.location) {
      filtered = filtered.filter((coach) =>
        coach.state.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.minPrice) {
      filtered = filtered.filter(
        (coach) => coach.package.monthlyPackage >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (coach) => coach.package.monthlyPackage <= Number(filters.maxPrice)
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

    setFilteredCoaches(filtered);
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchcoachList();
        setCoaches(data);
        setFilteredCoaches(data); // Initialize filtered data
      } catch (error) {
        //console.error("Failed to fetch coaches:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-cyan-300 to-cyan-1000 text-white flex flex-col">
      {/* Search Bar */}
      <div className="p-5 bg-gray-800 shadow-lg">
        <div className="flex items-center">
        <button
            onClick={applyFilters}
            className="p-3 mr-4 bg-gray-700 rounded-xl text-white font-bold shadow-lg hover:bg-cyan-600 transition-all"
          > 
            search
          </button>
          <input
            type="text"
            name="search"
            placeholder="Search Coaches"
            className="w-full p-3 rounded-md bg-gray-700 text-white mr-4"
            value={filters.search}
            onChange={handleFilterChange}
          />
          
          <button
            className="bg-slate-600 hover:bg-cyan-600 rounded-lg p-3"
            onClick={() => router.push("/user/home")}
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 p-8 bg-gradient-to-r from-cyan-600 to-cyan-1000  shadow-xl space-y-8">
          <h2 className="text-2xl   font-extrabold text-white">Filter Coaches</h2>

          <div className="space-y-2 ">
            <label className="text-sm text-gray-200">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              className="w-full p-3 rounded-lg bg-gradient-to-r from-gray-600 to-gray-900 text-white"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm text-gray-200">Price Range</label>
            <input
              type="text"
              name="minPrice"
              placeholder="Min Price"
              className="w-full p-3 mb-2 rounded-md bg-gradient-to-r from-gray-600 to-gray-900 text-white"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="maxPrice"
              placeholder="Max Price"
              className="w-full p-3 rounded-md bg-gradient-to-r from-gray-600 to-gray-900 text-white"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm text-gray-200">Age Range</label>
            <input
              type="text"
              name="minAge"
              placeholder="minAge"
              className="w-full p-3 mb-2 rounded-md  bg-gradient-to-r from-gray-600 to-gray-900 text-white"
              value={filters.minAge}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="maxAge"
              placeholder="max Age"
              className="w-full p-3 rounded-md bg-gradient-to-r from-gray-600 to-gray-900 text-white"
              value={filters.maxAge}
              onChange={handleFilterChange}
            />
          </div>

          <button
            onClick={applyFilters}
            className="w-40 p-3 from-cyan-600 to-cyan-1000 rounded-xl text-white font-bold shadow-lg hover:bg-cyan-800 transition-all"
          >
            Apply Filters
          </button>
        </aside>

        {/* Main Content */}
        
        <main className="flex-1 p-5">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCoaches.map((coach,index) => (
              <div
              key={index}
              className="bg-gray-800  rounded-md overflow-hidden shadow-lg"
            >
              <img
                src={coach.userId.profileImage}
                alt={coach.name}
                className="w-full h-48 object-cover"
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
    </div>
    <Footer></Footer>
    </>
  );
}
