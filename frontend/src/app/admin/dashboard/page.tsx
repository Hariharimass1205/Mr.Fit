
"use client";

import Layout from "@/components/admin/layout"; 
import Topbar from "@/components/admin/topbar"; 


const Dashboard: React.FC = () => {
  
  return (
    <Layout >
      <Topbar />
      <h1 className="text-5xl  text-black font-semibold mt-10 mb-8 ">Dashboard</h1>
      {/* Dashboard content */}
      <div className="grid   grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg  text-black font-semibold">Total Clients</h3>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg  text-black font-semibold">Total Coaches</h3>
        </div>
      </div>
      </Layout>
  );
};

export default Dashboard;
