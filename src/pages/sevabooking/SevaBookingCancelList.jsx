import React, { useState, useEffect } from "react";
import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";
import { apiGet } from "../../utils/helpers";
import { getTempleIdFromToken } from "../../utils/token";

function SevaBookingCancelList() {
  const temple_id = getTempleIdFromToken();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const columns = [
    { field: "id", label: "ID" },
    { field: "temple_id", label: "Temple" },
    { field: "devotee_name", label: "Devotee" },
    { field: "deity_name", label: "Deity" },
    { field: "seva_name", label: "Seva" },
    { field: "amount", label: "Amount" },
    { field: "seva_date", label: "Seva Date" },
    { field: "status", label: "Status" },
    { field: "remarks", label: "Remarks" },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      try {
        res = await apiGet(`/bookings?temple_id=${temple_id}`);
      } catch (err) {
        res = await apiGet("/bookings");
      }

      const allBookings = res.data || res;
      const cancelled = allBookings.filter(
        (b) => String(b.temple_id) === String(temple_id) && b.status === "cancelled"
      );

      setData(cancelled);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to fetch cancelled bookings" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (temple_id) fetchData();
  }, [temple_id]);

  return (
    <div className="p-6">
      <h2>❌ Cancelled Seva Bookings</h2>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <Loader />
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
}

export default SevaBookingCancelList;
