import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import {
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  setStep,
} from "../../store/authSlice";
import "./LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, loading, alert, token } = useSelector((state) => state.auth);

  const formRef = useRef({
    identifier: "", // email / phone / username
    password: "",
    otp: "",
    newPassword: "",
  });

  const inputsRef = useRef([]);

  const handleChange = (e) => {
    formRef.current[e.target.name] = e.target.value;
  };

  // Handle OTP input
  const handleOtpChange = (value, idx) => {
    if (/^[0-9]?$/.test(value)) {
      const otpArr = formRef.current.otp.split("");
      otpArr[idx] = value;
      formRef.current.otp = otpArr.join("");
      if (value && idx < 5) inputsRef.current[idx + 1]?.focus();
    }
  };

  // Redirect on login success
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  // Detect input type (email / phone / username)
  const getLoginPayload = () => {
    const value = formRef.current.identifier.trim();
    const password = formRef.current.password;

    if (!value || !password) return null;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^\d{10,15}$/.test(value);

    if (isEmail) return { email: value, password };
    if (isPhone) return { phone: value, password };
    return { name: value, password }; // fallback username
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>
          🔑{" "}
          {step === "login"
            ? "Login"
            : step === "forgot"
            ? "Forgot Password"
            : step === "otp"
            ? "Verify OTP"
            : "Reset Password"}
        </h2>

        {alert && <Alert type={alert.type} message={alert.message} />}
        {loading && <p className="loading-text">⏳ Processing...</p>}

        {/* ===== LOGIN ===== */}
        {step === "login" && (
          <>
            <Input
              label="Email / Phone / Username"
              name="identifier"
              onChange={handleChange}
              placeholder="Enter Email, Phone, or Username"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter password"
            />
            <Button
              onClick={() => {
                const payload = getLoginPayload();
                if (!payload) {
                  alert("Please enter all fields");
                  return;
                }
                dispatch(loginUser(payload));
              }}
            >
              Login
            </Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("forgot"))}>
              Forgot Password?
            </Button>
          </>
        )}

        {/* ===== FORGOT PASSWORD ===== */}
        {step === "forgot" && (
          <>
            <Input
              label="Email or Phone"
              name="identifier"
              onChange={handleChange}
              placeholder="Enter Email or Phone"
            />
            <Button
              onClick={() => {
                const value = formRef.current.identifier.trim();
                if (!value) return alert("Please enter Email or Phone");
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                const payload = isEmail ? { email: value } : { phone: value };
                dispatch(forgotPassword(payload));
              }}
            >
              Send OTP
            </Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("login"))}>
              Back to Login
            </Button>
          </>
        )}

        {/* ===== OTP VERIFY ===== */}
        {step === "otp" && (
          <>
            <p className="otp-instruction">Enter the 6-digit code sent to your email/phone</p>
            <div className="otp-inputs">
              {[...Array(6)].map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  ref={(el) => (inputsRef.current[idx] = el)}
                />
              ))}
            </div>
            <Button
              onClick={() => {
                const value = formRef.current.identifier.trim();
                const otp = formRef.current.otp;
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                const payload = isEmail ? { email: value, otp } : { phone: value, otp };
                dispatch(verifyOtp(payload));
              }}
            >
              Verify OTP
            </Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("forgot"))}>
              Back
            </Button>
          </>
        )}

        {/* ===== RESET PASSWORD ===== */}
        {step === "reset" && (
          <>
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <Button
              onClick={() => {
                const value = formRef.current.identifier.trim();
                const otp = formRef.current.otp;
                const newPassword = formRef.current.newPassword;
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                const payload = isEmail
                  ? { email: value, otp, newPassword }
                  : { phone: value, otp, newPassword };
                dispatch(resetPassword(payload));
              }}
            >
              Reset Password
            </Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("login"))}>
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
