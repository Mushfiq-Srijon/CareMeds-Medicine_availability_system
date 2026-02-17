import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validation
    if (!role) {
      alert("Please select a role");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Success");
        console.log("Success:", data);
        navigate("/login"); // Redirect to login
      } else {
        alert("Registration Failed: " + (data.message || "Check inputs"));
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>

        {/* Name */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder=" "
          />
          <label
            style={{
              ...styles.label,
              top: name ? "-10px" : "50%",
              fontSize: name ? "12px" : "16px",
              color: name ? "#4da6ff" : "#e0e0e0",
            }}
          >
            Name
          </label>
        </div>

        {/* Email */}
        <div style={styles.inputGroup}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder=" "
          />
          <label
            style={{
              ...styles.label,
              top: email ? "-10px" : "50%",
              fontSize: email ? "12px" : "16px",
              color: email ? "#4da6ff" : "#e0e0e0",
            }}
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div style={styles.inputGroup}>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder=" "
          />
          <label
            style={{
              ...styles.label,
              top: password ? "-10px" : "50%",
              fontSize: password ? "12px" : "16px",
              color: password ? "#4da6ff" : "#e0e0e0",
            }}
          >
            Password
          </label>
        </div>

        {/* Confirm Password */}
        <div style={styles.inputGroup}>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            placeholder=" "
          />
          <label
            style={{
              ...styles.label,
              top: confirmPassword ? "-10px" : "50%",
              fontSize: confirmPassword ? "12px" : "16px",
              color: confirmPassword ? "#4da6ff" : "#e0e0e0",
            }}
          >
            Confirm Password
          </label>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: "30px" }}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="shopkeeper">Shopkeeper</option>
          </select>
        </div>

        {/* Register Button */}
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    padding: "50px 40px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    width: "380px",
    color: "#fff",
  },
  title: {
    marginBottom: "40px",
    fontWeight: "700",
    fontSize: "28px",
    letterSpacing: "1px",
  },
  inputGroup: {
    position: "relative",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    color: "#fff",
    fontSize: "16px",
    transition: "0.3s",
  },
  label: {
    position: "absolute",
    left: "15px",
    transform: "translateY(-50%)",
    transition: "0.2s ease all",
    pointerEvents: "none",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #3f0d90, #090909)",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
  },
  loginText: {
    marginTop: "25px",
    fontSize: "14px",
    color: "#b9dce8",
  },
  loginLink: {
    color: "#4da6ff",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Register;
