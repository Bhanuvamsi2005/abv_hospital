import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "./Navbar";
import "./Book.css";
import "./Global.css";

export default function Documents() {

  const [documents, setDocuments] = useState([""]);

  const [data, setData] = useState({
    patient_name: "",
    patient_phone: "",
    admit_date: "",
    discharge_date: "",
    purpose: "",
    patient_note: ""
  });

  const [requests, setRequests] = useState([]);

  // ✅ ADD DOCUMENT ROW
  const addRow = () => {
    setDocuments([...documents, ""]);
  };

  // ✅ UPDATE DOCUMENT FIELD
  const updateDoc = (i, value) => {

    const updated = [...documents];

    updated[i] = value;

    setDocuments(updated);
  };

  // ✅ FETCH REQUESTS
  const fetchRequests = async () => {

    try {

      const res = await API.get("/documents/my");

      setRequests(res.data);

    } catch {

      alert("Failed to fetch requests");
    }
  };

  // ✅ SUBMIT
  const submit = async () => {

    try {

      await API.post("/documents/create", {
        ...data,
        documents
      });

      alert("Document request submitted successfully");

      fetchRequests();

      // RESET
      setData({
        patient_name: "",
        patient_phone: "",
        admit_date: "",
        discharge_date: "",
        purpose: "",
        patient_note: ""
      });

      setDocuments([""]);

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Submission failed"
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
          className="book-page"
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "30px 20px",
            boxSizing: "border-box"
          }}
        >

          {/* HERO */}
          <div className="book-hero fade-in">

            <div className="book-hero-left">

              <h1>
                Medical Documents
              </h1>

              <p>
                Request discharge summaries, insurance
                documents, medical certificates and more
              </p>

            </div>

          </div>

          {/* RESPONSIVE LAYOUT */}
          <div
            className="book-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
              alignItems: "start",
              width: "100%"
            }}
          >

            {/* LEFT SIDE */}
            <div
              className="book-form-card fade-in"
              style={{
                width: "100%",
                minWidth: "0",
                overflow: "hidden",
                boxSizing: "border-box",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "18px"
              }}
            >

              <div
                className="book-form-title"
                style={{
                  marginBottom: "10px",
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  lineHeight: "1.4",
                  wordBreak: "break-word"
                }}
              >
                Request Document Set
              </div>

              {/* NAME */}
              <div className="form-group">

                <label className="form-label">
                  Patient Name
                </label>

                <input
                  className="form-input"
                  placeholder="Enter full patient name"
                  value={data.patient_name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      patient_name: e.target.value
                    })
                  }
                  style={{ width: "100%" }}
                />

              </div>

              {/* PHONE */}
              <div className="form-group">

                <label className="form-label">
                  Phone Number
                </label>

                <input
                  className="form-input"
                  placeholder="Enter mobile number"
                  value={data.patient_phone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      patient_phone: e.target.value
                    })
                  }
                  style={{ width: "100%" }}
                />

              </div>

              {/* DATES */}
              <div
                className="form-row-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "16px"
                }}
              >

                <div className="form-group">

                  <label className="form-label">
                    Admit Date
                  </label>

                  <input
                    type="date"
                    className="form-input"
                    value={data.admit_date}
                    onChange={(e) =>
                      setData({
                        ...data,
                        admit_date: e.target.value
                      })
                    }
                    style={{ width: "100%" }}
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Discharge Date
                  </label>

                  <input
                    type="date"
                    className="form-input"
                    value={data.discharge_date}
                    onChange={(e) =>
                      setData({
                        ...data,
                        discharge_date: e.target.value
                      })
                    }
                    style={{ width: "100%" }}
                  />

                </div>

              </div>

              {/* PURPOSE */}
              <div className="form-group">

                <label className="form-label">
                  Purpose of Documents
                </label>

                <input
                  className="form-input"
                  placeholder="Insurance / Medical Leave / Loan"
                  value={data.purpose}
                  onChange={(e) =>
                    setData({
                      ...data,
                      purpose: e.target.value
                    })
                  }
                  style={{ width: "100%" }}
                />

              </div>

              {/* NOTE */}
              <div className="form-group">

                <label className="form-label">
                  Additional Notes
                </label>

                <textarea
                  className="form-textarea"
                  placeholder="Enter any special requirements..."
                  value={data.patient_note}
                  onChange={(e) =>
                    setData({
                      ...data,
                      patient_note: e.target.value
                    })
                  }
                  style={{
                    width: "100%",
                    minHeight: "120px",
                    resize: "vertical"
                  }}
                />

              </div>

              {/* DOCUMENTS */}
              <div className="form-group">

                <label className="form-label">
                  Required Documents
                </label>

                {documents.map((d, i) => (

                  <input
                    key={i}
                    className="form-input"
                    placeholder={`Document ${i + 1}`}
                    value={d}
                    onChange={(e) =>
                      updateDoc(i, e.target.value)
                    }
                    style={{
                      marginBottom: "12px",
                      width: "100%"
                    }}
                  />

                ))}

                <button
                  type="button"
                  className="btn-edit"
                  onClick={addRow}
                  style={{
                    marginTop: "10px",
                    width: "100%"
                  }}
                >
                  + Add Another Document
                </button>

              </div>

              {/* SUBMIT */}
              <button
                className="book-submit"
                onClick={submit}
                style={{
                  marginTop: "8px",
                  width: "100%"
                }}
              >
                Submit Document Request →
              </button>

            </div>

            {/* RIGHT SIDE */}
            <div
              className="appointments-section"
              style={{
                width: "100%",
                minWidth: "0"
              }}
            >

              <h2
                style={{
                  marginBottom: "20px",
                  fontSize: "1.5rem",
                  wordBreak: "break-word"
                }}
              >
                📄 My Document Requests
              </h2>

              {requests.length === 0 && (

                <div className="empty-state">

                  <span className="empty-state-icon">
                    📂
                  </span>

                  <p>
                    No document requests submitted yet
                  </p>

                </div>

              )}

              <div className="stagger">

                {requests.map((r) => (

                  <div
                    className="appointment-card"
                    key={r._id}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      wordBreak: "break-word"
                    }}
                  >

                    {/* TOP */}
                    <div
                      className="appt-top"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        flexWrap: "wrap"
                      }}
                    >

                      <div>

                        <div className="appt-doctor">
                          {r.purpose}
                        </div>

                        <div className="appt-meta">
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

                    {/* DETAILS */}
                    <div
                      className="appt-details"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: "14px"
                      }}
                    >

                      <div className="appt-detail-item">

                        <div className="appt-detail-label">
                          Patient Name
                        </div>

                        <div>
                          {r.patient_name}
                        </div>

                      </div>

                      <div className="appt-detail-item">

                        <div className="appt-detail-label">
                          Phone Number
                        </div>

                        <div>
                          {r.patient_phone}
                        </div>

                      </div>

                    </div>

                    {/* DOCUMENTS */}
                    <div className="doc-problem">

                      <div className="doc-problem-label">
                        Requested Documents
                      </div>

                      <ul
                        style={{
                          marginTop: "12px",
                          paddingLeft: "18px"
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

                    {/* PATIENT NOTE */}
                    {r.patient_note && (

                      <div className="appt-note">

                        <div className="appt-note-label">
                          Your Note
                        </div>

                        <div>
                          {r.patient_note}
                        </div>

                      </div>

                    )}

                    {/* STAFF NOTE */}
                    <div className="appt-note">

                      <div className="appt-note-label">
                        Staff Response
                      </div>

                      <div>
                        {r.staff_note || "Pending review"}
                      </div>

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
