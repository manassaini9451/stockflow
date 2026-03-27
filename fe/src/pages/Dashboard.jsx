import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    lowStock: []
  });

  useEffect(() => {
    API.get("/products/dashboard/summary")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <h1 style={styles.heading}>Dashboard 📊</h1>

        {/* 🔹 Cards */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <p>Total Products</p>
            <h2>{data.totalProducts}</h2>
          </div>

          <div style={styles.card}>
            <p>Total Quantity</p>
            <h2>{data.totalQuantity}</h2>
          </div>
        </div>

        {/* 🔹 Low Stock Table */}
        <div style={styles.tableBox}>
          <h2 style={styles.subHeading}>Low Stock Items ⚠️</h2>

          {data.lowStock.length === 0 ? (
            <p>No low stock items 🎉</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.theadRow}>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>SKU</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Threshold</th>
                </tr>
              </thead>

              <tbody>
                {data.lowStock.map((p) => (
                  <tr key={p._id} style={styles.tr}>
                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>{p.sku}</td>
                    <td style={styles.qty}>{p.quantity}</td>
                    <td style={styles.td}>{p.threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES (CLEAN + PROFESSIONAL)
const styles = {
  container: {
    background: "#f4f6f8",
    minHeight: "100vh"
  },
  content: {
    padding: "20px"
  },
  heading: {
    marginBottom: "20px"
  },

  // 🔹 Cards
  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px"
  },
  card: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  // 🔹 Table
  tableBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  subHeading: {
    marginBottom: "10px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
  },
  theadRow: {
    background: "#f1f5f9"
  },
  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #e5e7eb"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb"
  },
  tr: {
    transition: "0.2s"
  },
  qty: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    color: "red",
    fontWeight: "bold"
  }
};