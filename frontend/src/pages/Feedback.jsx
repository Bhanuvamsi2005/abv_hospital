import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import API from "../api";
import "./Feedback.css";
import "./Global.css";

export default function Feedback() {

  const [data, setData] = useState({
    patient_name: "",
    rating: 5,
    message: ""
  });

  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {

    try {

      const res = await API.get("/feedback/my");

      setFeedbacks(res.data);

    } catch {
      alert("Unable to fetch feedback");
    }
  };

  const submit = async () => {

    try {

      await API.post("/feedback/add", data);

      alert("Feedback submitted");

      fetchFeedback();

      setData({
        patient_name: "",
        rating: 5,
        message: ""
      });

    } catch {
      alert("Submission failed");
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <>
      <Navbar />

      <div className="feedback-page">

        <div className="feedback-card">

          <h1>⭐ Patient Feedback</h1>

          <input
            className="feedback-input"
            placeholder="Your Name"
            value={data.patient_name}
            onChange={(e) =>
              setData({
                ...data,
                patient_name: e.target.value
              })
            }
          />

          <select
            className="feedback-input"
            value={data.rating}
            onChange={(e) =>
              setData({
                ...data,
                rating: Number(e.target.value)
              })
            }
          >

            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4}>⭐⭐⭐⭐ Good</option>
            <option value={3}>⭐⭐⭐ Average</option>
            <option value={2}>⭐⭐ Poor</option>
            <option value={1}>⭐ Very Bad</option>

          </select>

          <textarea
            className="feedback-textarea"
            placeholder="Write your feedback..."
            value={data.message}
            onChange={(e) =>
              setData({
                ...data,
                message: e.target.value
              })
            }
          />

          <button
            className="feedback-btn"
            onClick={submit}
          >
            Submit Feedback
          </button>

        </div>

        <div className="feedback-history">

          <h2>📝 My Feedback</h2>

          {feedbacks.map((f) => (

            <div
              className="feedback-item"
              key={f._id}
            >

              <div className="feedback-top">

                <h3>{f.patient_name}</h3>

                <span>
                  {"⭐".repeat(f.rating)}
                </span>

              </div>

              <p>{f.message}</p>

              <small>{f.created_at}</small>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}