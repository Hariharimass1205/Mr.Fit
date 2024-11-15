
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/admin/layout"; 
import Topbar from "@/components/admin/topbar"; 


const Dashboard: React.FC = () => {
  
  return (
    <Layout>
      <Topbar />
      <h1 className="text-3xl font-semibold mt-5 mb-8">Dashboard</h1>
      {/* Dashboard content */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total clients</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total coachs</h3>
        </div>
      </div>
      </Layout>
  );
};

export default Dashboard;
