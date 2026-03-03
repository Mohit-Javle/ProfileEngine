import { useState } from "react";
import "./UserForm.css";

export default function UserForm({ data, setData, onSubmit, serverErrors = {} }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  // ✅ FRONTEND VALIDATION (ALL REQUIRED)
  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required";

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!data.role.trim()) newErrors.role = "Role is required";
    if (!data.experience) newErrors.experience = "Experience required";
    if (!data.availability) newErrors.availability = "Availability required";
    if (!data.skills.trim()) newErrors.skills = "Skills required";
    if (!data.location.trim()) newErrors.location = "Location required";

    if (!data.bio.trim() || data.bio.length < 5) {
      newErrors.bio = "Bio min 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit();
  };

  return (
    <div className="glass-card form-advanced">
      <h2>User Profile Input</h2>

      <div className="form-grid">
        <div className="form-control">
          <input name="name" placeholder="Name" value={data.name} onChange={handleChange}
            className={(errors.name || serverErrors.name) ? "input-error" : ""} />
          {(errors.name || serverErrors.name) && <small>{errors.name || serverErrors.name}</small>}
        </div>

        <div className="form-control">
          <input name="email" placeholder="Email" value={data.email} onChange={handleChange}
            className={(errors.email || serverErrors.email) ? "input-error" : ""} />
          {(errors.email || serverErrors.email) && <small>{errors.email || serverErrors.email}</small>}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-control">
          <input name="phone" placeholder="Phone" value={data.phone} onChange={handleChange}
            className={(errors.phone || serverErrors.phone) ? "input-error" : ""} />
          {(errors.phone || serverErrors.phone) && <small>{errors.phone || serverErrors.phone}</small>}
        </div>

        <div className="form-control">
          <input name="role" placeholder="Role" value={data.role} onChange={handleChange}
            className={(errors.role || serverErrors.role) ? "input-error" : ""} />
          {(errors.role || serverErrors.role) && <small>{errors.role || serverErrors.role}</small>}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-control">
          <select name="experience" value={data.experience} onChange={handleChange}
            className={(errors.experience || serverErrors.experience) ? "input-error" : ""}>
            <option value="">Experience</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Senior</option>
          </select>
          {(errors.experience || serverErrors.experience) && <small>{errors.experience || serverErrors.experience}</small>}
        </div>

        <div className="form-control">
          <select name="availability" value={data.availability} onChange={handleChange}
            className={(errors.availability || serverErrors.availability) ? "input-error" : ""}>
            <option value="">Availability</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Freelance</option>
          </select>
          {(errors.availability || serverErrors.availability) && <small>{errors.availability || serverErrors.availability}</small>}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-control">
          <input name="skills" placeholder="Skills" value={data.skills} onChange={handleChange}
            className={(errors.skills || serverErrors.skills) ? "input-error" : ""} />
          {(errors.skills || serverErrors.skills) && <small>{errors.skills || serverErrors.skills}</small>}
        </div>

        <div className="form-control">
          <input name="location" placeholder="Location" value={data.location} onChange={handleChange}
            className={(errors.location || serverErrors.location) ? "input-error" : ""} />
          {(errors.location || serverErrors.location) && <small>{errors.location || serverErrors.location}</small>}
        </div>
      </div>

      <div className="form-control">
        <textarea name="bio" placeholder="Bio" value={data.bio} onChange={handleChange}
          className={(errors.bio || serverErrors.bio) ? "input-error" : ""} />
        {(errors.bio || serverErrors.bio) && <small>{errors.bio || serverErrors.bio}</small>}
      </div>

      <button className="ai-btn-primary" onClick={handleSubmit}>
        Save Profile
      </button>
    </div>
  );
}
