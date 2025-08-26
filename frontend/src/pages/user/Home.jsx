import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Hero from "../../components/common/HeroSection";
import { fetchProducts } from "../../redux/slices/productSlice";

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

      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {token && user?.role === "user" ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 mb-6"
          >
            Logout
          </button>
        ) : (
          <p className="text-gray-600 mb-6">You are not logged in.</p>
        )}

        {/* Products Section */}
        {loading && <p className="text-blue-500">Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl">
          {items.map((product) => {
            console.log("product image path::", product.image);
            return (
              <div key={product._id} className="border p-4 rounded shadow">
                {product.image && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                
                <h3 className="font-bold text-lg mt-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-red-600 font-bold">${product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
