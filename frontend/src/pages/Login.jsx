// import { useState } from "react";
// import API from "../api";

// export default function Login() {
//   const [data, setData] = useState({ email: "", password: "" });

//   const login = async () => {
//     try {
//       const res = await API.post("/auth/login", data);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("phone", res.data.phone); // ✅ NEW

//       alert("Login Success");

//       // role redirect
//       if (res.data.role === "patient") {
//         window.location.href = "/book";
//       } else if (res.data.role === "staff") {
//         window.location.href = "/doctor";
//       } else {
//         window.location.href = "/admin";
//       }

//     } catch (err) {
//       alert(err.response?.data?.detail || "Login failed");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         onChange={(e) => setData({ ...data, email: e.target.value })}
//       /><br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setData({ ...data, password: e.target.value })}
//       /><br /><br />

//       <button onClick={login}>Login</button>

//       <br /><br />
//       <a href="/register">New user? Register</a>
// <br /><br />
//       <a href="/forgot-password">Forgot Password?</a>
//     </div>
//   );
// }








import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";
import "./Global.css";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("phone", res.data.phone);

      if (res.data.role === "patient") navigate("/book");
      else if (res.data.role === "staff") navigate("/doctor");
      else navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-blob login-blob-1" />
      <div className="login-blob login-blob-2" />

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">⚕</div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your MediCore account</p>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            placeholder="you@example.com"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <button className="login-submit" onClick={login}>
          Sign In →
        </button>

        <div className="login-footer">
          <a href="/register">New user? Create an account</a>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}