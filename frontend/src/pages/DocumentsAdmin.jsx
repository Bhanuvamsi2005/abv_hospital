import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";

export default function DocumentsAdmin() {

  const [data, setData] = useState([]);
  const [notes, setNotes] = useState({});

  const fetchData = async () => {

    try {

      const res = await API.get("/documents/all");

      setData(res.data);

    } catch {
      alert("Failed to fetch document requests");
    }
  };

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

  return (
    <>
      <Navbar />

      <div className="page-wrapper">

        <div className="doctor-page">

          <div className="doctor-header fade-in">
            <div>
              <h1>Document Requests</h1>
              <p>
                Review and manage patient document requests
              </p>
            </div>
          </div>

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

          <div className="stagger">

            {data.map((r) => (

              <div
                className="doc-appt-card"
                key={r._id}
              >

                {/* HEADER */}
                <div className="doc-appt-header">

                  <div>

                    <div className="doc-patient-name">
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
                    className={`status-badge ${
                      r.status === "approved"
                        ? "status-accepted"
                        : r.status === "ready"
                        ? "status-accepted"
                        : r.status === "rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }`}
                  >
                    {r.status}
                  </span>

                </div>

                {/* PURPOSE */}
                <div className="doc-problem">

                  <div className="doc-problem-label">
                    📌 Purpose
                  </div>

                  {r.purpose}

                </div>

                {/* DOCUMENT LIST */}
                <div className="doc-patient-grid">

                  <div className="doc-patient-item">

                    <div className="doc-patient-label">
                      Requested Documents
                    </div>

                    <ul style={{ marginTop: "10px" }}>
                      {r.documents.map((d, i) => (
                        <li key={i}>
                          {d}
                        </li>
                      ))}
                    </ul>

                  </div>

                </div>

                {/* PATIENT NOTE */}
                {r.patient_note && (

                  <div className="doc-existing-note">

                    <div className="doc-existing-note-label">
                      Patient Note
                    </div>

                    {r.patient_note}

                  </div>

                )}

                {/* STAFF NOTE */}
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
                />

                {/* ACTION BUTTONS */}
                <div className="doc-actions">

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

                  <div className="doc-existing-note">

                    <div className="doc-existing-note-label">
                      Staff Note
                    </div>

                    {r.staff_note}

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
