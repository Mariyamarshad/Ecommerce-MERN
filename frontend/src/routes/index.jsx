import React from "react";
import { Routes, Route } from "react-router-dom";

// User pages
import Home from "../pages/user/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import CategoryPage from "../pages/user/CategoryPage";
import CartPage from "../pages/user/cart";
import CheckoutPage from "../pages/user/CheckoutPage";
import Contact from "../pages/user/Contact";
import About from "../pages/user/About";
import CancelPage from "../pages/user/cancel";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/AdminUsers";
import Products from "../pages/admin/AdminProducts";
import Orders from "../pages/admin/AdminOrders";

// Layouts
import UserLayout from "../components/Layouts/UserLayout";
import AdminLayout from "../components/Layouts/AdminLayout";
import ProductDetails from "../components/Home/ProductDetails";
import Wishlist from "../pages/user/Wishlist";
import UserDashboard from "../pages/user/userDashboard";
import OrderDetails from "../pages/user/OrderDetails";
import SuccessPage from "../pages/user/SuccessPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* User routes */}
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="cart-page" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="wish-list" element={<Wishlist />} />
        <Route path="user-dashboard" element={<UserDashboard/>} />
        <Route path="/order/:id" element={<OrderDetails/>} />
        <Route path="/contact" element={<Contact />}  />
        <Route path="/about" element={<About />}  />
       

      </Route>
       <Route path="/success" element={<SuccessPage />}  />
        <Route path="/cancel" element= {<CancelPage />}  />
      

      {/* Admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
