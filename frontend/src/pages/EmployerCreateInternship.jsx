import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployerInternship } from "../services/employerApi";

function EmployerCreateInternship() {
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createEmployerInternship(formData);

      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Post Internship</h1>

      <p>
        Create a new internship opportunity for students.
      </p>

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
            placeholder="e.g. Python Developer Intern"
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
            placeholder="Enter company name"
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
            placeholder="e.g. Kampala"
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
            placeholder="e.g. Software Development"
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
            placeholder="Describe the internship..."
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
            placeholder="What qualifications or skills should applicants have?"
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
            placeholder="What will the intern be responsible for?"
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

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Internship"}
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

export default EmployerCreateInternship;