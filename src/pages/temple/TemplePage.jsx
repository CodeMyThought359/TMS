
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiPost } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";
import {
  validateTempleForm,
  checkTemplePhoneExists,
} from "../../utils/validation";

function TemplePage() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    phone: "",
  });
  const [alert, setAlert] = useState(null);
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const fields = [
    {
      name: "phone",
      label: "Temple Phone",
      type: "number",
      placeholder: "Enter temple phone number",
    },
    {
      name: "name",
      label: "Temple Name",
      type: "text",
      placeholder: "Enter temple name",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter location",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // ✅ Step 1: Validate basic form
    const { valid, message } = validateTempleForm(form);
    if (!valid) {
      setAlert({ type: "error", message });
      return;
    }

    // ✅ Step 2: Check if phone number already exists
    setChecking(true);
    const exists = await checkTemplePhoneExists(form.phone);
    setChecking(false);

    if (exists) {
      setAlert({
        type: "error",
        message:
          "❌ This phone number is already registered with another temple.",
      });
      return;
    }

    // ✅ Step 3: Submit new temple
    try {
      await apiPost("/temples", form);
      setAlert({ type: "success", message: "✅ Temple added successfully!" });
      setForm({ name: "", location: "", description: "", phone: "" });

      // Redirect after short delay
      setTimeout(() => {
        setAlert(null);
        navigate("/temple-table");
      }, 1500);
    } catch (err) {
      console.error("Temple add error:", err);
      setAlert({ type: "error", message: "❌ Failed to add temple" });
    }
  };

  if (role !== "super_admin") {
    return <div className="p-6">🚫 You don’t have permission to add temples.</div>;
  }

  return (
    <div className="p-6">
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h2>🏛️ Add Temple</h2>
        <IconButton
          icon={FaList}
          label="Temple List"
          onClick={() => navigate("/temple-table")}
        />
      </div>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={checking ? "Checking..." : "Save Temple"}
        disabled={checking}
      />
    </div>
  );
}

export default TemplePage;
