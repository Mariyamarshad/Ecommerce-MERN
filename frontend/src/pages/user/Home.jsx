import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Hero from "../../components/common/HeroSection";

const Home = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col min-h-screen mt-20">
      <Hero />

      <div className="flex flex-col items-center justify-center flex-1">

        {token && user?.role === "user" ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <p className="text-gray-600">You are not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
