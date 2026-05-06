import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Prehome1.css";

const stats = [
  { value: "10K+", label: "Patients Served" },
  { value: "200+", label: "Specialists" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Care Available" },
];

const features = [
  {
    icon: "🗓️",
    title: "Smart Scheduling",
    desc: "Book appointments instantly with our intelligent scheduling system.",
  },
  {
    icon: "👨‍⚕️",
    title: "Expert Doctors",
    desc: "Connect with verified, approved specialists across all departments.",
  },
  {
    icon: "📋",
    title: "Patient Tracking",
    desc: "Monitor appointment status and doctor notes in real-time.",
  },
  {
    icon: "🔔",
    title: "Live Announcements",
    desc: "Stay updated with hospital news and important announcements.",
  },
];

export default function PreHome() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="prehome">
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* NAV */}
      <nav className="ph-nav">
        <div className="ph-logo">
          <span className="logo-icon">⚕</span>
          <span className="logo-text">MediCore</span>
        </div>
        <div className="ph-nav-actions">
          <button className="btn-ghost" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="ph-hero" ref={heroRef}>
        <div className="hero-badge">🏥 Next-Gen Hospital Management</div>
        <h1 className="hero-title">
          Healthcare That
          <br />
          <span className="gradient-text">Puts You First</span>
        </h1>
        <p className="hero-sub">
          Seamless appointment booking, real-time tracking, and expert care —
          all in one intelligent platform designed for patients and doctors. <br/>
          Developed By: Achanta Bhanu vamsi
        </p>
        <div className="hero-cta">
          <button className="btn-hero-primary" onClick={() => navigate("/register")}>
            Get Started Free
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-hero-ghost" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>

        {/* Floating cards */}
        <div className="floating-cards">
          <div className="float-card card-a">
            <span className="fc-icon">✅</span>
            <div>
              <div className="fc-title">Appointment Confirmed</div>
              <div className="fc-sub">Dr. Mehta · 10:30 AM</div>
            </div>
          </div>
          <div className="float-card card-b">
            <span className="fc-icon">🟢</span>
            <div>
              <div className="fc-title">Doctor Online</div>
              <div className="fc-sub">24 specialists available</div>
            </div>
          </div>
          <div className="float-card card-c">
            <span className="fc-icon">📊</span>
            <div>
              <div className="fc-title">98% Satisfaction</div>
              <div className="fc-sub">From 10,000+ patients</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ph-stats reveal">
        {stats.map((s, i) => (
          <div className="stat-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="ph-features">
        <div className="section-header reveal">
          <h2>Everything You Need</h2>
          <p>A complete ecosystem for modern healthcare management</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              className="feature-card reveal"
              key={i}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="ph-cta reveal">
        <div className="cta-card">
          <h2>Ready to Transform Your Healthcare Experience?</h2>
          <p>Join thousands of patients and doctors already on MediCore.</p>
          <div className="cta-buttons">
            <button className="btn-hero-primary" onClick={() => navigate("/register")}>
              Create Account
            </button>
            <button className="btn-ghost-white" onClick={() => navigate("/login")}>
              Login to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className="ph-footer">
        <span className="ph-logo">
          <span className="logo-icon">⚕</span> MediCore
        </span>
        <span>© 2025 MediCore Hospital Management. All rights reserved.</span>
      </footer> */}
      <footer className="ph-footer">

  <div className="footer-left">
    <span className="ph-logo">
      <span className="logo-icon">⚕</span> MediCore
    </span>

    <span className="footer-copy">
      © 2025 MediCore Hospital Management. All rights reserved.
    </span>
  </div>

  <div className="footer-links">

    <a
      href="https://www.linkedin.com/in/achanta-bhanu-vamsi/"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-btn linkedin-btn"
    >
       💼 LinkedIn
    </a>

    <a
      href="https://bhanuvamsi2005.github.io/Bhanuvamsiportfolio/"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-btn portfolio-btn"
    >
      🌐 Portfolio
    </a>

    <a
      href="bhanuvamsia@gmail.com"
      className="footer-btn contact-btn"
    >
      ✉ Contact
    </a>

  </div>

</footer>
    </div>
  );
}