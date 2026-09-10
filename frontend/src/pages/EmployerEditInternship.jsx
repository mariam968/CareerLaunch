import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployerInternships,
  updateEmployerInternship,
} from "../services/employerApi";

function EmployerEditInternship() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    internship_type: "Full-time",
    category: "",
    description: "",
    requirements: "",
    responsibilities: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInternship();
  }, [id]);

  async function loadInternship() {
    try {
      setLoading(true);
      setError("");

      const internships = await getEmployerInternships();

      const internship = internships.find(
        (item) => item.id === Number(id)
      );

      if (!internship) {
        throw new Error("Internship not found.");
      }

      setFormData({
        title: internship.title || "",
        company: internship.company || "",
        location: internship.location || "",
        internship_type: internship.internship_type || "Full-time",
        category: internship.category || "",
        description: internship.description || "",
        requirements: internship.requirements || "",
        responsibilities: internship.responsibilities || "",
        deadline: internship.deadline || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateEmployerInternship(id, formData);

      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading internship...</p>;
  }

  return (
    <div>
      <h1>Edit Internship</h1>

      <p>Update the details of your internship opportunity.</p>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Internship Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Company Name</label>
          <br />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Location</label>
          <br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Internship Type</label>
          <br />
          <select
            name="internship_type"
            value={formData.internship_type}
            onChange={handleChange}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <br />

        <div>
          <label>Category</label>
          <br />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <br />

        <div>
          <label>Requirements</label>
          <br />
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <br />

        <div>
          <label>Responsibilities</label>
          <br />
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <br />

        <div>
          <label>Application Deadline</label>
          <br />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/employer/dashboard")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EmployerEditInternship;