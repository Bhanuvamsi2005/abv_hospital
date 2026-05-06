// import { useEffect, useState } from "react";
// import API from "../api";

// export default function Announcements() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     API.get("/announcements").then(res => setList(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Hospital Announcements</h2>

//       {list.map(a => (
//         <div key={a._id}>
//           <h3>{a.title}</h3>
//           <p>{a.message}</p>
//           {a.image && <img src={a.image} width="200" />}
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

export default function Announcements() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/announcements").then(res => setList(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="page-blob blob-1" />
        <div className="page-blob blob-2" />

        <div className="ann-page">
          <div className="ann-header fade-in">
            <h1>🔔 Hospital Announcements</h1>
            <p>Stay informed with the latest updates from MediCore</p>
          </div>

          {list.length === 0 && (
            <div className="empty-state">
              <span className="empty-state-icon">📢</span>
              <p>No announcements at this time</p>
            </div>
          )}

          <div className="stagger">
            {list.map((a) => (
              <div className="ann-card" key={a._id}>
                <div className="ann-title">{a.title}</div>
                <div className="ann-message">{a.message}</div>
                {a.image && <img className="ann-image" src={a.image} alt={a.title} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}