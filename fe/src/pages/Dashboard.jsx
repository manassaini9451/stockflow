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
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <h1 style={styles.heading}>Dashboard 📊</h1>

        {/* Cards */}
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <p>Total Products</p>
            <h2>{data.totalProducts}</h2>
          </div>

          <div style={styles.card}>
            <p>Total Quantity</p>
            <h2>{data.totalQuantity}</h2>
          </div>
        </div>

        {/* Low Stock Section */}
        <div style={styles.tableBox}>
          <h2>Low Stock Items ⚠️</h2>

          {data.lowStock.length === 0 ? (
            <p style={{ marginTop: "10px" }}>
              No low stock items 🎉
            </p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              <tbody>
                {data.lowStock.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.sku}</td>
                    <td style={styles.lowStock}>
                      {p.quantity}
                    </td>
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

// 🎨 Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6f8"
  },
  content: {
    padding: "20px"
  },
  heading: {
    marginBottom: "20px"
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  card: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  tableBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px"
  },
  lowStock: {
    color: "red",
    fontWeight: "bold"
  }
};