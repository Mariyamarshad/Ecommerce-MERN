import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/DashboardCard";
import axios from "axios";
import { Users, Package, ShoppingCart } from "lucide-react"

const AdminDashboard = () => {
  const [count, setCount] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/counts`
        );
        setCount(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard counts:", err);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard title="Users" count={count.users} icon={<Users className="w-10 h-10 text-blue-500"/>}  />
      <DashboardCard title="Products" count={count.products}   icon={<Package className="w-10 h-10 text-green-500" />} />
      <DashboardCard title="Orders" count={count.orders} icon={<ShoppingCart className="w-10 h-10 text-purple-500" />}  />
    </div>
  );
};

export default AdminDashboard;
