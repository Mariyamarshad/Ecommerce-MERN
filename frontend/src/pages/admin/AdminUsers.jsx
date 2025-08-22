import React from "react";
import Sidebar from "../../components/admin/AdminSidebar";
import Navbar from "../../components/admin/AdminNavbar";

const Users = () => {
  const dummyUsers = [
    { id: 1, name: "Ali", email: "ali@example.com" },
    { id: 2, name: "Sara", email: "sara@example.com" },
  ];

  return (
    <div className="flex mt-30">
      <div className="flex-1">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <table className="w-full border-collapse border text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
