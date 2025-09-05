import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import summaryApi from "../../Utils";
import apiCaller from "../../utils/apiCaller";

//  fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const res = await apiCaller(summaryApi.getWishlist);
    return res; // backend returns array of wishlist items
  }
);

//  add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (item) => {
    const res = await apiCaller({
      ...summaryApi.addToWishlist,
      data: item,
    });
    return res.item; // backend returns { message, item }
  }
);

//  remove from wishlist
export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (id) => {
    await apiCaller(summaryApi.deleteWishlistItem(id)); // ✅ correct helper
    return { id }; // return deleted wishlist item id
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // full array from backend
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // add to wishlist (optimistic)
      .addCase(addToWishlist.pending, (state, action) => {
        // Optimistically add product with temporary _id
        const tempId = Date.now().toString();
        state.items.push({
          _id: tempId,
          product: { _id: action.meta.arg.productId },
        });
      })

      // add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => !item._id.startsWith("temp-")
        );
        state.items.push(action.payload);
      })

      // remove from wishlist (optimistic)
      .addCase(removeWishlistItem.pending, (state, action) => {
        // instantly remove from UI
        state.items = state.items.filter(
          (item) => item._id !== action.meta.arg
        );
      })

      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        // nothing to do (already removed in pending)
      })

      .addCase(removeWishlistItem.rejected, (state, action) => {
        // rollback if failed
        state.error = action.error.message;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
