// import { useState } from "react";
// import API from "../api";

// export default function Register() {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "patient",
//     phone: "",
//   });

//   const register = async () => {
//     try {
//       await API.post("/auth/register", data);
//       alert("Registered successfully");
//       window.location.href = "/";
//     } catch (err) {
//       alert(err.response?.data?.detail || "Registration failed");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Register</h2>

//       <input
//         placeholder="Name"
//         onChange={(e) => setData({ ...data, name: e.target.value })}
//       /><br /><br />

//       <input
//         placeholder="Email"
//         onChange={(e) => setData({ ...data, email: e.target.value })}
//       /><br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setData({ ...data, password: e.target.value })}
//       /><br /><br />

//       <input
//         placeholder="Phone Number"
//         onChange={(e) => setData({ ...data, phone: e.target.value })}
//       /><br /><br />

//       <select onChange={(e) => setData({ ...data, role: e.target.value })}>
//         <option value="patient">Patient</option>
//         <option value="staff">Doctor</option>
//       </select><br /><br />

//       <button onClick={register}>Register</button>
//     </div>
//   );
// }










// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import "./Register.css";
// import "./Global.css";

// export default function Register() {
//   const [data, setData] = useState({
//     name: "", email: "", password: "", role: "patient", phone: "",
//   });
//   const navigate = useNavigate();

//   const register = async () => {
//     try {
//       await API.post("/auth/register", data);
//       alert("Registered successfully");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.detail || "Registration failed");
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-blob register-blob-1" />
//       <div className="register-blob register-blob-2" />

//       <div className="register-card">
//         <div className="register-header">
//           <div className="register-logo">🏥</div>
//           <h2 className="register-title">Create Account</h2>
//           <p className="register-subtitle">Join MediCore — healthcare simplified</p>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Full Name</label>
//           <input
//             className="form-input"
//             placeholder="John Doe"
//             onChange={(e) => setData({ ...data, name: e.target.value })}
//           />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label className="form-label">Email</label>
//             <input
//               className="form-input"
//               placeholder="you@email.com"
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Phone</label>
//             <input
//               className="form-input"
//               placeholder="+91 98765 43210"
//               onChange={(e) => setData({ ...data, phone: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Password</label>
//           <input
//             className="form-input"
//             type="password"
//             placeholder="••••••••"
//             onChange={(e) => setData({ ...data, password: e.target.value })}
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">Role</label>
//           <select
//             className="form-select"
//             onChange={(e) => setData({ ...data, role: e.target.value })}
//           >
//             <option value="patient">Patient</option>
//             <option value="staff">Doctor / Staff</option>
//           </select>
//         </div>

//         <button className="register-submit" onClick={register}>
//           Create Account →
//         </button>

//         <div className="register-footer">
//           <a href="/login">Already have an account? Sign in</a>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Register.css";
import "./Global.css";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
  });

  const navigate = useNavigate();

  // ✅ EMAIL VALIDATION FUNCTION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const register = async () => {
    // ✅ EMPTY FIELD CHECK
    if (!data.name || !data.email || !data.password || !data.phone) {
      alert("Please fill all fields");
      return;
    }

    // ✅ EMAIL FORMAT CHECK
    if (!isValidEmail(data.email)) {
      alert("Enter a valid email address");
      return;
    }

    // ✅ PHONE VALIDATION
    if (!/^\d{10}$/.test(data.phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      // ✅ HANDLE DUPLICATE EMAIL FROM BACKEND
      if (err.response?.data?.detail) {
        alert(err.response.data.detail);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-blob register-blob-1" />
      <div className="register-blob register-blob-2" />

      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">🏥</div>
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">
            Join MediCore — healthcare simplified
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            placeholder="John Doe"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              placeholder="you@email.com"
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              placeholder="9876543210"
              onChange={(e) =>
                setData({ ...data, phone: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            onChange={(e) =>
              setData({ ...data, role: e.target.value })
            }
          >
            <option value="patient">Patient</option>
            <option value="staff">Doctor / Staff</option>
          </select>
        </div>

        <button className="register-submit" onClick={register}>
          Create Account →
        </button>

        <div className="register-footer">
          <a href="/login">Already have an account? Sign in</a>
        </div>
      </div>
    </div>
  );
}