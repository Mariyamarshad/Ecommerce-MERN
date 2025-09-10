import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../../redux/slices/cartSlice";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); 

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch])


  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your order has been placed.</p>
    </div>
  );
};

export default SuccessPage;
