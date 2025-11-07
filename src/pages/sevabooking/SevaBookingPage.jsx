import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPost } from "../../utils/helpers";
import { isFutureDate } from "../../utils/date";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getTempleIdFromToken } from "../../utils/token";

function SevaBookingPage() {
  const temple_id = getTempleIdFromToken();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    devotee_name: "",
    seva_date: "",
    temple_id: temple_id || "",
    deity_name: "",
    seva_name: "",
    gothra: "",
    nakshatra: "",
    rashi: "",
    amount: "",
    status: "confirmed",
  });

  const [alert, setAlert] = useState(null);
  const [deities, setDeities] = useState([]);
  const [sevas, setSevas] = useState([]);
  const [devotees, setDevotees] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Compute tomorrow’s date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // ✅ Fetch dropdown options
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        // --- Devotees ---
        const devoteeRes = await apiGet("/devotees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevotees(
          (devoteeRes.data || devoteeRes).map((d) => ({
            value: `${d.first_name} ${d.last_name}`,
            label: `${d.first_name} ${d.last_name}`,
          }))
        );

        // --- Deities ---
        let deityRes;
        try {
          deityRes = await apiGet(`/deity?temple_id=${temple_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch {
          deityRes = await apiGet("/deity", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        const allDeities = deityRes.data || deityRes;
        const filteredDeities = allDeities.filter(
          (d) => String(d.temple_id) === String(temple_id)
        );
        setDeities(filteredDeities.map((d) => ({ value: d.name, label: d.name })));

        // --- Sevas ---
        let sevaRes;
        try {
          sevaRes = await apiGet(`/seva?temple_id=${temple_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch {
          sevaRes = await apiGet("/seva", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        const allSevas = sevaRes.data || sevaRes;
        const filteredSevas = allSevas.filter(
          (s) => String(s.temple_id) === String(temple_id)
        );
        setSevas(filteredSevas); // 👈 Keep full seva data (not just names)
      } catch (err) {
        console.error("Failed to fetch options", err);
        setAlert({ type: "error", message: "❌ Failed to load form options" });
      } finally {
        setLoading(false);
      }
    };

    if (temple_id && token) fetchOptions();
  }, [temple_id, token]);

  // ✅ Input Change Handler (auto-fill amount when seva selected)
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    // 👇 Auto-fill amount based on seva_name
    if (name === "seva_name") {
      const selectedSeva = sevas.find((s) => s.name === value);
      if (selectedSeva) {
        updatedForm.amount = selectedSeva.amount || "";
      }
    }

    setForm(updatedForm);
  };

  // ✅ Form fields
  const fields = [
    {
      name: "devotee_name",
      label: "Devotee",
      type: "select",
      options: [{ value: "", label: "Select Devotee" }, ...devotees],
    },
    {
      name: "seva_date",
      label: "Seva Date",
      type: "date",
      min: minDate,
      placeholder: "Select Seva Date",
    },
    {
      name: "deity_name",
      label: "Deity",
      type: "select",
      options: [{ value: "", label: "Select Deity" }, ...deities],
    },
    {
      name: "seva_name",
      label: "Seva",
      type: "select",
      options: [
        { value: "", label: "Select Seva" },
        ...sevas.map((s) => ({ value: s.name, label: s.name })),
      ],
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      placeholder: "Enter Amount",
      readOnly: true, // 👈 prevent manual editing (auto-filled)
    },
    {
      name: "gothra",
      label: "Gothra",
      type: "select",
      options: [
        { value: "", label: "Select Gothra" },
        { value: "Bharadwaj", label: "Bharadwaj" },
        { value: "Kashyap", label: "Kashyap" },
        { value: "Vashishtha", label: "Vashishtha" },
        { value: "Vishwamitra", label: "Vishwamitra" },
        { value: "Gautam", label: "Gautam" },
        { value: "Atri", label: "Atri" },
        { value: "Agastya", label: "Agastya" },
        { value: "Jamadagni", label: "Jamadagni" },
        { value: "Kaushik", label: "Kaushik" },
      ],
    },
    {
      name: "nakshatra",
      label: "Nakshatra",
      type: "select",
      options: [
        { value: "", label: "Select Nakshatra" },
        { value: "Ashwini", label: "Ashwini" },
        { value: "Bharani", label: "Bharani" },
        { value: "Krittika", label: "Krittika" },
        { value: "Rohini", label: "Rohini" },
        { value: "Mrigashira", label: "Mrigashira" },
      ],
    },
    {
      name: "rashi",
      label: "Rashi",
      type: "select",
      options: [
        { value: "", label: "Select Rashi" },
        { value: "Mesha (Aries)", label: "Mesha (Aries)" },
        { value: "Vrishabha (Taurus)", label: "Vrishabha (Taurus)" },
      ],
    },
  ];

  // ✅ Submit Handler
  const handleSubmit = async () => {
    try {
      if (!isFutureDate(form.seva_date)) {
        setAlert({
          type: "warning",
          message: "⚠️ Please select a future date for Seva.",
        });
        return;
      }

      const payload = {
        ...form,
        temple_id: parseInt(temple_id),
        amount: form.amount ? parseFloat(form.amount) : 0,
      };

      await apiPost("/bookings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlert({ type: "success", message: "✅ Booking created successfully!" });

      setForm({
        devotee_name: "",
        seva_date: "",
        temple_id: temple_id || "",
        deity_name: "",
        seva_name: "",
        gothra: "",
        nakshatra: "",
        rashi: "",
        amount: "",
        status: "confirmed",
      });

      // navigate("/seva-bookings-table");
    } catch (err) {
      console.error("Booking API Error:", err);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "❌ Failed to create booking",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">➕ Seva Booking</h2>
        <Button>
          <Link to="/seva-bookings-table">Seva Booking List</Link>
        </Button>
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
        submitLabel={loading ? "Loading..." : "Create Booking"}
        disabled={loading}
      />
    </div>
  );
}

export default SevaBookingPage;
