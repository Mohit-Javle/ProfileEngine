import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import UserForm from "../components/UserForm";
import Preview from "../components/Preview";

export default function Home() {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    availability: "",
    skills: "",
    location: "",
    bio: ""
  };

  const [data, setData] = useState(emptyForm);
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ FETCH ON LOAD (ESLINT SAFE)
  useEffect(() => {
    let active = true;

    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles`);

        console.log("API RESPONSE 👉", res.data);

        if (!active) return;

        if (Array.isArray(res.data)) {
          setRecords(res.data);
        } else if (Array.isArray(res.data.data)) {
          setRecords(res.data.data);
        } else {
          setRecords([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProfiles();

    return () => {
      active = false;
    };
  }, []);

  // ✅ CREATE / UPDATE
  const handleSubmit = async () => {
    setServerErrors({});

    if (!data.name || !data.email) {
      alert("Name & Email required");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/profiles/${editingId}`,
          data
        );
        setEditingId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/profiles`, data);
      }

      // 🔁 RE-FETCH AFTER SAVE
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles`);
      setRecords(Array.isArray(res.data) ? res.data : res.data.data || []);

      setData(emptyForm);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        const { field, message } = err.response.data;
        setServerErrors({ [field]: message });
      } else {
        console.error("Save error:", err);
      }
    }
  };

  // ✅ EDIT
  const handleEdit = (profile) => {
    setData(profile);
    setEditingId(profile._id);
    setServerErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ DELETE + RESET FORM
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/profiles/${id}`);

      if (editingId === id) {
        setEditingId(null);
        setData(emptyForm);
        setServerErrors({});
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles`);
      setRecords(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // 🔍 NAME ONLY SEARCH
  const filteredRecords = records.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="ai-hero">
        <h1>User Form For Entry</h1>
      </header>

      <br />

      <section className="ai-layout">
        <UserForm
          data={data}
          setData={setData}
          onSubmit={handleSubmit}
          serverErrors={serverErrors}
        />
        <Preview data={data} />
      </section>

      <section className="ai-table-section">
        <div className="glass-card table-card">
          <div className="table-header">
            <h2 className="table-title">Saved Profiles</h2>

            <input
              type="text"
              className="table-search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredRecords.length === 0 ? (
            <p className="empty-text">No matching data found</p>
          ) : (
            <table className="ai-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Plan</th>
                  <th>Experience</th>
                  <th>Availability</th>
                  <th>Skills</th>
                  <th>Location</th>
                  <th>Bio</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      {item.orders && item.orders.length > 0 ? (
                        <span className="plan-badge">
                          {item.orders[item.orders.length - 1].plan}
                        </span>
                      ) : (
                        <span className="plan-badge free">Free</span>
                      )}
                    </td>
                    <td>{item.experience}</td>
                    <td>{item.availability}</td>
                    <td>{item.skills}</td>
                    <td>{item.location}</td>
                    <td>{item.bio}</td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
