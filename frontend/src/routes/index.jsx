import React from "react";
import { Routes, Route } from "react-router-dom";

// User pages
import Home from "../pages/user/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import CategoryPage from "../pages/user/CategoryPage";
import CartPage from "../pages/user/cart";
import CheckoutPage from "../pages/user/CheckoutPage";
import Invoice from "../pages/user/Invoice";

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* User routes */}
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="category/:category" element={<CategoryPage />} />
        <Route path="cart-page" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="invoice/:orderId" element={<Invoice />} />
        <Route path="wish-list" element={<Wishlist />} />
      </Route>

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
