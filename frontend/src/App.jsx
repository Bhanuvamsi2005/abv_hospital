// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Book from "./pages/Book";
// import Doctor from "./pages/Doctor";
// import Admin from "./pages/Admin";

// import Announcements from "./pages/Announcements";
// import AnnouncementsAdmin from "./pages/AnnouncementsAdmin";


// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/book" element={<Book />} />
//         <Route path="/doctor" element={<Doctor />} />
//         <Route path="/admin" element={<Admin />} />


//         <Route path="/announcements" element={<Announcements />} />
// <Route path="/staff-announcements" element={<AnnouncementsAdmin />} />


// <Route path="/forgot-password" element={<ForgotPassword />} />
// <Route path="/reset-password/:token" element={<ResetPassword />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;







// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreHome from "./pages/Prehome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Book from "./pages/Book";
import Doctor from "./pages/Doctor";
import Admin from "./pages/Admin";
import Announcements from "./pages/Announcements";
import AnnouncementsAdmin from "./pages/AnnouncementsAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SlotOverview from "./pages/SlotOverview";
import History from "./pages/History";
import Feedback from "./pages/Feedback";
import FeedbackAdmin from "./pages/FeedbackAdmin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page - PreHome first */}
        <Route path="/" element={<PreHome />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        {/* Main Application Routes */}
        <Route path="/book" element={<Book />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* Announcements Routes */}
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/staff-announcements" element={<AnnouncementsAdmin />} />

        <Route path="/slots" element={<SlotOverview />} />

        <Route path="/history" element={<History />} />

        <Route path="/feedback" element={<Feedback />} />

        <Route path="/feedback-admin" element={<FeedbackAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;