import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../common/UserNavbar";
import Footer from "../common/Footer";

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
