import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux"
import { clearCart,  } from "../../redux/slices/cartSlice";

const SuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-500 mb-6">
          Your order has been placed successfully.  
          We’ll send you a confirmation shortly.
        </p>

       
        <Link
          to="/"
          className="inline-block bg-red-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
