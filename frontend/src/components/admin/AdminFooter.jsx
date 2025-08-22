import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-black text-white text-center p-4 ">
      <p>© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
    </footer>
  );
};

export default AdminFooter;
