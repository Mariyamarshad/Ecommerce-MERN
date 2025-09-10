import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import summaryApi from "../../Utils";

// --- Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios[summaryApi.login.method](
        summaryApi.login.url,
        { email, password },
        { withCredentials: true }
      );
      return res.data.user; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// --- Signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password, confirmPassword, role }, { rejectWithValue }) => {
    try {
      const res = await axios[summaryApi.signUP.method](
        summaryApi.signUP.url,
        { name, email, password, confirmPassword, role },
        { withCredentials: true }
      );
      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
      return res.data.user; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// --- Fetch Current User
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios[summaryApi.currentUser.method](
        summaryApi.currentUser.url,
        { withCredentials: true }
      );
      return res.data.user;
    } catch (err) {
      return rejectWithValue("Not authenticated");
    }
  }
);

// --- Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios[summaryApi.logout.method](
        summaryApi.logout.url,
        {},
        { withCredentials: true }
      );
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    signupSuccess: false,
  },
  reducers: {
    resetSignupSuccess: (state) => {
      state.signupSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupSuccess = true;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetSignupSuccess } = authSlice.actions;
export default authSlice.reducer;
