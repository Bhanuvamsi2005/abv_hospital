


// import { useEffect, useState } from "react";
// import API from "../api";

// export default function Admin() {
//   const [staff, setStaff] = useState([]);

//   const fetchStaff = async () => {
//     try {
//       const res = await API.get("/admin/staff");
//       setStaff(res.data);
//     } catch {
//       alert("Error fetching staff");
//     }
//   };

//   const approve = async (id) => {
//     await API.put(`/admin/approve/${id}`);
//     fetchStaff();
//   };

//   const block = async (id) => {
//     await API.put(`/admin/block/${id}`);
//     fetchStaff();
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Dashboard</h2>

//       {staff.length === 0 && <p>No staff found</p>}

//       {staff.map((s) => (
//         <div
//           key={s._id}
//           style={{ border: "1px solid", margin: "10px", padding: "10px" }}
//         >
//           <p><b>Name:</b> {s.name}</p>
//           <p><b>Email:</b> {s.email}</p>
//           <p><b>Phone:</b> {s.phone}</p>

//           <p>
//             <b>Status:</b>{" "}
//             {s.approved ? "Approved" : "Blocked / Pending"}
//           </p>

//           {/* 🔥 BUTTON LOGIC */}
//           {!s.approved ? (
//             <button onClick={() => approve(s._id)}>
//               Approve / Unblock
//             </button>
//           ) : (
//             <button onClick={() => block(s._id)}>
//               Block
//             </button>
//           )}
//         </div>
//       ))}

//       <br />
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import "./pages.css";
import "./Global.css";

export default function Admin() {
  const [staff, setStaff] = useState([]);

  const fetchStaff = async () => {
    try {
      const res = await API.get("/admin/staff");
      setStaff(res.data);
    } catch {
      alert("Error fetching staff");
    }
  };

  const approve = async (id) => { await API.put(`/admin/approve/${id}`); fetchStaff(); };
  const block = async (id) => { await API.put(`/admin/block/${id}`); fetchStaff(); };

  useEffect(() => { fetchStaff(); }, []);

  const approvedCount = staff.filter(s => s.approved).length;

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="page-blob blob-1" />
        <div className="page-blob blob-2" />

        <div className="admin-page">
          <div className="admin-header fade-in">
            <h1>Admin Dashboard</h1>
            <p>Manage doctor and staff approvals</p>
          </div>

          {staff.length > 0 && (
            <div className="admin-count fade-in">
              👥 {staff.length} staff members · {approvedCount} approved
            </div>
          )}

          {staff.length === 0 && (
            <div className="empty-state">
              <span className="empty-state-icon">👥</span>
              <p>No staff members found</p>
            </div>
          )}

          <div className="stagger">
            {staff.map((s) => (
              <div className="staff-card" key={s._id}>
                <div className="staff-info">
                  <div className="staff-name">{s.name}</div>
                  <div className="staff-details">
                    <span>✉ {s.email}</span>
                    <span>📞 {s.phone}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span className={`staff-status ${s.approved ? "staff-approved" : "staff-pending"}`}>
                    {s.approved ? "✓ Approved" : "⏳ Pending"}
                  </span>

                  {!s.approved ? (
                    <button className="btn-approve" onClick={() => approve(s._id)}>
                      ✓ Approve
                    </button>
                  ) : (
                    <button className="btn-block" onClick={() => block(s._id)}>
                      🚫 Block
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}