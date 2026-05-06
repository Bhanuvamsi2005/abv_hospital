import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import "./Doctor.css";
import "./Global.css";

export default function History() {

  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {

    const res = await API.get("/appointments/all");

    const today =
      new Date().toISOString().split("T")[0];

    const oldAppointments =
      res.data.filter(
        (a) => a.date < today
      );

    setHistory(oldAppointments);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-wrapper">

        <div className="page-blob blob-1" />
        <div className="page-blob blob-2" />

        <div className="doctor-page">

          <div className="doctor-header">
            <div>
              <h1>Appointment History</h1>
              <p>
                Previous appointments history
              </p>
            </div>
          </div>

          {history.length === 0 && (

            <div className="empty-state">

              <span className="empty-state-icon">
                📜
              </span>

              <p>
                No history available
              </p>

            </div>

          )}

          <div className="stagger">

            {history.map((a) => (

              <div
                className="doc-appt-card"
                key={a._id}
              >

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

                </div>

                {a.problem && (

                  <div className="doc-problem">

                    <div className="doc-problem-label">
                      Problem
                    </div>

                    {a.problem}

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