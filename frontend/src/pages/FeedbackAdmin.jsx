import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import API from "../api";
import "./Feedback.css";
import "./Global.css";

export default function FeedbackAdmin() {

  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {

    try {

      const res = await API.get("/feedback/all");

      setFeedbacks(res.data);

    } catch {
      alert("Unable to fetch feedback");
    }
  };

  const deleteFeedback = async (id) => {

    try {

      await API.delete(`/feedback/delete/${id}`);

      fetchFeedbacks();

    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="feedback-page">

        <div className="feedback-history">

          <h1 style={{ marginBottom: "30px" }}>
            ⭐ Patient Feedback
          </h1>

          {feedbacks.length === 0 && (
            <div className="feedback-item">
              No feedback available
            </div>
          )}

          {feedbacks.map((f) => (

            <div
              className="feedback-item"
              key={f._id}
            >

              <div className="feedback-top">

                <div>
                  <h3>{f.patient_name}</h3>

                  <small>
                    {f.created_at}
                  </small>
                </div>

                <div>
                  {"⭐".repeat(f.rating)}
                </div>

              </div>

              <p>{f.message}</p>

              <button
                className="feedback-btn"
                style={{
                  marginTop: "15px",
                  background: "#ef4444"
                }}
                onClick={() => deleteFeedback(f._id)}
              >
                Delete Feedback
              </button>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}