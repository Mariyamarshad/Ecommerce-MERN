import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import productsReducer from "../redux/slices/productSlice";
import cartReducer from "../redux/slices/cartSlice"; 
import wishlistReducer from "../redux/slices/wishlistSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// --- Persist Config for Auth (already working)
const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productsReducer,
    cart: cartReducer, 
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed when using redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
