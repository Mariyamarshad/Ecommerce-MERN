import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../admin/AdminNavbar";
import AdminFooter from "../admin/AdminFooter";
import Sidebar from "../admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      
      <div className="flex flex-1 mt-16"> 
        
        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
