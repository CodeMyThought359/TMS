
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
    identifier: "",
    password: "",
    otp: "",
    newPassword: "",
  });

  const inputsRef = useRef([]);

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleChange = (e) => {
    formRef.current[e.target.name] = e.target.value.trim();
  };

  const handleOtpChange = (value, idx) => {
    if (/^[0-9]?$/.test(value)) {
      const otpArr = formRef.current.otp.split("");
      otpArr[idx] = value;
      formRef.current.otp = otpArr.join("");
      if (value && idx < 5) inputsRef.current[idx + 1]?.focus();
    }
  };

  const detectIdentifierType = (value) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^\d{10,15}$/.test(value);
    if (isEmail) return "email";
    if (isPhone) return "phone";
    return "name";
  };

  const handleLogin = () => {
    const { identifier, password } = formRef.current;
    if (!identifier || !password) {
      alert("Please fill in all fields");
      return;
    }
    const type = detectIdentifierType(identifier);
    dispatch(loginUser({ [type]: identifier, password }));
  };

  const handleForgotPassword = () => {
    const { identifier } = formRef.current;
    if (!identifier) {
      alert("Please enter your Email or Phone");
      return;
    }

    const type = detectIdentifierType(identifier);
    dispatch(forgotPassword({ [type]: identifier }));
  };

  const handleVerifyOtp = () => {
    const { identifier, otp } = formRef.current;
    if (!otp || otp.length !== 6) {
      alert("Please enter valid 6-digit OTP");
      return;
    }

    const type = detectIdentifierType(identifier);
    dispatch(verifyOtp({ [type]: identifier, otp }));
  };

  const handleResetPassword = () => {
    const { identifier, otp, newPassword } = formRef.current;
    if (!newPassword) {
      alert("Please enter a new password");
      return;
    }

    const type = detectIdentifierType(identifier);
    dispatch(resetPassword({ [type]: identifier, otp, newPassword }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>
          🔐{" "}
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
              placeholder="Enter Email, Phone, or Username"
              onChange={handleChange}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <Button onClick={handleLogin}>Login</Button>
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
              placeholder="Enter your Email or Phone"
              onChange={handleChange}
            />
            <Button onClick={handleForgotPassword}>Send OTP</Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("login"))}>
              Back to Login
            </Button>
          </>
        )}

        {/* ===== OTP VERIFY ===== */}
        {step === "otp" && (
          <>
            <p className="otp-instruction">
              Enter the 6-digit OTP sent to your email or phone.
            </p>
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
            <Button onClick={handleVerifyOtp}>Verify OTP</Button>
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
              placeholder="Enter new password"
              onChange={handleChange}
            />
            <Button onClick={handleResetPassword}>Reset Password</Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("login"))}>
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
