import React from "react";
import "./report.css"; // <-- add this line

const Report = ({ data, imageUrl }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <div className="report-container">
      
      {/* Logo */}
      {imageUrl && (
        <div className="report-logo">
          <img src={imageUrl} alt="Logo" />
        </div>
      )}

      {/* Header */}
      <h2 className="report-title">Ganapathi Seva Samithi ®</h2>
      <p className="report-subtitle">
        KHB Colony Koramangala, Bangalore 560095 <br />
        Phone: 080 2553 2568 | Email: ganapathisevasamithi@gmail.com
      </p>

      <hr className="divider" />

      <div className="row">
        <span><strong>Receipt No:</strong> {data.id}</span>
        <span><strong>Date:</strong> {data.created_at}</span>
      </div>

      <p><strong>Seva:</strong> {data.seva_name}</p>
      <p><strong>Seva Date:</strong> {data.seva_date}</p>

      <p><strong>Amount:</strong> ₹ {data.amount}</p>
      <p><strong>(Rupees {data.amount} only)</strong></p>

      <p><strong>Devotee:</strong> {data.devotee_name}</p>
      <p><strong>Remarks:</strong> {data.remarks}</p>
    </div>
  );
};

export default Report;
