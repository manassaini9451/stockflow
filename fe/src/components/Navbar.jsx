import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div style={styles.navbar}>
      
      {/* ✅ Logo clickable */}
      <Link to="/dashboard" style={styles.logo}>
        StockFlow 🚀
      </Link>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/settings" style={styles.link}>Settings</Link>
      </div>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

// 🎨 Styles
const styles = {
  navbar: {
    height: "60px",
    background: "#1f2937",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px"
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",   // 🔥 important
    cursor: "pointer"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500"
  },
  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer"
  }
};