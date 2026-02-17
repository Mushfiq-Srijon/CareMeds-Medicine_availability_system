import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>
        <p style={styles.subtitle}>Please login or register to continue</p>

        <div style={styles.buttonGroup}>
          <Link to="/login" style={styles.link}>
            <button
              style={{
                ...styles.button,
                background: "linear-gradient(135deg, #667eea, #4a90e2)", // blue gradient for Login
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register" style={styles.link}>
            <button
              style={{
                ...styles.button,
                background: "linear-gradient(135deg, #943434, #a74653)", // warm orange gradient for Register
              }}
            >
              Register
            </button>
          </Link>
        </div>
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
    padding: "60px 50px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "40px",
    color: "#ffffff",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "14px 30px",
    border: "none",
    borderRadius: "12px",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  link: {
    textDecoration: "none",
  },
};

export default Landing;
