
"use client";

import Layout from "@/components/admin/layout"; 
import Topbar from "@/components/admin/topbar"; 


const UserList: React.FC = () => {
  
  return (
    <Layout >
      <Topbar />
      <h1 className="text-5xl  text-black font-semibold mt-10 mb-8 ">User List</h1>
      
      
      </Layout>
  );
};

export default UserList;
