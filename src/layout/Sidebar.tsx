

import { Link, useLocation } from "react-router-dom";
import { MENU } from "../config/menu";
import { useAuth } from "../auth/AuthContext";
import { useModules } from "../hooks/useModules";

const Sidebar = () => {
  const { user } = useAuth();
  const modules = useModules();
  const location = useLocation();

  if (!user) return null;

  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.logo}>Temple System</h3>

      <nav>
        {MENU.filter(item => {
          if (!item.roles.includes(user.role)) return false;
          if (item.module && !modules.includes(item.module)) return false;
          return true;
        }).map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              ...(location.pathname === item.path ? styles.active : {}),
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: 240,
    backgroundColor: "#1f2937",
    color: "#fff",
    padding: 20,
  },
  logo: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 600,
  },
  link: {
    display: "block",
    padding: "10px 12px",
    marginBottom: 6,
    color: "#d1d5db",
    textDecoration: "none",
    borderRadius: 6,
    fontSize: 14,
  },
  active: {
    backgroundColor: "#374151",
    color: "#fff",
  },
};

export default Sidebar;
