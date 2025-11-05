
// features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
  changePasswordApi,
} from "../utils/helpers";

/* ---------------------- 🔑 ASYNC THUNKS ---------------------- */

// 🔹 Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, name, phone, password }, { rejectWithValue }) => {
    try {
      const res = await loginApi({ email, name, phone, password });

      // Store auth details
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (res.temple_id) localStorage.setItem("temple_id", res.temple_id);

      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// 🔹 Forgot password (Email or Phone)
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi(payload); // payload = { email } OR { phone }
    } catch (err) {
      return rejectWithValue(err.message || "Failed to send OTP");
    }
  }
);

// 🔹 Verify OTP (Email or Phone)
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyOtpApi(payload); // payload = { email, otp } OR { phone, otp }
    } catch (err) {
      return rejectWithValue(err.message || "Invalid OTP");
    }
  }
);

// 🔹 Reset Password (Email or Phone)
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await resetPasswordApi(payload); // payload = { email/phone, otp, newPassword }
    } catch (err) {
      return rejectWithValue(err.message || "Reset failed");
    }
  }
);

// 🔹 Change Password (for logged-in users)
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      return await changePasswordApi({ oldPassword, newPassword });
    } catch (err) {
      return rejectWithValue(err.message || "Failed to change password");
    }
  }
);

/* ---------------------- 🔒 SLICE ---------------------- */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    step: "login", // login | forgot | otp | reset
    loading: false,
    alert: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    temple_id: localStorage.getItem("temple_id") || null,
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.temple_id = null;
      state.step = "login";
      state.alert = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("temple_id");
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------------- LOGIN ---------------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        if (action.payload.temple_id)
          state.temple_id = action.payload.temple_id;
        state.alert = {
          type: "success",
          message: action.payload.message || "Login successful",
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      /* ---------------- FORGOT PASSWORD ---------------- */
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
        state.step = "otp";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      /* ---------------- VERIFY OTP ---------------- */
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
        state.step = "reset";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      /* ---------------- RESET PASSWORD ---------------- */
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
        state.step = "login";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      /* ---------------- CHANGE PASSWORD ---------------- */
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      });
  },
});

export const { setStep, setAlert, logout } = authSlice.actions;
export default authSlice.reducer;
