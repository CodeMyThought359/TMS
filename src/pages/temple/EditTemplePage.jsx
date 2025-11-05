import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";
import { validateTempleForm, checkTemplePhoneExists } from "../../utils/validation";

function EditTemplePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [checking, setChecking] = useState(false);

  // ✅ Fetch temple by ID
  useEffect(() => {
    const fetchTemple = async () => {
      setLoading(true);
      try {
        const res = await apiGet(`/temples/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res.data || res);
      } catch (err) {
        console.error("Failed to load temple:", err);
        setAlert({ type: "error", message: "❌ Failed to load temple" });
      } finally {
        setLoading(false);
      }
    };

    fetchTemple();
  }, [id, token]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit
  const handleSubmit = async () => {
    const { valid, message } = validateTempleForm(form);
    if (!valid) {
      setAlert({ type: "error", message });
      return;
    }

    // ✅ Step 2: Check if phone number already exists (ignore same temple)
    setChecking(true);
    const exists = await checkTemplePhoneExists(form.phone, id);
    setChecking(false);

    if (exists) {
      setAlert({
        type: "error",
        message: "❌ This phone number is already registered with another temple.",
      });
      return;
    }

    // ✅ Clean up data before sending
    const { id: _id, created_at, ...updateData } = form;

    try {
      await apiPut(`/temples/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Temple updated successfully!" });

      // Auto dismiss and redirect
      setTimeout(() => {
        setAlert(null);
        navigate("/temple-table");
      }, 1200);
    } catch (err) {
      console.error("API Error:", err);
      setAlert({ type: "error", message: "❌ Failed to update temple" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>No temple found.</p>;

  // ✅ Define fields explicitly for consistent UX
  const fields = [
    { name: "phone", label: "Temple Phone", type: "number" },
    { name: "name", label: "Temple Name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "description", label: "Description", type: "text" },
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
        <h2>🏛️ Edit Temple</h2>
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
        submitLabel={checking ? "Checking..." : "Save Changes"}
        disabled={checking}
      />
    </div>
  );
}

export default EditTemplePage;
