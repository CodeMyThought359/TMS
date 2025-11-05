

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPost } from "../../utils/helpers";
import {
  validateAdminForm,
  checkAdminUniqueness,
} from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";

function AdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    temple_id: "",
    role: "admin",
  });
  const [alert, setAlert] = useState(null);
  const [temples, setTemples] = useState([]);
  const [checking, setChecking] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const token = localStorage.getItem("token");

  // ✅ Fetch temples excluding already assigned ones
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const [templeRes, adminRes] = await Promise.all([
          apiGet("/temples", { headers: { Authorization: `Bearer ${token}` } }),
          apiGet("/admin", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const assignedTempleIds = (adminRes.data || adminRes).map(
          (a) => a.temple_id
        );

        const options = (templeRes.data || templeRes)
          .filter((t) => !assignedTempleIds.includes(t.id))
          .map((t) => ({ value: t.id, label: t.name }));

        setTemples(options);
      } catch (err) {
        console.error("Failed to fetch temples:", err);
      }
    };
    fetchTemples();
  }, [token]);

  // ✅ Form fields
  const fields = [
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select temple" }, ...temples],
    },
    {
      name: "name",
      label: "Admin Name",
      type: "text",
      placeholder: "Enter admin name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "number",
      placeholder: "Enter 10-digit phone number",
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      placeholder: "Enter password",
    },
  ];

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) setForm({ ...form, phone: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    // Step 1️⃣ - Validate fields
    const validation = validateAdminForm(form);
    if (!validation.valid) {
      setAlert({ type: "error", message: validation.message });
      return;
    }

    // Step 2️⃣ - Check for duplicate email/phone
    setChecking(true);
    const uniqueCheck = await checkAdminUniqueness(form, token);
    setChecking(false);

    if (!uniqueCheck.valid) {
      setAlert({ type: "error", message: uniqueCheck.message });
      return;
    }

    // Step 3️⃣ - Submit form
    try {
      await apiPost("/admin", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Admin added successfully!" });
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        temple_id: "",
        role: "admin",
      });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to add admin" });
    }
  };

  // ✅ Auto-dismiss alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // ✅ Permission check
  if (role !== "super_admin") {
    return (
      <div className="p-6">🚫 You don’t have permission to add admins.</div>
    );
  }

  return (
    <div className="p-6">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2>🏛️ Add Admin</h2>
        <IconButton
          icon={FaList}
          label="Admin List"
          onClick={() => navigate("/admin-table")}
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
        submitLabel={checking ? "Checking..." : "Save Admin"}
        disabled={checking}
      />
    </div>
  );
}

export default AdminPage;
