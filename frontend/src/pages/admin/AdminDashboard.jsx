import React from "react";
import DashboardCard from "../../components/admin/DashboardCard";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard title="Users" count={120} />
      <DashboardCard title="Products" count={56} />
      <DashboardCard title="Orders" count={34} />
    </div>
  );
};

export default AdminDashboard;
