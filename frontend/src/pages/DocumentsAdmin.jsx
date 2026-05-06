import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import "./Book.css";
import "./Global.css";

export default function DocumentsAdmin() {

  const [data, setData] = useState([]);
  const [notes, setNotes] = useState({});

  // ✅ FETCH ALL REQUESTS
  const fetchData = async () => {

    try {

      const res = await API.get("/documents/all");

      setData(res.data);

    } catch {

      alert("Failed to fetch document requests");
    }
  };

  // ✅ UPDATE STATUS
  const update = async (id, status) => {

    try {

      await API.put(
        `/documents/update/${id}?status=${status}&staff_note=${notes[id] || ""}`
      );

      alert(`Request ${status}`);

      fetchData();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Update failed"
      );
    }
  };

  // ✅ DELETE REQUEST
  const remove = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/documents/delete/${id}`);

      alert("Request deleted");

      fetchData();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Delete failed"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ STATUS COLORS
  const statusClass = (s) =>
    s === "approved"
      ? "status-accepted"
      : s === "ready"
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

        <div
          className="doctor-page"
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "30px 20px",
            boxSizing: "border-box"
          }}
        >

          {/* HEADER */}
          <div
            className="doctor-header fade-in"
            style={{
              marginBottom: "28px"
            }}
          >

            <div>

              <h1
                style={{
                  wordBreak: "break-word"
                }}
              >
                Document Requests
              </h1>

              <p>
                Review and manage patient document requests
              </p>

            </div>

          </div>

          {/* EMPTY STATE */}
          {data.length === 0 && (

            <div className="empty-state">

              <span className="empty-state-icon">
                📄
              </span>

              <p>
                No document requests yet
              </p>

            </div>

          )}

          {/* REQUEST LIST */}
          <div
            className="stagger"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "24px"
            }}
          >

            {data.map((r) => (

              <div
                className="doc-appt-card"
                key={r._id}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  wordBreak: "break-word",
                  padding: "24px",
                  borderRadius: "20px"
                }}
              >

                {/* HEADER */}
                <div
                  className="doc-appt-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "14px",
                    flexWrap: "wrap",
                    alignItems: "flex-start"
                  }}
                >

                  <div>

                    <div
                      className="doc-patient-name"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "700"
                      }}
                    >
                      {r.patient_name}
                    </div>

                    <div className="doc-appt-meta">
                      📞 {r.patient_phone}
                    </div>

                    <div className="doc-appt-meta">
                      🏥 {r.admit_date}
                      {" "}→{" "}
                      {r.discharge_date}
                    </div>

                  </div>

                  <span
                    className={`status-badge ${statusClass(r.status)}`}
                  >
                    {r.status}
                  </span>

                </div>

                {/* PURPOSE */}
                <div
                  className="doc-problem"
                  style={{
                    marginTop: "18px"
                  }}
                >

                  <div className="doc-problem-label">
                    📌 Purpose
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      lineHeight: "1.6"
                    }}
                  >
                    {r.purpose}
                  </div>

                </div>

                {/* DOCUMENTS */}
                <div
                  className="doc-patient-grid"
                  style={{
                    marginTop: "18px"
                  }}
                >

                  <div className="doc-patient-item">

                    <div className="doc-patient-label">
                      Requested Documents
                    </div>

                    <ul
                      style={{
                        marginTop: "12px",
                        paddingLeft: "18px",
                        lineHeight: "1.7"
                      }}
                    >

                      {r.documents.map((d, i) => (
                        <li
                          key={i}
                          style={{
                            marginBottom: "6px"
                          }}
                        >
                          {d}
                        </li>
                      ))}

                    </ul>

                  </div>

                </div>

                {/* PATIENT NOTE */}
                {r.patient_note && (

                  <div
                    className="doc-existing-note"
                    style={{
                      marginTop: "18px"
                    }}
                  >

                    <div className="doc-existing-note-label">
                      Patient Note
                    </div>

                    <div
                      style={{
                        marginTop: "8px",
                        lineHeight: "1.6"
                      }}
                    >
                      {r.patient_note}
                    </div>

                  </div>

                )}

                {/* STAFF NOTE INPUT */}
                <div
                  style={{
                    marginTop: "20px"
                  }}
                >

                  <label
                    className="form-label"
                    style={{
                      marginBottom: "10px",
                      display: "block"
                    }}
                  >
                    Staff Note
                  </label>

                  <textarea
                    className="form-textarea doc-note-area"
                    placeholder="Add note for patient..."
                    value={notes[r._id] || ""}
                    onChange={(e) =>
                      setNotes({
                        ...notes,
                        [r._id]: e.target.value
                      })
                    }
                    style={{
                      width: "100%",
                      minHeight: "120px",
                      resize: "vertical"
                    }}
                  />

                </div>

                {/* ACTIONS */}
                <div
                  className="doc-actions"
                  style={{
                    marginTop: "22px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "12px"
                  }}
                >

                  <button
                    type="button"
                    className="btn-accept"
                    onClick={() =>
                      update(r._id, "approved")
                    }
                  >
                    ✓ Approve
                  </button>

                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() =>
                      update(r._id, "ready")
                    }
                  >
                    📄 Mark Ready
                  </button>

                  <button
                    type="button"
                    className="btn-reject"
                    onClick={() =>
                      update(r._id, "rejected")
                    }
                  >
                    ✕ Reject
                  </button>

                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() =>
                      remove(r._id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

                {/* STAFF NOTE DISPLAY */}
                {r.staff_note && (

                  <div
                    className="doc-existing-note"
                    style={{
                      marginTop: "20px"
                    }}
                  >

                    <div className="doc-existing-note-label">
                      Existing Staff Note
                    </div>

                    <div
                      style={{
                        marginTop: "8px",
                        lineHeight: "1.6"
                      }}
                    >
                      {r.staff_note}
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
