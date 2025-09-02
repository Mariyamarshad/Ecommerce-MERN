// frontend/src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import summaryApi from "../../Utils/index";
import apiCaller from "../../utils/apiCaller";



// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await apiCaller(summaryApi.getCart);
  return res;
});

// Add item to cart
export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  const res = await apiCaller({
    ...summaryApi.addToCart,
    data: item,
  });
  return res;
});

// Update item quantity
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ id, quantity }) => {
  const res = await apiCaller({
    ...summaryApi.updateCartItem(id),
    data: { quantity },
  });
  return res;
});

// Delete item
export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (id) => {
  const res = await apiCaller(summaryApi.deleteCartItem(id));
  return res;
});

// ✅ Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // addToCart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // updateCartItem
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // removeCartItem
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
