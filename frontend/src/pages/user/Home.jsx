import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { fetchProducts } from "../../redux/slices/productSlice";

import Hero from "../../components/common/HeroSection";
import LogoutSection from "../../components/Home/LogoutSection";
import Categories from "../../components/Home/Categories";
import ProductList from "../../components/Home/ProductsList";
import { clearWishlist } from "../../redux/slices/wishlistSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading  } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearWishlist());
    } catch (err) {
      console.error("Logout failed:" , err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-20">
      <Hero />

      {/*  Top Right Logout/Login */}
      <div className="absolute top-4 right-6">
        <LogoutSection user={user} handleLogout={handleLogout} />
      </div>

      <div className="flex flex-col items-center w-full px-6 md:px-16">
        
        {/*  Categories Section */}
        <Categories />

        {/*  Product List */}
        {loading && <p className="text-blue-500 ">Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && <ProductList products={items} />}
      </div>
    </div>
  );
};

export default Home;
