import { useState } from "react";
import { useAuth } from "../context/authContext";
import { api } from "../services/api";

export default function LoginRegister() {
  const { login } = useAuth();

  const [mode, setMode] = useState("login"); // login | register
  const [msg, setMsg] = useState("");

  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const [reg, setReg] = useState({
    login_name: "",
    password: "",
    confirm: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  async function doLogin() {
    setMsg("");
    try {
      await login(loginName, password);
    } catch {
      setMsg("Login failed");
    }
  }

  async function register() {
    setMsg("");
    if (reg.password !== reg.confirm) {
      setMsg("Password mismatch");
      return;
    }

    try {
      await api("/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reg),
      });

      setMsg("Register success. Please login!");
      setMode("login");
      setLoginName(reg.login_name);
      setPassword("");
    } catch {
      setMsg("Register failed");
    }
  }

  /* ===== STYLE ===== */
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  };

  const boxStyle = {
    width: 420,
    background: "#ffffff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#000000",       // 👈 chữ khi gõ sẽ đen
    fontSize: 14,
    outline: "none",
  };

  const switchBtn = (active) => ({
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: active ? "#2563eb" : "#ffffff",
    color: active ? "#ffffff" : "#111827",
    fontWeight: 600,
    cursor: "pointer",
  });

  const submitBtn = {
    width: "100%",
    marginTop: 14,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#111827",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={boxStyle}>
        <h2 style={{ textAlign: "center", marginBottom: 6 }}>
          {mode === "login" ? "Login" : "Register"}
        </h2>

        <p style={{ textAlign: "center", color: "#6b7280" }}>
          {mode === "login"
            ? "Login to continue"
            : "Create a new account"}
        </p>

        {/* Login / Register switch */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={switchBtn(mode === "login")} onClick={() => setMode("login")}>
            Login
          </button>
          <button
            style={switchBtn(mode === "register")}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        {mode === "login" ? (
          <>
            <input
              style={inputStyle}
              placeholder="login name"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
            <input
              style={inputStyle}
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={submitBtn} onClick={doLogin}>
              Login
            </button>
          </>
        ) : (
          <>
            {Object.keys(reg).map((k) => (
              <input
                key={k}
                style={inputStyle}
                type={["password", "confirm"].includes(k) ? "password" : "text"}
                placeholder={k}
                value={reg[k]}
                onChange={(e) => setReg({ ...reg, [k]: e.target.value })}
              />
            ))}
            <button style={submitBtn} onClick={register}>
              Register Me
            </button>
          </>
        )}

        {msg && (
          <div
            style={{
              marginTop: 12,
              textAlign: "center",
              color: "#dc2626",
              fontWeight: 600,
            }}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
