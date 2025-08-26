import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import summaryApi from "../../utils";

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: summaryApi.getProducts.url,
        method: summaryApi.getProducts.method,
      });
      return response.data; // { success, products }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: summaryApi.createProduct.url,
        method: summaryApi.createProduct.method,
        data: productData,
      });
      return response.data.product; // only return the product object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create product");
    }
  }
);

//delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios({
        url: `${summaryApi.deleteProduct.url}/${_id}`,
        method: summaryApi.deleteProduct.method,
      });
      return id; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete product");
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios({
        url: `${summaryApi.updateProduct.url}/${_id}`, 
        method: summaryApi.updateProduct.method,
        data: updatedData,
      });
      return res.data.product; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update product");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.items = state.items.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // now this is just the product
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
