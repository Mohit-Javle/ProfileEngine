import "./Preview.css";

export default function Preview({ data }) {
  // 🎨 Generate unique real-looking avatar from name
  const avatarUrl = data.name
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        data.name
      )}`
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

  return (
    <div className="glass-card preview-system">
      {/* HEADER */}
      <div className="preview-header">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="avatar-img"
        />

        <h2>{data.name || "Your Name"}</h2>

        <p className="role">
          {data.role || "Professional Role"}
        </p>

        <div className="meta">
          <span>{data.experience || "Experience"}</span>
          <span>{data.availability || "Availability"}</span>
        </div>
      </div>

      {/* CONTACT */}
      <div className="preview-section">
        <h4>Contact Information</h4>
        <p>{data.email || "email@example.com"}</p>
        <p>{data.phone || "+91 XXXXX XXXXX"}</p>
        <p>{data.location || "City, Country"}</p>
      </div>

      {/* SKILLS */}
      <div className="preview-section">
        <h4>Skills</h4>
        <div className="skills">
          {(data.skills || "React, JavaScript")
            .split(",")
            .map((skill, index) => (
              <span key={index} className="skill-chip">
                {skill.trim()}
              </span>
            ))}
        </div>
      </div>

      {/* BIO */}
      <div className="preview-section">
        <h4>Professional Summary</h4>
        <p className="bio">
          {data.bio ||
            "A short professional summary will appear here describing experience, skills, and career focus."}
        </p>
      </div>
    </div>
  );
}
