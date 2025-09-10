import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCaller from "../../utils/apiCaller";
import summaryApi from "../../Utils";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await apiCaller(summaryApi.getOrders);
    return res; 
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id) => {
    const apiConfig = summaryApi.getOrderById(id); 
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
