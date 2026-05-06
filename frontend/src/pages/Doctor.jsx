
// import { useEffect, useState } from "react";
// import API from "../api";

// export default function Doctor() {
//   const [apps, setApps] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [notes, setNotes] = useState({});

//   const fetchApps = async () => {
//     const res = await API.get("/appointments/all");
//     setApps(res.data);
//   };

//   const update = async (id, status) => {
//     try {
//       await API.put(`/appointments/update/${id}?status=${status}`, {
//         note: notes[id] || ""
//       });

//       setEditingId(null);
//       fetchApps();
//     } catch (err) {
//       alert(err.response?.data?.detail || "Update failed");
//     }
//   };

//   useEffect(() => {
//     fetchApps();
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Doctor Dashboard</h2>

//       {apps.map((a) => (
//         <div
//           key={a._id}
//           style={{
//             border: "1px solid",
//             margin: "10px",
//             padding: "10px",
//             borderRadius: "8px"
//           }}
//         >
//           {/* ✅ PATIENT DETAILS */}
//           <h3>Patient Details</h3>
//           <p><b>Name:</b> {a.patient_name || "Unknown"}</p>
//           <p><b>Phone:</b> {a.patient_phone || "N/A"}</p>
//           <p><b>Age:</b> {a.patient_age || "N/A"}</p>
//           <p><b>Gender:</b> {a.patient_gender || "N/A"}</p>
//           <p><b>Problem:</b> {a.problem || "Not specified"}</p>

//           <hr />

//           {/* ✅ APPOINTMENT DETAILS */}
//           <h4>Appointment</h4>
//           <p><b>Date:</b> {a.date}</p>
//           <p><b>Time:</b> {a.time}</p>

//           <p>
//             <b>Status:</b>{" "}
//             <span
//               style={{
//                 fontWeight: "bold",
//                 color:
//                   a.status === "accepted"
//                     ? "green"
//                     : a.status === "rejected"
//                     ? "red"
//                     : "orange",
//               }}
//             >
//               {a.status}
//             </span>
//           </p>

//           {/* 🔹 PENDING */}
//           {a.status === "pending" && (
//             <>
//               <textarea
//                 placeholder="Write note for patient..."
//                 value={notes[a._id] || ""}
//                 onChange={(e) =>
//                   setNotes({ ...notes, [a._id]: e.target.value })
//                 }
//                 style={{ width: "100%", minHeight: "60px" }}
//               /><br /><br />

//               <button onClick={() => update(a._id, "accepted")}>
//                 Accept
//               </button>{" "}

//               <button onClick={() => update(a._id, "rejected")}>
//                 Reject
//               </button>
//             </>
//           )}

//           {/* 🔹 AFTER DECISION */}
//           {a.status !== "pending" && editingId !== a._id && (
//             <>
//               <p><b>Doctor Note:</b> {a.note || "No note"}</p>
//               <button onClick={() => setEditingId(a._id)}>Edit</button>
//             </>
//           )}

//           {/* 🔹 EDIT MODE */}
//           {editingId === a._id && (
//             <>
//               <textarea
//                 defaultValue={a.note}
//                 onChange={(e) =>
//                   setNotes({ ...notes, [a._id]: e.target.value })
//                 }
//                 style={{ width: "100%", minHeight: "60px" }}
//               /><br /><br />

//               <button onClick={() => update(a._id, "accepted")}>
//                 Confirm Accept
//               </button>{" "}

//               <button onClick={() => update(a._id, "rejected")}>
//                 Confirm Reject
//               </button>{" "}

//               <button onClick={() => setEditingId(null)}>
//                 Cancel
//               </button>
//             </>
//           )}
//         </div>
//       ))}
// <button onClick={() => window.location.href = "/staff-announcements"}>
//   Manage Announcements
// </button>
// <br /><br />
//       <br />
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }








// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import Navbar from "./Navbar";
// import "./Doctor.css";
// import "./Global.css";

// export default function Doctor() {
//   const [apps, setApps] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [notes, setNotes] = useState({});
//   const navigate = useNavigate();

//   const fetchApps = async () => {
//     const res = await API.get("/appointments/all");
//     setApps(res.data);
//   };

//   const update = async (id, status) => {
//     try {
//       await API.put(`/appointments/update/${id}?status=${status}`, {
//         note: notes[id] || ""
//       });
//       setEditingId(null);
//       fetchApps();
//     } catch (err) {
//       alert(err.response?.data?.detail || "Update failed");
//     }
//   };

//   useEffect(() => { fetchApps(); }, []);

//   const pending = apps.filter(a => a.status === "pending").length;
//   const accepted = apps.filter(a => a.status === "accepted").length;
//   const rejected = apps.filter(a => a.status === "rejected").length;

//   return (
//     <>
//       <Navbar />
//       <div className="page-wrapper">
//         <div className="page-blob blob-1" />
//         <div className="page-blob blob-2" />

//         <div className="doctor-page">
//           {/* Header */}
//           <div className="doctor-header fade-in">
//             <div>
//               <h1>Doctor Dashboard</h1>
//               <p>Manage and respond to patient appointments</p>
//             </div>
//             <button className="manage-ann-btn" onClick={() => navigate("/staff-announcements")}>
//               📢 Manage Announcements
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="doctor-stats fade-in">
//             <div className="doc-stat">
//               <div className="doc-stat-value" style={{ color: "var(--orange)" }}>{pending}</div>
//               <div className="doc-stat-label">Pending</div>
//             </div>
//             <div className="doc-stat">
//               <div className="doc-stat-value" style={{ color: "var(--green)" }}>{accepted}</div>
//               <div className="doc-stat-label">Accepted</div>
//             </div>
//             <div className="doc-stat">
//               <div className="doc-stat-value" style={{ color: "var(--red)" }}>{rejected}</div>
//               <div className="doc-stat-label">Rejected</div>
//             </div>
//           </div>

//           {apps.length === 0 && (
//             <div className="empty-state">
//               <span className="empty-state-icon">📋</span>
//               <p>No appointments yet</p>
//             </div>
//           )}

//           <div className="stagger">
//             {apps.map((a) => (
//               <div className="doc-appt-card" key={a._id}>
//                 {/* Header row */}
//                 <div className="doc-appt-header">
//                   <div>
//                     <div className="doc-patient-name">{a.patient_name || "Unknown Patient"}</div>
//                     <div className="doc-appt-meta">
//                       📅 {a.date} · 🕐 {a.time}
//                     </div>
//                   </div>
//                   <span className={`status-badge ${
//                     a.status === "accepted" ? "status-accepted"
//                     : a.status === "rejected" ? "status-rejected"
//                     : "status-pending"
//                   }`}>
//                     {a.status === "accepted" ? "✓" : a.status === "rejected" ? "✕" : "⏳"} {a.status}
//                   </span>
//                 </div>

//                 {/* Patient details */}
//                 <div className="doc-patient-grid">
//                   <div className="doc-patient-item">
//                     <div className="doc-patient-label">Phone</div>
//                     <div>{a.patient_phone || "N/A"}</div>
//                   </div>
//                   <div className="doc-patient-item">
//                     <div className="doc-patient-label">Age</div>
//                     <div>{a.patient_age || "N/A"}</div>
//                   </div>
//                   <div className="doc-patient-item">
//                     <div className="doc-patient-label">Gender</div>
//                     <div style={{ textTransform: "capitalize" }}>{a.patient_gender || "N/A"}</div>
//                   </div>
//                 </div>

//                 {/* Problem */}
//                 {a.problem && (
//                   <div className="doc-problem">
//                     <div className="doc-problem-label">⚠ Problem</div>
//                     {a.problem}
//                   </div>
//                 )}

//                 {/* PENDING */}
//                 {a.status === "pending" && (
//                   <div>
//                     <textarea
//                       className="form-textarea doc-note-area"
//                       placeholder="Write a note for the patient (optional)..."
//                       value={notes[a._id] || ""}
//                       onChange={(e) => setNotes({ ...notes, [a._id]: e.target.value })}
//                     />
//                     <div className="doc-actions">
//                       <button className="btn-accept" onClick={() => update(a._id, "accepted")}>
//                         ✓ Accept
//                       </button>
//                       <button className="btn-reject" onClick={() => update(a._id, "rejected")}>
//                         ✕ Reject
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* AFTER DECISION */}
//                 {a.status !== "pending" && editingId !== a._id && (
//                   <div>
//                     {a.note && (
//                       <div className="doc-existing-note">
//                         <div className="doc-existing-note-label">Doctor Note</div>
//                         {a.note}
//                       </div>
//                     )}
//                     <div className="doc-actions">
//                       <button className="btn-edit" onClick={() => setEditingId(a._id)}>
//                         ✏ Edit Decision
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* EDIT MODE */}
//                 {editingId === a._id && (
//                   <div>
//                     <textarea
//                       className="form-textarea doc-note-area"
//                       defaultValue={a.note}
//                       onChange={(e) => setNotes({ ...notes, [a._id]: e.target.value })}
//                     />
//                     <div className="doc-actions">
//                       <button className="btn-accept" onClick={() => update(a._id, "accepted")}>
//                         ✓ Confirm Accept
//                       </button>
//                       <button className="btn-reject" onClick={() => update(a._id, "rejected")}>
//                         ✕ Confirm Reject
//                       </button>
//                       <button className="btn-cancel" onClick={() => setEditingId(null)}>
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }








// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import Navbar from "./Navbar";
// import "./Doctor.css";
// import "./Global.css";

// export default function Doctor() {
//   const [apps, setApps] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [notes, setNotes] = useState({});
//   const navigate = useNavigate();

//   const fetchApps = async () => {
//     const res = await API.get("/appointments/all");
//     setApps(res.data);
//   };

//   const update = async (id, status) => {
//     try {
//       await API.put(`/appointments/update/${id}?status=${status}`, {
//         note: notes[id] || ""
//       });
//       setEditingId(null);
//       fetchApps();
//     } catch (err) {
//       alert(err.response?.data?.detail || "Update failed");
//     }
//   };

//   useEffect(() => { fetchApps(); }, []);

//   const pending = apps.filter(a => a.status === "pending").length;
//   const accepted = apps.filter(a => a.status === "accepted").length;
//   const rejected = apps.filter(a => a.status === "rejected").length;

//   return (
//     <>
//       <Navbar />
//       <div className="page-wrapper">
//         <div className="page-blob blob-1" />
//         <div className="page-blob blob-2" />

//         <div className="doctor-page">

//           {/* Header */}
//           <div className="doctor-header fade-in">
//             <div>
//               <h1>Doctor Dashboard</h1>
//               <p>Manage and respond to patient appointments</p>
//             </div>
//             <button className="manage-ann-btn" onClick={() => navigate("/staff-announcements")}>
//               📢 Manage Announcements
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="doctor-stats fade-in">
//             <div className="doc-stat">
//               <div className="doc-stat-value" style={{ color: "var(--orange)" }}>{pending}</div>
//               <div className="doc-stat-label">Pending</div>
//             </div>
//             <div className="doc-stat">
//               <div className="doc-stat-value" style={{ color: "var(--green)" }}>{accepted}</div>
//               <div className="doc-stat-label">Accepted</div>
//             </div>
//             <div className="doc-stat">
//               <div className="doc-stat-value" style={{ color: "var(--red)" }}>{rejected}</div>
//               <div className="doc-stat-label">Rejected</div>
//             </div>
//           </div>

//           {apps.length === 0 && (
//             <div className="empty-state">
//               <span className="empty-state-icon">📋</span>
//               <p>No appointments yet</p>
//             </div>
//           )}

//           <div className="stagger">
//             {apps.map((a) => (
//               <div className="doc-appt-card" key={a._id}>

//                 {/* Header row */}
//                 <div className="doc-appt-header">
//                   <div>
//                     <div className="doc-patient-name">
//                       {a.patient_name || "Unknown Patient"}
//                     </div>

//                     {/* ✅ NEW: DOCTOR NAME DISPLAY */}
//                     <div className="doc-doctor-name">
//                       🩺 {a.doctor_id || "No doctor assigned"}
//                     </div>

//                     <div className="doc-appt-meta">
//                       📅 {a.date} · 🕐 {a.time}
//                     </div>
//                   </div>

//                   <span className={`status-badge ${
//                     a.status === "accepted" ? "status-accepted"
//                     : a.status === "rejected" ? "status-rejected"
//                     : "status-pending"
//                   }`}>
//                     {a.status === "accepted" ? "✓" : a.status === "rejected" ? "✕" : "⏳"} {a.status}
//                   </span>
//                 </div>

//                 {/* Patient details */}
//                 <div className="doc-patient-grid">
//                   <div className="doc-patient-item">
//                     <div className="doc-patient-label">Phone</div>
//                     <div>{a.patient_phone || "N/A"}</div>
//                   </div>
//                   <div className="doc-patient-item">
//                     <div className="doc-patient-label">Age</div>
//                     <div>{a.patient_age || "N/A"}</div>
//                   </div>
//                   <div className="doc-patient-item">
//                     <div className="doc-patient-label">Gender</div>
//                     <div style={{ textTransform: "capitalize" }}>
//                       {a.patient_gender || "N/A"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Problem */}
//                 {a.problem && (
//                   <div className="doc-problem">
//                     <div className="doc-problem-label">⚠ Problem</div>
//                     {a.problem}
//                   </div>
//                 )}

//                 {/* PENDING */}
//                 {a.status === "pending" && (
//                   <div>
//                     <textarea
//                       className="form-textarea doc-note-area"
//                       placeholder="Write a note for the patient (optional)..."
//                       value={notes[a._id] || ""}
//                       onChange={(e) =>
//                         setNotes({ ...notes, [a._id]: e.target.value })
//                       }
//                     />

//                     <div className="doc-actions">
//                       <button className="btn-accept" onClick={() => update(a._id, "accepted")}>
//                         ✓ Accept
//                       </button>

//                       <button className="btn-reject" onClick={() => update(a._id, "rejected")}>
//                         ✕ Reject
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* AFTER DECISION */}
//                 {a.status !== "pending" && editingId !== a._id && (
//                   <div>
//                     {a.note && (
//                       <div className="doc-existing-note">
//                         <div className="doc-existing-note-label">Doctor Note</div>
//                         {a.note}
//                       </div>
//                     )}

//                     <div className="doc-actions">
//                       <button className="btn-edit" onClick={() => setEditingId(a._id)}>
//                         ✏ Edit Decision
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* EDIT MODE */}
//                 {editingId === a._id && (
//                   <div>
//                     <textarea
//                       className="form-textarea doc-note-area"
//                       defaultValue={a.note}
//                       onChange={(e) =>
//                         setNotes({ ...notes, [a._id]: e.target.value })
//                       }
//                     />

//                     <div className="doc-actions">
//                       <button className="btn-accept" onClick={() => update(a._id, "accepted")}>
//                         ✓ Confirm Accept
//                       </button>

//                       <button className="btn-reject" onClick={() => update(a._id, "rejected")}>
//                         ✕ Confirm Reject
//                       </button>

//                       <button className="btn-cancel" onClick={() => setEditingId(null)}>
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}

//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






//history update
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "./Navbar";
import "./Doctor.css";
import "./Global.css";

export default function Doctor() {

  const [apps, setApps] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [notes, setNotes] = useState({});

  const navigate = useNavigate();

  const fetchApps = async () => {

    const res = await API.get("/appointments/all");

    // ✅ ONLY TODAY + FUTURE
    const today = new Date().toISOString().split("T")[0];

    const activeAppointments = res.data.filter(
      (a) => a.date >= today
    );

    setApps(activeAppointments);
  };

  const update = async (id, status) => {

    try {

      await API.put(
        `/appointments/update/${id}?status=${status}`,
        {
          note: notes[id] || ""
        }
      );

      setEditingId(null);

      fetchApps();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Update failed"
      );
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const pending =
    apps.filter((a) => a.status === "pending").length;

  const accepted =
    apps.filter((a) => a.status === "accepted").length;

  const rejected =
    apps.filter((a) => a.status === "rejected").length;

  return (
    <>
      <Navbar />

      <div className="page-wrapper">

        <div className="page-blob blob-1" />
        <div className="page-blob blob-2" />

        <div className="doctor-page">

          {/* HEADER */}
          <div className="doctor-header fade-in">

            <div>
              <h1>Doctor Dashboard</h1>

              <p>
                Manage patient appointments
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap"
              }}
            >

              <button
                className="manage-ann-btn"
                onClick={() =>
                  navigate("/slots")
                }
              >
                📅 View Slots
              </button>

              <button
                className="manage-ann-btn"
                onClick={() =>
                  navigate("/history")
                }
              >
                📜 History
              </button>

              <button
                className="manage-ann-btn"
                onClick={() =>
                  navigate("/staff-announcements")
                }
              >
                📢 Announcements
              </button>

            </div>

          </div>

          {/* STATS */}
          <div className="doctor-stats fade-in">

            <div className="doc-stat">
              <div
                className="doc-stat-value"
                style={{ color: "var(--orange)" }}
              >
                {pending}
              </div>

              <div className="doc-stat-label">
                Pending
              </div>
            </div>

            <div className="doc-stat">
              <div
                className="doc-stat-value"
                style={{ color: "var(--green)" }}
              >
                {accepted}
              </div>

              <div className="doc-stat-label">
                Accepted
              </div>
            </div>

            <div className="doc-stat">
              <div
                className="doc-stat-value"
                style={{ color: "var(--red)" }}
              >
                {rejected}
              </div>

              <div className="doc-stat-label">
                Rejected
              </div>
            </div>

          </div>

          {/* EMPTY */}
          {apps.length === 0 && (

            <div className="empty-state">

              <span className="empty-state-icon">
                📋
              </span>

              <p>
                No appointments today
              </p>

            </div>

          )}

          {/* APPOINTMENTS */}
          <div className="stagger">

            {apps.map((a) => (

              <div
                className="doc-appt-card"
                key={a._id}
              >

                {/* HEADER */}
                <div className="doc-appt-header">

                  <div>

                    <div className="doc-patient-name">
                      {a.patient_name}
                    </div>

                    <div className="doc-doctor-name">
                      🩺 {a.doctor_id}
                    </div>

                    <div className="doc-appt-meta">
                      📅 {a.date} · 🕐 {a.time}
                    </div>

                  </div>

                  <span className={`status-badge ${
                    a.status === "accepted"
                      ? "status-accepted"
                      : a.status === "rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }`}>
                    {a.status}
                  </span>

                </div>

                {/* DETAILS */}
                <div className="doc-patient-grid">

                  <div className="doc-patient-item">
                    <div className="doc-patient-label">
                      Phone
                    </div>

                    <div>
                      {a.patient_phone}
                    </div>
                  </div>

                  <div className="doc-patient-item">
                    <div className="doc-patient-label">
                      Age
                    </div>

                    <div>
                      {a.patient_age}
                    </div>
                  </div>

                  <div className="doc-patient-item">
                    <div className="doc-patient-label">
                      Gender
                    </div>

                    <div>
                      {a.patient_gender}
                    </div>
                  </div>

                </div>

                {/* PROBLEM */}
                {a.problem && (

                  <div className="doc-problem">

                    <div className="doc-problem-label">
                      ⚠ Problem
                    </div>

                    {a.problem}

                  </div>

                )}

                {/* PENDING */}
                {a.status === "pending" && (

                  <div>

                    <textarea
                      className="form-textarea doc-note-area"
                      placeholder="Write note..."
                      value={notes[a._id] || ""}
                      onChange={(e) =>
                        setNotes({
                          ...notes,
                          [a._id]: e.target.value
                        })
                      }
                    />

                    <div className="doc-actions">

                      <button
                        className="btn-accept"
                        onClick={() =>
                          update(a._id, "accepted")
                        }
                      >
                        ✓ Accept
                      </button>

                      <button
                        className="btn-reject"
                        onClick={() =>
                          update(a._id, "rejected")
                        }
                      >
                        ✕ Reject
                      </button>

                    </div>

                  </div>

                )}

                {/* AFTER */}
                {a.status !== "pending" &&
                  editingId !== a._id && (

                  <div>

                    {a.note && (

                      <div className="doc-existing-note">

                        <div className="doc-existing-note-label">
                          Doctor Note
                        </div>

                        {a.note}

                      </div>

                    )}

                    <div className="doc-actions">

                      <button
                        className="btn-edit"
                        onClick={() =>
                          setEditingId(a._id)
                        }
                      >
                        ✏ Edit
                      </button>

                    </div>

                  </div>

                )}

                {/* EDIT */}
                {editingId === a._id && (

                  <div>

                    <textarea
                      className="form-textarea doc-note-area"
                      defaultValue={a.note}
                      onChange={(e) =>
                        setNotes({
                          ...notes,
                          [a._id]: e.target.value
                        })
                      }
                    />

                    <div className="doc-actions">

                      <button
                        className="btn-accept"
                        onClick={() =>
                          update(a._id, "accepted")
                        }
                      >
                        ✓ Confirm
                      </button>

                      <button
                        className="btn-reject"
                        onClick={() =>
                          update(a._id, "rejected")
                        }
                      >
                        ✕ Reject
                      </button>

                      <button
                        className="btn-cancel"
                        onClick={() =>
                          setEditingId(null)
                        }
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>
      </div>
    </>
  );
}