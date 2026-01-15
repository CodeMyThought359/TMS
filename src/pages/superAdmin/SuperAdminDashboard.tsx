import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  return (
    <div className="dashboard-container">
     
      <div className="stats-grid">
        <StatCard title="Active Temples" value={12} />
        <StatCard title="Inactive Temples" value={3} />

        <StatCard title="Active Members" value={245} />
        <StatCard title="Inactive Members" value={18} />

        <StatCard title="Active Staff" value={56} />
        <StatCard title="Inactive Staff" value={4} />

        <StatCard title="Total Donations" value="₹ 4,25,000" />
        <StatCard title="Total Tokens" value={1820} />

        <StatCard title="Total Seva Amount" value="₹ 1,80,000" />
        <StatCard title="Total Pooja Amount" value="₹ 2,45,000" />
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
};

export default SuperAdminDashboard;
