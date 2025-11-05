import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";
import { getTempleIdFromToken } from "../../utils/token";

function EditDeityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const temple_id = getTempleIdFromToken(); // ✅ Extract temple_id from token

  const [form, setForm] = useState({
    name: "",
    temple_id: temple_id || "",
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // ✅ Fetch deity data when page loads
  useEffect(() => {
    const fetchDeity = async () => {
      try {
        const deityRes = await apiGet(`/deity/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const deity = deityRes.data || deityRes;

        setForm({
          name: deity.name || "",
          temple_id: deity.temple_id || temple_id, // fallback from token
        });
      } catch (err) {
        console.error("❌ Failed to load deity:", err);
        setAlert({ type: "error", message: "Failed to load deity details." });
      } finally {
        setLoading(false);
      }
    };

    fetchDeity();
  }, [id, token, temple_id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    if (!form.name || !form.temple_id) {
      setAlert({ type: "error", message: "❌ Please fill all required fields." });
      return;
    }

    try {
      await apiPut(`/deity/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Deity updated successfully!" });
      setTimeout(() => navigate("/deity-table"), 1000);
    } catch (err) {
      console.error("❌ Failed to update deity:", err);
      setAlert({ type: "error", message: "Failed to update deity." });
    }
  };

  // ✅ Auto-dismiss alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (loading) return <p className="p-6">⏳ Loading deity details...</p>;

  const fields = [
    { name: "name", label: "Deity Name", type: "text", required: true },
    // If needed, you can re-enable temple select below:
    // { name: "temple_id", label: "Temple", type: "select", options: temples },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🙏 Edit Deity</h2>

      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditDeityPage;
