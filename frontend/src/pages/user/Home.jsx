import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { fetchProducts } from "../../redux/slices/productSlice";

import Hero from "../../components/common/HeroSection";
import LogoutSection from "../../components/Home/LogoutSection";
import Categories from "../../components/Home/Categories";
import ProductList from "../../components/Home/ProductsList";

const Home = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col min-h-screen mt-20">
      <Hero />

      {/* ✅ Top Right Logout/Login */}
      <div className="absolute top-4 right-6">
        <LogoutSection token={token} user={user} handleLogout={handleLogout} />
      </div>

      <div className="flex flex-col items-center w-full px-6 md:px-16">
        
        {/* ✅ Categories Section */}
        <Categories />

        {/* ✅ Product List */}
        {loading && <p className="text-blue-500">Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && <ProductList products={items} />}
      </div>
    </div>
  );
};

export default Home;
