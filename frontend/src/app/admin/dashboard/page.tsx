"use client";

import Layout from "../../../components/admin/layout";
import { fetchDataList } from "../../../service/adminApi";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataList();
        setData(response || {});
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const pendingApprovalsList = data?.pendingApprovalsList
  const totalUsers = data?.userList?.length || 0;
  const totalCoaches = data?.coachList || 0; // Assuming coachList is a number
  const totalEnrolledUsers = data?.enrolledUsers?.length || 0;

  // Revenue Data
  const revenueByMonth = Array(12).fill(0);
  const usersByMonth = Array(12).fill(0);
  const coachesByMonth = Array(12).fill(0); // Add coach join data per month

  data?.userList?.forEach((user: any) => {
    if (user.enrolledDate && user.enrolledPackage) {
      const month = new Date(user.enrolledDate).getMonth();
      revenueByMonth[month] += user.enrolledPackage;
    }
    if (user.enrolledDate) {
      const month = new Date(user.enrolledDate).getMonth();
      usersByMonth[month] += 1;
    }
  });


  const coachesJoinedByMonth = [1, 2, 0, 3, 1, 2, 0, 0, 4, 3, 2, 1];
  coachesByMonth.splice(0, 12, ...coachesJoinedByMonth);
  const revenueChartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueByMonth,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const usersChartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Users Joined",
        data: usersByMonth,
        backgroundColor: "#2196F3",
      },
      {
        label: "Coaches Joined",
        data: coachesByMonth,
        backgroundColor: "#E91E63", 
      },
    ],
  };

  return (
    <Layout>
      <h1 className="text-5xl text-black font-semibold mt-10 mb-8">Dashboard</h1>
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Total Coaches</h3>
          <p className="text-3xl font-bold">{totalCoaches}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Enrolled Users</h3>
          <p className="text-3xl font-bold">{totalEnrolledUsers}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-500 to-red-900 text-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Pending approvals</h3>
          <p className="text-3xl font-bold">{pendingApprovalsList}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="p-6 bg-white shadow-lg rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Revenue</h3>
        <div className="h-64">
          <Line
            data={revenueChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Revenue ($)" },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Users and Coaches Joined Chart */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Users and Coaches Joined Monthly</h3>
        <div className="h-64">
          <Bar
            data={usersChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Count" },
                },
              },
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
