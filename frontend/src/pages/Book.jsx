



// import { useState, useEffect } from "react";
// import API from "../api";

// export default function Book() {
//   const [data, setData] = useState({
//     doctor_id: "",
//     date: "",
//     time: "",
//     patient_name: "",
//     patient_age: "",
//     patient_gender: "",
//     problem: ""
//   });

//   const [appointments, setAppointments] = useState([]);

//   const fetchAppointments = async () => {
//     try {
//       const res = await API.get("/appointments/my");
//       setAppointments(res.data);
//     } catch {
//       alert("Error fetching appointments");
//     }
//   };

//   const book = async () => {
//     try {
//       await API.post("/appointments/book", {
//         ...data,
//         patient_age: Number(data.patient_age)
//       });

//       alert("Appointment booked");

//       fetchAppointments(); // refresh list
//     } catch (err) {
//       alert(err.response?.data?.detail || "Booking failed");
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Book Appointment</h2>

//       {/* FORM */}
//       <input
//         placeholder="Doctor Email"
//         onChange={(e) => setData({ ...data, doctor_id: e.target.value })}
//       /><br /><br />

//       <input
//         type="date"
//         onChange={(e) => setData({ ...data, date: e.target.value })}
//       /><br /><br />

//       <input
//         type="time"
//         onChange={(e) => setData({ ...data, time: e.target.value })}
//       /><br /><br />

//       <input
//         placeholder="Your Name"
//         onChange={(e) => setData({ ...data, patient_name: e.target.value })}
//       /><br /><br />

//       <input
//         placeholder="Age"
//         onChange={(e) => setData({ ...data, patient_age: e.target.value })}
//       /><br /><br />

//       <select
//         onChange={(e) => setData({ ...data, patient_gender: e.target.value })}
//       >
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select><br /><br />

//       <textarea
//         placeholder="Describe your problem"
//         onChange={(e) => setData({ ...data, problem: e.target.value })}
//       /><br /><br />

//       <button onClick={book}>Book</button>

//       <hr style={{ margin: "30px" }} />

//       {/* ✅ APPOINTMENTS LIST */}
//       <h3>My Appointments</h3>

//       {appointments.length === 0 && <p>No appointments yet</p>}

//       {appointments.map((a) => (
//         <div
//           key={a._id}
//           style={{
//             border: "1px solid",
//             margin: "10px",
//             padding: "10px"
//           }}
//         >
//           <p><b>Doctor:</b> {a.doctor_id}</p>
//           <p><b>Date:</b> {a.date}</p>
//           <p><b>Time:</b> {a.time}</p>

//           <p>
//             <b>Status:</b>{" "}
//             <span
//               style={{
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

//           {/* ✅ STAFF DETAILS */}
//           <p><b>Handled By:</b> {a.handled_by_name || "Pending"}</p>
//           <p><b>Contact:</b> {a.handled_by_phone || "N/A"}</p>

//           {/* ✅ NOTE */}
//           <p><b>Doctor Note:</b> {a.note || "No message"}</p>
//         </div>
//       ))}
// <button onClick={() => window.location.href = "/announcements"}>
//   View Announcements
// </button>
// <br /><br />
//       <br />
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }









// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import Navbar from "./Navbar";
// import "./Book.css";
// import "./Global.css";

// export default function Book() {
//   const [data, setData] = useState({
//     doctor_id: "", date: "", time: "",
//     patient_name: "", patient_age: "", patient_gender: "", problem: ""
//   });
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   const fetchAppointments = async () => {
//     try {
//       const res = await API.get("/appointments/my");
//       setAppointments(res.data);
//     } catch {
//       alert("Error fetching appointments");
//     }
//   };

//   const book = async () => {
//     try {
//       await API.post("/appointments/book", {
//         ...data, patient_age: Number(data.patient_age)
//       });
//       alert("Appointment booked!");
//       fetchAppointments();
//     } catch (err) {
//       alert(err.response?.data?.detail || "Booking failed");
//     }
//   };

//   useEffect(() => { fetchAppointments(); }, []);

//   const statusClass = (s) =>
//     s === "accepted" ? "status-accepted" : s === "rejected" ? "status-rejected" : "status-pending";

//   return (
//     <>
//       <Navbar />
//       <div className="page-wrapper">
//         <div className="page-blob blob-1" />
//         <div className="page-blob blob-2" />

//         <div className="book-page">
//           {/* Hero header */}
//           <div className="book-hero fade-in">
//             <div className="book-hero-left">
//               <h1>Patient Dashboard</h1>
//               <p>Book appointments and track your healthcare journey</p>
//             </div>
//             <button
//               className="book-hero-badge"
//               onClick={() => navigate("/announcements")}
//             >
//               🔔 View Announcements
//             </button>
//           </div>

//           <div className="book-layout">
//             {/* ── BOOKING FORM ── */}
//             <div className="book-form-card fade-in">
//               <div className="book-form-title">Book Appointment</div>

//               <div className="form-group">
//                 <label className="form-label">Doctor Name</label>
//                 <input className="form-input" placeholder="Dr. Bhanu vamsi"
//                   onChange={(e) => setData({ ...data, doctor_id: e.target.value })} />
//               </div>

//               <div className="form-row-2">
//                 <div className="form-group">
//                   <label className="form-label">Date</label>
//                   <input className="form-input" type="date"
//                     onChange={(e) => setData({ ...data, date: e.target.value })} />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Time</label>
//                   <input className="form-input" type="time"
//                     onChange={(e) => setData({ ...data, time: e.target.value })} />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Your Name</label>
//                 <input className="form-input" placeholder="Full Name"
//                   onChange={(e) => setData({ ...data, patient_name: e.target.value })} />
//               </div>

//               <div className="form-row-2">
//                 <div className="form-group">
//                   <label className="form-label">Age</label>
//                   <input className="form-input" placeholder="25"
//                     onChange={(e) => setData({ ...data, patient_age: e.target.value })} />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Gender</label>
//                   <select className="form-select"
//                     onChange={(e) => setData({ ...data, patient_gender: e.target.value })}>
//                     <option value="">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Problem Description</label>
//                 <textarea className="form-textarea" placeholder="Describe your symptoms..."
//                   onChange={(e) => setData({ ...data, problem: e.target.value })} />
//               </div>

//               <button className="book-submit" onClick={book}>
//                 Book Appointment →
//               </button>
//             </div>

//             {/* ── APPOINTMENTS ── */}
//             <div className="appointments-section">
//               <h2>📅 My Appointments</h2>

//               {appointments.length === 0 && (
//                 <div className="empty-state">
//                   <span className="empty-state-icon">🗓️</span>
//                   <p>No appointments yet. Book your first one!</p>
//                 </div>
//               )}

//               <div className="stagger">
//                 {appointments.map((a) => (
//                   <div className="appointment-card" key={a._id}>
//                     <div className="appt-top">
//                       <div>
//                         <div className="appt-doctor">Dr. {a.doctor_id}</div>
//                         <div className="appt-meta">{a.date} · {a.time}</div>
//                       </div>
//                       <span className={`status-badge ${statusClass(a.status)}`}>
//                         {a.status === "accepted" ? "✓" : a.status === "rejected" ? "✕" : "⏳"} {a.status}
//                       </span>
//                     </div>

//                     <div className="appt-details">
//                       <div className="appt-detail-item">
//                         <div className="appt-detail-label">Handled By</div>
//                         <div>{a.handled_by_name || "Pending"}</div>
//                       </div>
//                       <div className="appt-detail-item">
//                         <div className="appt-detail-label">Contact</div>
//                         <div>{a.handled_by_phone || "N/A"}</div>
//                       </div>

//                       {a.note && (
//                         <div className="appt-note">
//                           <div className="appt-note-label">Doctor's Note</div>
//                           <div>{a.note}</div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }









// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import Navbar from "./Navbar";
// import "./Book.css";
// import "./Global.css";

// export default function Book() {
//   const [data, setData] = useState({
//     doctor_id: "",
//     date: "",
//     time: "",
//     patient_name: "",
//     patient_age: "",
//     patient_gender: "",
//     problem: ""
//   });

//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   const fetchAppointments = async () => {
//     try {
//       const res = await API.get("/appointments/my");
//       setAppointments(res.data);
//     } catch {
//       alert("Error fetching appointments");
//     }
//   };

//   const book = async () => {
//     try {
//       await API.post("/appointments/book", {
//         ...data,
//         patient_age: Number(data.patient_age)
//       });
//       alert("Appointment booked!");
//       fetchAppointments();
//     } catch (err) {
//       alert(err.response?.data?.detail || "Booking failed");
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const statusClass = (s) =>
//     s === "accepted"
//       ? "status-accepted"
//       : s === "rejected"
//       ? "status-rejected"
//       : "status-pending";

//   return (
//     <>
//       <Navbar />

//       <div className="page-wrapper">
//         <div className="page-blob blob-1" />
//         <div className="page-blob blob-2" />

//         <div className="book-page">
//           {/* HERO */}
//           <div className="book-hero fade-in">
//             <div className="book-hero-left">
//               <h1>Patient Dashboard</h1>
//               <p>Book appointments and track your healthcare journey</p>
//             </div>

//             <button
//               className="book-hero-badge"
//               onClick={() => navigate("/announcements")}
//             >
//               🔔 View Announcements
//             </button>
//           </div>

//           <div className="book-layout">

//             {/* ───────── BOOK FORM ───────── */}
//             <div className="book-form-card fade-in">
//               <div className="book-form-title">Book Appointment</div>

//               {/* ✅ UPDATED DROPDOWN */}
//               <div className="form-group">
//                 <label className="form-label">Doctor</label>
//                 <select
//                   className="form-select"
//                   onChange={(e) =>
//                     setData({ ...data, doctor_id: e.target.value })
//                   }
//                 >
//                   <option value="">Select Doctor</option>
//                   <option value="Dr.Bhanu vamsi - Cardiologist">
//                     Dr.Bhanu vamsi - Cardiologist
//                   </option>
//                   <option value="Dr.Srinivasu - Dermatologist">
//                     Dr.Srinivasu - Dermatologist
//                   </option>
//                   <option value="Dr.Sridevi - Pulmonologist">
//                     Dr.Sridevi - Pulmonologist
//                   </option>
//                   <option value="Dr.Narayana - Nephrologist">
//                     Dr.Narayana - Nephrologist
//                   </option>
//                   <option value="Dr.Harshith - Oncologist">
//                     Dr.Harshith - Oncologist
//                   </option>
//                 </select>
//               </div>

//               <div className="form-row-2">
//                 <div className="form-group">
//                   <label className="form-label">Date</label>
//                   <input
//                     className="form-input"
//                     type="date"
//                     onChange={(e) =>
//                       setData({ ...data, date: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Time</label>
//                   <input
//                     className="form-input"
//                     type="time"
//                     onChange={(e) =>
//                       setData({ ...data, time: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Your Name</label>
//                 <input
//                   className="form-input"
//                   placeholder="Full Name"
//                   onChange={(e) =>
//                     setData({ ...data, patient_name: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-row-2">
//                 <div className="form-group">
//                   <label className="form-label">Age</label>
//                   <input
//                     className="form-input"
//                     placeholder="25"
//                     onChange={(e) =>
//                       setData({ ...data, patient_age: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Gender</label>
//                   <select
//                     className="form-select"
//                     onChange={(e) =>
//                       setData({
//                         ...data,
//                         patient_gender: e.target.value
//                       })
//                     }
//                   >
//                     <option value="">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Problem Description</label>
//                 <textarea
//                   className="form-textarea"
//                   placeholder="Describe your symptoms..."
//                   onChange={(e) =>
//                     setData({ ...data, problem: e.target.value })
//                   }
//                 />
//               </div>

//               <button className="book-submit" onClick={book}>
//                 Book Appointment →
//               </button>
//             </div>

//             {/* ───────── APPOINTMENTS ───────── */}
//             <div className="appointments-section">
//               <h2>📅 My Appointments</h2>

//               {appointments.length === 0 && (
//                 <div className="empty-state">
//                   <span className="empty-state-icon">🗓️</span>
//                   <p>No appointments yet. Book your first one!</p>
//                 </div>
//               )}

//               <div className="stagger">
//                 {appointments.map((a) => (
//                   <div className="appointment-card" key={a._id}>
//                     <div className="appt-top">
//                       <div>
//                         {/* ✅ FIXED DISPLAY */}
//                         <div className="appt-doctor">{a.doctor_id}</div>
//                         <div className="appt-meta">
//                           {a.date} · {a.time}
//                         </div>
//                       </div>

//                       <span className={`status-badge ${statusClass(a.status)}`}>
//                         {a.status === "accepted"
//                           ? "✓"
//                           : a.status === "rejected"
//                           ? "✕"
//                           : "⏳"}{" "}
//                         {a.status}
//                       </span>
//                     </div>

//                     <div className="appt-details">
//                       <div className="appt-detail-item">
//                         <div className="appt-detail-label">Handled By</div>
//                         <div>{a.handled_by_name || "Pending"}</div>
//                       </div>

//                       <div className="appt-detail-item">
//                         <div className="appt-detail-label">Contact</div>
//                         <div>{a.handled_by_phone || "N/A"}</div>
//                       </div>

//                       {a.note && (
//                         <div className="appt-note">
//                           <div className="appt-note-label">
//                             Doctor's Note
//                           </div>
//                           <div>{a.note}</div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }







//time slots update
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "./Navbar";
import "./Book.css";
import "./Global.css";

export default function Book() {

  const [data, setData] = useState({
    doctor_id: "",
    date: "",
    time: "",
    patient_name: "",
    patient_age: "",
    patient_gender: "",
    problem: ""
  });

  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);

  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data);
    } catch {
      alert("Error fetching appointments");
    }
  };

  // ✅ FETCH SLOT AVAILABILITY
  const fetchSlots = async (doctor, date) => {

    if (!doctor || !date) return;

    try {

      const res = await API.get(
        `/appointments/slots?doctor=${doctor}&date=${date}`
      );

      setSlots(res.data);

    } catch {
      alert("Unable to fetch slots");
    }
  };

  const book = async () => {
    try {

      await API.post("/appointments/book", {
        ...data,
        patient_age: Number(data.patient_age)
      });

      alert("Appointment booked!");

      fetchAppointments();

      fetchSlots(data.doctor_id, data.date);

    } catch (err) {
      alert(err.response?.data?.detail || "Booking failed");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const statusClass = (s) =>
    s === "accepted"
      ? "status-accepted"
      : s === "rejected"
      ? "status-rejected"
      : "status-pending";

  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        <div className="page-blob blob-1" />
        <div className="page-blob blob-2" />

        <div className="book-page">

          {/* HERO */}
          <div className="book-hero fade-in">
            <div className="book-hero-left">
              <h1>Patient Dashboard</h1>
              <p>Book appointments and track your healthcare journey</p>
            </div>

            <button
              className="book-hero-badge"
              onClick={() => navigate("/announcements")}
            >
              🔔 View Announcements
            </button>
          </div>

          <div className="book-layout">

            {/* BOOK FORM */}
            <div className="book-form-card fade-in">

              <div className="book-form-title">
                Book Appointment
              </div>

              {/* DOCTOR */}
              <div className="form-group">
                <label className="form-label">Doctor</label>

                <select
                  className="form-select"
                  onChange={(e) => {

                    setData({
                      ...data,
                      doctor_id: e.target.value
                    });

                    fetchSlots(e.target.value, data.date);
                  }}
                >

                  <option value="">Select Doctor</option>

                  <option value="Dr.Bhanu vamsi - Cardiologist">
                    Dr.Bhanu vamsi - Cardiologist
                  </option>

                  <option value="Dr.Srinivasu - Dermatologist">
                    Dr.Srinivasu - Dermatologist
                  </option>

                  <option value="Dr.Sridevi - Pulmonologist">
                    Dr.Sridevi - Pulmonologist
                  </option>

                  <option value="Dr.Narayana - Nephrologist">
                    Dr.Narayana - Nephrologist
                  </option>

                  <option value="Dr.Harshith - Oncologist">
                    Dr.Harshith - Oncologist
                  </option>

                </select>
              </div>

              {/* DATE */}
              <div className="form-group">
                <label className="form-label">Date</label>

                <input
                  className="form-input"
                  type="date"
                  onChange={(e) => {

                    setData({
                      ...data,
                      date: e.target.value
                    });

                    fetchSlots(data.doctor_id, e.target.value);
                  }}
                />
              </div>

              {/* SLOT */}
              <div className="form-group">
                <label className="form-label">
                  Available Slots
                </label>

                <select
                  className="form-select"
                  onChange={(e) =>
                    setData({
                      ...data,
                      time: e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Slot
                  </option>

                  {slots.map((slot) => (

                    <option
                      key={slot.time}
                      value={slot.time}
                      disabled={slot.full}
                    >

                      {slot.time}
                      {" "}
                      {slot.full
                        ? "(FULL)"
                        : `(${slot.count}/6 booked)`}

                    </option>

                  ))}

                </select>
              </div>

              {/* NAME */}
              <div className="form-group">
                <label className="form-label">Your Name</label>

                <input
                  className="form-input"
                  placeholder="Full Name"
                  onChange={(e) =>
                    setData({
                      ...data,
                      patient_name: e.target.value
                    })
                  }
                />
              </div>

              {/* AGE + GENDER */}
              <div className="form-row-2">

                <div className="form-group">
                  <label className="form-label">Age</label>

                  <input
                    className="form-input"
                    placeholder="25"
                    onChange={(e) =>
                      setData({
                        ...data,
                        patient_age: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>

                  <select
                    className="form-select"
                    onChange={(e) =>
                      setData({
                        ...data,
                        patient_gender: e.target.value
                      })
                    }
                  >

                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>

                  </select>
                </div>

              </div>

              {/* PROBLEM */}
              <div className="form-group">
                <label className="form-label">
                  Problem Description
                </label>

                <textarea
                  className="form-textarea"
                  placeholder="Describe your symptoms..."
                  onChange={(e) =>
                    setData({
                      ...data,
                      problem: e.target.value
                    })
                  }
                />
              </div>

              <button
                className="book-submit"
                onClick={book}
              >
                Book Appointment →
              </button>

            </div>

            {/* APPOINTMENTS */}
            <div className="appointments-section">

              <h2>📅 My Appointments</h2>

              {appointments.length === 0 && (
                <div className="empty-state">
                  <span className="empty-state-icon">🗓️</span>
                  <p>No appointments yet</p>
                </div>
              )}

              <div className="stagger">

                {appointments.map((a) => (

                  <div
                    className="appointment-card"
                    key={a._id}
                  >

                    <div className="appt-top">

                      <div>
                        <div className="appt-doctor">
                          {a.doctor_id}
                        </div>

                        <div className="appt-meta">
                          {a.date} · {a.time}
                        </div>
                      </div>

                      <span className={`status-badge ${statusClass(a.status)}`}>
                        {a.status}
                      </span>

                    </div>

                    <div className="appt-details">

                      <div className="appt-detail-item">
                        <div className="appt-detail-label">
                          Handled By
                        </div>

                        <div>
                          {a.handled_by_name || "Pending"}
                        </div>
                      </div>

                      <div className="appt-detail-item">
                        <div className="appt-detail-label">
                          Contact
                        </div>

                        <div>
                          {a.handled_by_phone || "N/A"}
                        </div>
                      </div>

                      {a.note && (
                        <div className="appt-note">
                          <div className="appt-note-label">
                            Doctor's Note
                          </div>

                          <div>{a.note}</div>
                        </div>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}