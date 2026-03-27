import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProductForm() {
  const nav = useNavigate();

  const [data, setData] = useState({
    name: "",
    sku: "",
    quantity: "",
    sellingPrice: ""
  });

  const handleSubmit = async () => {
    if (!data.name || !data.sku) {
      alert("Name and SKU are required");
      return;
    }

    try {
      await API.post("/products", {
        ...data,
        quantity: Number(data.quantity),
        sellingPrice: Number(data.sellingPrice)
      });

      alert("Product added successfully ✅");
      nav("/products");

    } catch (err) {
      alert("Error adding product ❌");
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>Add Product 📦</h2>

          <input
            style={styles.input}
            placeholder="Product Name"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="SKU"
            onChange={(e) =>
              setData({ ...data, sku: e.target.value })
            }
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Quantity"
            onChange={(e) =>
              setData({ ...data, quantity: e.target.value })
            }
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Selling Price"
            onChange={(e) =>
              setData({ ...data, sellingPrice: e.target.value })
            }
          />

          <div style={styles.actions}>
            <button style={styles.saveBtn} onClick={handleSubmit}>
              Save Product
            </button>

            <button
              style={styles.cancelBtn}
              onClick={() => nav("/products")}
            >
              Cancel
            </button>
          </div>
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
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  saveBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  cancelBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#9ca3af",
    color: "#fff",
    cursor: "pointer"
  }
};