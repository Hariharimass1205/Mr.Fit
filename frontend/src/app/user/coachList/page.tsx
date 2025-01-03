"use client";
import { useState, useEffect } from "react";
import { fetchcoachList } from "@/service/userApi";
import { useRouter } from "next/navigation";
import Footer from "@/components/user/footer";
import Navbar from "@/components/user/navbar";

interface Coach {
  _id: any;
  userId: any;
  state: string;
  package: { monthlyPackage: number };
  id: number;
  name: string;
  location: string;
  students: [string];
  age: number;
  noOfStudentsCoached: number;
}

const ITEMS_PER_PAGE = 6;

export default function CoachList() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1); // Reset to first page after applying filters
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchcoachList();
        console.log(data,"--------")
        setCoaches(data);
        setFilteredCoaches(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastCoach = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCoach = indexOfLastCoach - ITEMS_PER_PAGE;
  const currentCoaches = filteredCoaches.slice(indexOfFirstCoach, indexOfLastCoach);

  const totalPages = Math.ceil(filteredCoaches.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-cyan-300 to-cyan-1000 text-white flex flex-col">
        <div className="p-5 bg-gray-800 shadow-lg">
          <div className="flex items-center">
            <button
              onClick={applyFilters}
              className="p-3 mr-4 bg-gray-700 rounded-xl text-white font-bold shadow-lg hover:bg-cyan-600 transition-all"
            >
              Search
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
          <aside className="w-full md:w-1/4 p-8 bg-gradient-to-r from-cyan-600 to-cyan-1000 shadow-xl space-y-8">
            <h2 className="text-2xl font-extrabold text-white">Filter Coaches</h2>
            {/* Filter inputs */}
            <div className="space-y-2">
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
          <main className="flex-1 p-5">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentCoaches.map((coach, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-md overflow-hidden shadow-lg"
                >
                  <img
                    onClick={() => router.push(`/user/coachDetails?coach=${coach._id}`)}
                    src={coach.userId.profileImage || '/default-placeholder.png'}
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
            {/* Pagination controls */}
            <div className="flex justify-between mt-5">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-3 bg-gray-600 rounded-lg text-white hover:bg-cyan-600 disabled:bg-gray-400"
              >
                Previous
              </button>
              <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-3 bg-gray-600 rounded-lg text-white hover:bg-cyan-600 disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
