import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/data`,
        { withCredentials: true } 
      );
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user!");
    }
  };

  const handleBlockToggle = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}/block`,
        {},
        { withCredentials: true }
      );

      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );

      toast.success(res.data.message);
    } catch (err) {
      console.error("Error blocking/unblocking user:", err);
      toast.error("Failed to update user status!");
    }
  };

  return (
    <div className="flex mt-30">
      <div className="flex-1">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Users</h2>

          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <table className="w-full border-collapse border text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map((user, index) => (
                  <tr key={user._id || index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      {user.isBlocked ? (
                        <span className="text-red-600 font-semibold">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Active</span>
                      )}
                    </td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => handleBlockToggle(user._id)}
                        className={`px-3 py-1 rounded text-white ${
                          user.isBlocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        } transition`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
