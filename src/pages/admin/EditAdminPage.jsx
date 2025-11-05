
import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import {
  validateAdminForm,
  checkAdminUniqueness,
} from "../../utils/validation";
import { useParams, useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";

function EditAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    temple_id: "",
  });
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [alert, setAlert] = useState(null);

  // ✅ Fetch admin + temple data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch admin details
        const adminRes = await apiGet(`/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          name: adminRes.name || "",
          email: adminRes.email || "",
          phone: adminRes.phone || "",
          password: "",
          temple_id: adminRes.temple_id || "",
        });

        // Fetch temples
        const templesRes = await apiGet("/temples", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const options = (templesRes.data || templesRes).map((t) => ({
          value: t.id,
          label: t.name,
        }));
        setTemples(options);
      } catch (err) {
        console.error("Failed to fetch admin or temples:", err);
        setAlert({
          type: "error",
          message: "❌ Failed to load admin or temple data",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  // ✅ Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && /^\d{0,10}$/.test(value)) {
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    // Step 1️⃣: Validate fields
    const validation = validateAdminForm(form, true);
    if (!validation.valid) {
      setAlert({ type: "error", message: validation.message });
      return;
    }

    // Step 2️⃣: Check email + phone uniqueness (ignore same admin ID)
    setChecking(true);
    const uniqueCheck = await checkAdminUniqueness(form, token, id);
   

    setChecking(false);

    if (!uniqueCheck.valid) {
      setAlert({ type: "error", message: uniqueCheck.message });
      return;
    }

    // Step 3️⃣: Submit API update
    try {
      await apiPut(`/admin/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Admin updated successfully!" });
      setTimeout(() => navigate("/admin-table"), 1200);
    } catch (err) {
      console.error("Update failed:", err);
      setAlert({ type: "error", message: "❌ Failed to update admin" });
    }
  };

  // ✅ Auto-hide alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (loading) return <p>Loading...</p>;

  const fields = [
    { name: "name", label: "Admin Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "number" },
    {
      name: "password",
      label: "Password (leave blank to keep same)",
      type: "text",
      placeholder: "Optional",
    },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select temple" }, ...temples],
    },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h2>👤 Edit Admin</h2>
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
        submitLabel={checking ? "Checking..." : "Save Changes"}
        disabled={checking}
      />
    </div>
  );
}

export default EditAdminPage;
