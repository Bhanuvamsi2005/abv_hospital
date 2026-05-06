// import { useEffect, useState } from "react";
// import API from "../api";

// export default function AnnouncementsAdmin() {
//   const [list, setList] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     message: "",
//     image: ""
//   });

//   const fetchData = async () => {
//     const res = await API.get("/announcements");
//     setList(res.data);
//   };

//   const create = async () => {
//     await API.post("/announcements", form);
//     fetchData();
//   };

//   const remove = async (id) => {
//     await API.delete(`/announcements/${id}`);
//     fetchData();
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Manage Announcements</h2>

//       <input placeholder="Title"
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       /><br />

//       <textarea placeholder="Message"
//         onChange={(e) => setForm({ ...form, message: e.target.value })}
//       /><br />

//       <input placeholder="Image URL"
//         onChange={(e) => setForm({ ...form, image: e.target.value })}
//       /><br />

//       <button onClick={create}>Post</button>

//       <hr />

//       {list.map(a => (
//         <div key={a._id}>
//           <h4>{a.title}</h4>
//           <p>{a.message}</p>
//           {a.image && <img src={a.image} width="200" />}
//           <button onClick={() => remove(a._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }











import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import "./pages.css";
import "./Global.css";

export default function AnnouncementsAdmin() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", image: "" });

  const fetchData = async () => {
    const res = await API.get("/announcements");
    setList(res.data);
  };

  const create = async () => {
    await API.post("/announcements", form);
    fetchData();
  };

  const remove = async (id) => {
    await API.delete(`/announcements/${id}`);
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="page-blob blob-1" />
        <div className="page-blob blob-2" />

        <div className="ann-admin-page">
          <div className="ann-header fade-in">
            <h1>📢 Manage Announcements</h1>
            <p>Create and manage hospital announcements</p>
          </div>

          <div className="ann-admin-layout">
            {/* Form */}
            <div className="ann-form-card fade-in">
              <div className="ann-form-title">📝 New Announcement</div>

              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="Announcement title"
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Write your message..."
                  style={{ minHeight: "100px" }}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL (optional)</label>
                <input className="form-input" placeholder="https://..."
                  onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>

              <button className="ann-post-btn" onClick={create}>
                Post Announcement →
              </button>
            </div>

            {/* List */}
            <div>
              <div className="ann-list-title">
                📋 Posted Announcements ({list.length})
              </div>

              {list.length === 0 && (
                <div className="empty-state">
                  <span className="empty-state-icon">📭</span>
                  <p>No announcements yet</p>
                </div>
              )}

              <div className="stagger">
                {list.map((a) => (
                  <div className="ann-admin-card" key={a._id}>
                    <div className="ann-admin-header">
                      <div className="ann-admin-title">{a.title}</div>
                      <button className="btn-delete" onClick={() => remove(a._id)}>
                        🗑 Delete
                      </button>
                    </div>
                    <div className="ann-admin-msg">{a.message}</div>
                    {a.image && <img className="ann-admin-img" src={a.image} alt={a.title} />}
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