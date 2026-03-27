import { useState, useEffect } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Settings() {
  const [value, setValue] = useState(5);

  useEffect(() => {
    API.get("/settings")
      .then(res => setValue(res.data.defaultLowStock))
      .catch(err => console.log(err));
  }, []);

  const update = async () => {
    try {
      await API.put("/settings", {
        defaultLowStock: Number(value)
      });

      alert("Settings updated successfully ✅");

    } catch (err) {
      alert("Error updating settings ❌");
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>Settings ⚙️</h2>

          <label style={styles.label}>
            Default Low Stock Threshold
          </label>

          <input
            style={styles.input}
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button style={styles.button} onClick={update}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f8"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },
  card: {
    width: "400px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  title: {
    textAlign: "center",
    marginBottom: "10px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "500"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};