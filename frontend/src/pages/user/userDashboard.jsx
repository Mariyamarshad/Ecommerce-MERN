import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import ProfileCard from "../../components/user/ProfileCard";
import OrdersList from "../../components/user/OrdersList";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user]);

  if (!user)
    return (
      <p className="text-center mt-40 text-lg text-gray-600">
        Please login to view your dashboard.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 mt-28">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Welcome, <span className="text-red-600">{user.name}</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <OrdersList orders={orders} loading={ordersLoading} />

        <ProfileCard user={user} />
      </div>
    </div>
  );
};

export default UserDashboard;
