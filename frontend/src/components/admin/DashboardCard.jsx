import React from "react";

const DashboardCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-2xl font-bold">{count}</p>
       
    </div>
  );
};

export default DashboardCard;
