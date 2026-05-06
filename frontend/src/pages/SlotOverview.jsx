import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import "./Doctor.css";
import "./Global.css";

export default function SlotOverview() {

  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    try {

      const res = await API.get("/appointments/all");

      // ✅ ONLY ACCEPTED APPOINTMENTS
      const acceptedApps = res.data.filter(
        (a) => a.status === "accepted"
      );

      setApps(acceptedApps);

    } catch {
      alert("Error fetching slots");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // ✅ GROUP BY DOCTOR + DATE + SLOT
  const grouped = {};

  apps.forEach((a) => {

    const key = `${a.doctor_id}-${a.date}-${a.time}`;

    if (!grouped[key]) {

      grouped[key] = {
        doctor: a.doctor_id,
        date: a.date,
        time: a.time,
        patients: []
      };
    }

    grouped[key].patients.push(a);
  });

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
              <h1>Slot Overview</h1>
              <p>
                View accepted patient slots and availability
              </p>
            </div>

          </div>

          {/* EMPTY */}
          {Object.values(grouped).length === 0 && (
            <div className="empty-state">

              <span className="empty-state-icon">
                📅
              </span>

              <p>
                No accepted appointments yet
              </p>

            </div>
          )}

          {/* SLOT CARDS */}
          <div className="stagger">

            {Object.values(grouped).map((slot, index) => {

              const booked = slot.patients.length;

              const full = booked >= 6;

              return (

                <div
                  className="doc-appt-card"
                  key={index}
                >

                  {/* SLOT HEADER */}
                  <div className="doc-appt-header">

                    <div>

                      <div className="doc-patient-name">
                        🩺 {slot.doctor}
                      </div>

                      <div className="doc-appt-meta">
                        📅 {slot.date} · 🕐 {slot.time}
                      </div>

                    </div>

                    {/* SLOT STATUS */}
                    <span
                      className={`status-badge ${
                        full
                          ? "status-rejected"
                          : "status-accepted"
                      }`}
                    >

                      {full
                        ? "FULL"
                        : `${booked}/6 booked`}

                    </span>

                  </div>

                  {/* PATIENT LIST */}
                  <div style={{ marginTop: "15px" }}>

                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "10px",
                        color: "var(--white)"
                      }}
                    >
                      Accepted Patients
                    </div>

                    {slot.patients.map((p) => (

                      <div
                        key={p._id}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "12px",
                          borderRadius: "12px",
                          marginBottom: "10px"
                        }}
                      >

                        <div
                          style={{
                            fontWeight: "600",
                            marginBottom: "6px"
                          }}
                        >
                          👤 {p.patient_name}
                        </div>

                        <div style={{ marginBottom: "4px" }}>
                          📞 {p.patient_phone}
                        </div>

                        <div style={{ marginBottom: "4px" }}>
                          ⚧ {p.patient_gender}
                        </div>

                        <div style={{ marginBottom: "4px" }}>
                          🎂 {p.patient_age}
                        </div>

                        <div>
                          ⚠ {p.problem}
                        </div>

                      </div>

                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </div>
    </>
  );
}