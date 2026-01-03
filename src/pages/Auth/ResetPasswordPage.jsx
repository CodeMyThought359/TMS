import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../../utils/helpers";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = async () => {
    if (password !== confirmPassword)
      return setAlert({ type: "error", message: "Passwords do not match" });

    try {
      const res = await resetPasswordApi(token, { password });
      setAlert({ type: "success", message: res.message });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  return (
    <div className="login-card">
      <h2>🔐 Reset Password</h2>
      {alert && <Alert {...alert} />}

      <Input type="password" label="New Password" onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" label="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />

      <Button onClick={handleSubmit}>Reset Password</Button>
    </div>
  );
}
