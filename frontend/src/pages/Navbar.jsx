// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./global.css";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const isActive = (path) => location.pathname === path ? "active" : "";

//   return (
//     <nav className="navbar">
//       <div className="nav-logo" onClick={() => navigate(token ? (role === "patient" ? "/book" : role === "staff" ? "/doctor" : "/admin") : "/")}>
//         <span className="nav-logo-icon">⚕</span>
//         MediCore
//       </div>

//       <ul className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
//         {!token && (
//           <>
//             <li><a href="/" className={isActive("/")}>Home</a></li>
//             <li><a href="/login" className={isActive("/login")}>Login</a></li>
//             <li><a href="/register" className={isActive("/register")}>Register</a></li>
//           </>
//         )}

//         {token && role === "patient" && (
//           <>
//             <li><a href="/book" className={isActive("/book")}>Dashboard</a></li>
//             <li><a href="/announcements" className={isActive("/announcements")}>Announcements</a></li>
//           </>
//         )}

//         {token && role === "staff" && (
//           <>
//             <li><a href="/doctor" className={isActive("/doctor")}>Dashboard</a></li>
//             <li><a href="/staff-announcements" className={isActive("/staff-announcements")}>Announcements</a></li>
//           </>
//         )}

//         {token && role === "admin" && (
//           <>
//             <li><a href="/admin" className={isActive("/admin")}>Dashboard</a></li>
//           </>
//         )}

//         {token && (
//           <li>
//             <button className="nav-link-btn nav-logout-btn" onClick={logout}>
//               Logout
//             </button>
//           </li>
//         )}
//       </ul>

//       <button className="nav-hamburger" onClick={() => setOpen(!open)}>
//         {open ? "✕" : "☰"}
//       </button>
//     </nav>
//   );
// }









import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Global.css";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div
        className="nav-logo"
        onClick={() =>
          navigate(
            token
              ? role === "patient"
                ? "/book"
                : role === "staff"
                ? "/doctor"
                : "/admin"
              : "/"
          )
        }
      >

        <span className="nav-logo-icon">⚕</span>
        MediCore

      </div>

      {/* NAV LINKS */}
      <ul
        className={`nav-links ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      >

        {/* PUBLIC */}
        {!token && (
          <>
            <li>
              <a href="/" className={isActive("/")}>
                Home
              </a>
            </li>

            <li>
              <a href="/login" className={isActive("/login")}>
                Login
              </a>
            </li>

            <li>
              <a href="/register" className={isActive("/register")}>
                Register
              </a>
            </li>
          </>
        )}

        {/* PATIENT */}
        {token && role === "patient" && (
          <>

            <li>
              <a href="/book" className={isActive("/book")}>
                Dashboard
              </a>
            </li>

            <li>
              <a
                href="/announcements"
                className={isActive("/announcements")}
              >
                Announcements
              </a>
            </li>

            <li>
              <a
                href="/feedback"
                className={isActive("/feedback")}
              >
                Feedback
              </a>
            </li>

            <li>
              <a
                href="/documents"
                className={isActive("/documents")}
              >
                Documents
              </a>
            </li>

          </>
        )}

        {/* STAFF */}
        {token && role === "staff" && (
          <>

            <li>
              <a href="/doctor" className={isActive("/doctor")}>
                Dashboard
              </a>
            </li>

            <li>
              <a href="/slots" className={isActive("/slots")}>
                Slots
              </a>
            </li>

            <li>
              <a href="/history" className={isActive("/history")}>
                History
              </a>
            </li>

            <li>
              <a
                href="/staff-announcements"
                className={isActive("/staff-announcements")}
              >
                Announcements
              </a>
            </li>

            <li>
              <a
                href="/feedback-admin"
                className={isActive("/feedback-admin")}
              >
                Feedback
              </a>
            </li>

            <li>
              <a
                href="/documents-admin"
                className={isActive("/documents-admin")}
              >
                Documents
              </a>
            </li>

          </>
        )}

        {/* ADMIN */}
        {token && role === "admin" && (
          <>

            <li>
              <a href="/admin" className={isActive("/admin")}>
                Dashboard
              </a>
            </li>

          </>
        )}

        {/* LOGOUT */}
        {token && (
          <li>

            <button
              className="nav-link-btn nav-logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </li>
        )}

      </ul>

      {/* MOBILE MENU */}
      <button
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>

    </nav>
  );
}
