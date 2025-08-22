import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer} from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

 const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    }
})

export const persistor = persistStore(store);
export default store;