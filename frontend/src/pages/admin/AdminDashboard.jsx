import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/DashboardCard";
import axios from "axios";

const AdminDashboard = () => {
  const [count, setCount] = useState({
    users: 0,
    products: 0,
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
      <DashboardCard title="Users" count={count.users}  />
      <DashboardCard title="Products" count={count.products} />
      <DashboardCard title="Orders" count={0} />
    </div>
  );
};

export default AdminDashboard;
