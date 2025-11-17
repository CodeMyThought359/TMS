import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../utils/helpers";
import Report from "../../components/ui/Report";
import logo from "../../assets/logo.png";


const ReportSevaBookingPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await apiGet(`/bookings/${id}`);
        setData(res.data || res);
      } catch (err) {
        console.error("Error loading report", err);
      }
    };

    fetchReport();
  }, [id]);

  return (
    <div className="p-6 print:p-0">

      {/* PRINT BUTTON */}
      <div className="mb-4 print-hide">
        <button onClick={() => window.print()} className="print-btn">
          🖨️ Print Receipt (A5)
        </button>
      </div>

      {/* PRINT-ONLY AREA */}
      <div className="print-area a5-paper">
        <Report data={data} imageUrl={logo} />
      </div>
    </div>
  );
};

export default ReportSevaBookingPage;
