// import { useState } from "react";
// import API from "../api";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const send = async () => {
//     await API.post("/auth/forgot-password", { email });
//     alert("Check your email");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Forgot Password</h2>

//       <input placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       /><br /><br />

//       <button onClick={send}>Send</button>
//     </div>
//   );
// }











import { useState } from "react";
import API from "../api";
import "./pages.css";
import "./Global.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const send = async () => {
    await API.post("/auth/forgot-password", { email });
    alert("Check your email for a reset link");
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">
        <div className="auth-icon">🔑</div>
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">Enter your email and we'll send you a reset link</p>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="auth-submit" onClick={send}>
          Send Reset Link →
        </button>

        <div className="auth-back">
          <a href="/login">← Back to Login</a>
        </div>
      </div>
    </div>
  );
}