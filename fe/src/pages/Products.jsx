import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Products() {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const nav = useNavigate();

  const fetchData = () => {
    API.get("/products").then(res => setList(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`);
    fetchData();
  };

  const handleUpdate = async () => {
    await API.put(`/products/${editData._id}`, editData);
    alert("Updated successfully ✅");
    setEditData(null);
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

        {/* ✅ TABLE FIX */}
        <div style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>SKU</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map((p) => (
                <tr key={p._id} style={styles.tr}>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.sku}</td>
                  <td style={styles.td}>{p.quantity}</td>
                  <td style={styles.td}>₹{p.sellingPrice || 0}</td>

                  <td style={styles.td}>
                    <button
                      style={styles.editBtn}
                      onClick={() => setEditData(p)}
                    >
                      Edit
                    </button>

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
        </div>
      </div>

      {/* ✅ MODAL */}
      {editData && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Product ✏️</h3>

            <input
              style={styles.input}
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              style={styles.input}
              value={editData.sku}
              onChange={(e) =>
                setEditData({ ...editData, sku: e.target.value })
              }
              placeholder="SKU"
            />

            <input
              style={styles.input}
              type="number"
              value={editData.quantity}
              onChange={(e) =>
                setEditData({ ...editData, quantity: e.target.value })
              }
              placeholder="Quantity"
            />

            <input
              style={styles.input}
              type="number"
              value={editData.sellingPrice}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  sellingPrice: e.target.value
                })
              }
              placeholder="Price"
            />

            <div style={styles.modalActions}>
              <button style={styles.saveBtn} onClick={handleUpdate}>
                Update
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 🎨 FIXED STYLES
const styles = {
  container: {
    background: "#f4f6f8",
    minHeight: "100vh"
  },
  content: {
    padding: "20px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  addBtn: {
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  // ✅ TABLE FIX
  tableBox: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  thead: {
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

  editBtn: {
    marginRight: "10px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  },

  // MODAL
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  modalActions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  saveBtn: {
    flex: 1,
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "10px"
  },
  cancelBtn: {
    flex: 1,
    background: "#9ca3af",
    color: "#fff",
    border: "none",
    padding: "10px"
  }
};