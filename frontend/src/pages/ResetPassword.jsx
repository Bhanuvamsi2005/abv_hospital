// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api";

// export default function ResetPassword() {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");

//   const reset = async () => {
//     await API.post(`/auth/reset-password/${token}`, { password });
//     alert("Password updated");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Reset Password</h2>

//       <input type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       /><br /><br />

//       <button onClick={reset}>Update</button>
//     </div>
//   );
// }







import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "./pages.css";
import "./Global.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const reset = async () => {
    await API.post(`/auth/reset-password/${token}`, { password });
    alert("Password updated successfully");
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">
        <div className="auth-icon">🔒</div>
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your new password below</p>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-submit" onClick={reset}>
          Update Password →
        </button>

        <div className="auth-back">
          <a href="/login">← Back to Login</a>
        </div>
      </div>
    </div>
  );
}