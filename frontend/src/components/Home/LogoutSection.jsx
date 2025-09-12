import React from "react";

const LogoutSection = ({ user, handleLogout }) => {
  return (
    <>
      {user && user?.role === "user" ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 mb-6"
        >
          Logout
        </button>
      ) : (
        <p className="text-gray-600 mb-6">You are not logged in.</p>
      )}
    </>
  );
};

export default LogoutSection;
