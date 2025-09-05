import React, { useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchWishlist } from "./redux/slices/wishlistSlice";
import { fetchUser } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
