import React, { useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/authSlice";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const dispatch = useDispatch();


  return (
    <BrowserRouter>
    <ScrollToTop />
      <AppRoutes />
      <ToastContainer
        position="top-right"       
        autoClose={3000}                 />
    </BrowserRouter>
  );
}

export default App;
