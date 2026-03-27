import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    orgName: ""
  });

  const [error, setError] = useState("");

  // ✅ EMAIL VALIDATION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async () => {
    // ✅ FRONTEND VALIDATION
    if (!data.name || !data.email || !data.password || !data.orgName) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(data.email)) {
      setError("Enter a valid email");
      return;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    try {
      const res = await API.post("/auth/signup", data);

      localStorage.setItem("token", res.data.token);

      nav("/dashboard");

    } catch (err) {
      console.log("FULL ERROR:", err);

      // ✅ BACKEND ERROR SHOW FIX
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Signup failed";

      setError(msg);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>

        {/* 🔒 FORM AUTOFILL OFF */}
        <form autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          <input
            style={styles.input}
            name="name"
            autoComplete="off"
            placeholder="Name"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            name="email"
            autoComplete="off"
            placeholder="Email"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            style={styles.input}
            name="orgName"
            autoComplete="off"
            placeholder="Organization Name"
            onChange={(e) =>
              setData({ ...data, orgName: e.target.value })
            }
          />

          {/* 👁️ PASSWORD */}
          <div style={styles.passwordBox}>
            <input
              style={styles.passwordInput}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
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

          <button
            type="button"
            style={styles.button}
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// 🎨 STYLES
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