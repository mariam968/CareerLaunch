import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmployerProfile,
  updateEmployerProfile,
} from "../services/employerProfileApi";

function EmployerProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    phone: "",
    location: "",
    industry: "",
    description: "",
    website: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployerProfile();

      setFormData({
        company_name: data.company_name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        industry: data.industry || "",
        description: data.description || "",
        website: data.website || "",
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

    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateEmployerProfile(formData);

      setSuccess(
        "Company profile updated successfully."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading company profile...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <button
        type="button"
        onClick={() =>
          navigate("/employer/dashboard")
        }
      >
        ← Back to Dashboard
      </button>

      <h1>Company Profile</h1>

      <p>
        Manage your company's information displayed
        on CareerLaunch.
      </p>

      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            color: "green",
            marginBottom: "20px",
          }}
        >
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Company Name</strong>
          </label>

          <br />

          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter company name"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Company Email</strong>
          </label>

          <br />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="company@example.com"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Phone Number</strong>
          </label>

          <br />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 0700123456"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Location</strong>
          </label>

          <br />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Kampala, Uganda"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Industry</strong>
          </label>

          <br />

          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="e.g. Technology"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Company Description</strong>
          </label>

          <br />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell students about your company..."
            rows="6"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              resize: "vertical",
            }}
          />
        </div>

        <br />

        <div>
          <label>
            <strong>Company Website</strong>
          </label>

          <br />

          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Company Profile"}
        </button>
      </form>
    </div>
  );
}

export default EmployerProfile;