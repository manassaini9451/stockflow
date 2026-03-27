import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  // ✅ EMAIL VALIDATION FUNCTION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    // ✅ VALIDATION
    if (!data.email || !data.password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(data.email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");

    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <div style={styles.passwordBox}>
          <input
            style={styles.passwordInput}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <span
            style={styles.eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* ❌ ERROR MESSAGE */}
        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
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
  passwordBox: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  passwordInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  eye: {
    position: "absolute",
    right: "10px",
    cursor: "pointer"
  },

  // ❌ ERROR STYLE
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "-5px"
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  text: {
    textAlign: "center",
    fontSize: "14px"
  },
  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "bold"
  }
};