
import { useAuth } from "../auth/AuthContext";
import Button from "../components/Button/Button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <h2 style={styles.title}>Dashboard</h2>

      <div style={styles.right}>
        <span style={styles.role}>{user?.role}</span>
        <Button text="Logout" onClick={logout} />
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: 64,
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  role: {
    fontSize: 14,
    color: "#555",
    background: "#eef2f7",
    padding: "4px 10px",
    borderRadius: 12,
  },
};

export default Header;
