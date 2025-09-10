import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlistItem: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item._id === product._id);

      if (!exists) {
        state.items.push(product);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },

    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addWishlistItem, removeWishlistItem, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
