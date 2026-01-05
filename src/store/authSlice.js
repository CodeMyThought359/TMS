


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  forgotPasswordApi,
  changePasswordApi,
} from "../utils/helpers";

/* ---------------------- 🔑 ASYNC THUNKS ---------------------- */

// 🔹 Login (Email / Phone)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, phone, password }, { rejectWithValue }) => {
    try {
      const res = await loginApi({ email, phone, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (res.temple_id) localStorage.setItem("temple_id", res.temple_id);

      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// 🔹 Forgot Password (EMAIL ONLY – send link)
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi({ email });
    } catch (err) {
      return rejectWithValue(err.message || "Failed to send reset link");
    }
  }
);
// 🔹 Reset Password (Email or Phone)
// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async (payload, { rejectWithValue }) => {
//     try {
//       return await resetPasswordApi(payload); // payload = { email/phone, otp, newPassword }
//     } catch (err) {
//       return rejectWithValue(err.message || "Reset failed");
//     }
//   }
// );
// 🔹 Change Password (Logged-in user)
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
    step: "login", // login | forgot
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
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.temple_id = null;
      state.step = "login";
      state.alert = null;

      localStorage.clear();
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
        state.temple_id = action.payload.temple_id || null;
        state.alert = {
          type: "success",
          message: "Login successful",
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
        state.alert = {
          type: "success",
          message: action.payload.message || "Reset link sent to email",
        };

        // 👇 IMPORTANT: go back to login
        state.step = "login";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
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
        state.alert = {
          type: "success",
          message: action.payload.message || "Password changed successfully",
        };
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      });
  },
});

export const { setStep, logout } = authSlice.actions;
export default authSlice.reducer;
