import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import Footer from "../user/userFooter";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <main className="min-h-screen">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
