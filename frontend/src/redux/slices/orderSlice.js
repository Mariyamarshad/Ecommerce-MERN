import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCaller from "../../utils/apiCaller";
import summaryApi from "../../utils";

// Fetch all orders of logged-in user
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await apiCaller(summaryApi.getOrders); // backend should return user's orders
    return res; 
  }
);

//fetch single order by id
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id) => {
    const apiConfig = summaryApi.getOrderById(id); // returns { url, method }
    const res = await apiCaller(apiConfig);
    return res;
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single order
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { clearOrders, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
