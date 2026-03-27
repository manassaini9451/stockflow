import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Products() {
  const [list, setList] = useState([]);
  const nav = useNavigate();

  const fetchData = () => {
    API.get("/products")
      .then(res => setList(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await API.delete(`/products/${id}`);
    fetchData();
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <div style={styles.header}>
          <h2>Products 📦</h2>
          <button
            style={styles.addBtn}
            onClick={() => nav("/add-product")}
          >
            + Add Product
          </button>
        </div>

        <div style={styles.tableBox}>
          {list.length === 0 ? (
            <p>No products found</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.sku}</td>
                    <td>{p.quantity}</td>
                    <td>₹ {p.sellingPrice || 0}</td>

                    <td>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => deleteItem(p._id)}
                      >
                        Delete
                      </button>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  addBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  tableBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer"
  }
};