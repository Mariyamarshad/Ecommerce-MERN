import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 md:col-span-1 sticky top-24 h-fit">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Profile Information
      </h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
