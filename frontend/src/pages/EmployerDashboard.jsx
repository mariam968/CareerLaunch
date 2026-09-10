import { useEffect, useState } from "react";
import {
  getEmployerInternships,
  deleteEmployerInternship,
} from "../services/employerApi";

function EmployerDashboard() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInternships();
  }, []);

  async function loadInternships() {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployerInternships();
      setInternships(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this internship?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEmployerInternship(id);

      setInternships((current) =>
        current.filter((internship) => internship.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p>Loading your internships...</p>;
  }

  return (
    <div>
      <h1>Employer Dashboard</h1>

      <p>
        Manage your internship opportunities from one place.
      </p>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div>
        <button
          onClick={() => {
            window.location.href = "/employer/internships/create";
          }}
        >
          + Post Internship
        </button>
           <button
    onClick={() => {
      window.location.href = "/employer/applicants";
    }}
    style={{ marginLeft: "10px" }}
  >
    View Applicants
     </button>
      </div>

      <hr />

      <h2>My Internships</h2>

      {internships.length === 0 ? (
        <p>You haven't posted any internships yet.</p>
      ) : (
        internships.map((internship) => (
          <div
            key={internship.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{internship.title}</h3>

            <p>
              <strong>Company:</strong> {internship.company}
            </p>

            <p>
              <strong>Location:</strong> {internship.location}
            </p>

            <p>
              <strong>Type:</strong> {internship.internship_type}
            </p>

            <p>
              <strong>Category:</strong> {internship.category}
            </p>

            <p>
              <strong>Deadline:</strong> {internship.deadline}
            </p>

            <button
              onClick={() =>
                (window.location.href = `/employer/internships/edit/${internship.id}`)
              }
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(internship.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default EmployerDashboard;