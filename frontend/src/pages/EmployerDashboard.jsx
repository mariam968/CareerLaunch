import { useEffect, useState } from "react";
import {
  getEmployerInternships,
  deleteEmployerInternship,
} from "../services/employerApi";

import {
  getEmployerDashboardStats,
} from "../services/employerDashboardApi";

function EmployerDashboard() {
  const [internships, setInternships] = useState([]);

  const [stats, setStats] = useState({
    total_internships: 0,
    total_applicants: 0,
    accepted_applicants: 0,
    pending_applicants: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [internshipData, statsData] = await Promise.all([
        getEmployerInternships(),
        getEmployerDashboardStats(),
      ]);

      setInternships(internshipData);
      setStats(statsData);
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
      setError("");

      await deleteEmployerInternship(id);

      setInternships((current) =>
        current.filter(
          (internship) => internship.id !== id
        )
      );

      setStats((current) => ({
        ...current,
        total_internships: Math.max(
          0,
          current.total_internships - 1
        ),
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p>Loading your dashboard...</p>;
  }

  return (
    <div>
      <h1>Employer Dashboard</h1>

      <p>
        Manage your internship opportunities and
        applicants from one place.
      </p>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* Dashboard Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          margin: "30px 0",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Internships</h3>

          <h2>
            {stats.total_internships}
          </h2>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Applicants</h3>

          <h2>
            {stats.total_applicants}
          </h2>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Pending</h3>

          <h2>
            {stats.pending_applicants}
          </h2>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Accepted</h3>

          <h2>
            {stats.accepted_applicants}
          </h2>
        </div>
      </div>

      {/* Dashboard Actions */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => {
            window.location.href =
              "/employer/internships/create";
          }}
        >
          + Post Internship
        </button>

        <button
          onClick={() => {
            window.location.href =
              "/employer/applicants";
          }}
          style={{ marginLeft: "10px" }}
        >
          View Applicants
        </button>
      </div>

      <hr />

      {/* Internships */}
      <h2>My Internships</h2>

      {internships.length === 0 ? (
        <div>
          <h3>You haven't posted any internships yet.</h3>

          <p>
            Create your first internship opportunity
            to start receiving applications.
          </p>

          <button
            onClick={() => {
              window.location.href =
                "/employer/internships/create";
            }}
          >
            Post Your First Internship
          </button>

          <button
  onClick={() => {
    window.location.href =
      "/employer/profile";
  }}
  style={{ marginLeft: "10px" }}
>
  Company Profile
</button>
        </div>
      ) : (
        <div>
          {internships.map((internship) => (
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
                <strong>Company:</strong>{" "}
                {internship.company}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {internship.location}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {internship.internship_type}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {internship.category}
              </p>

              <p>
                <strong>Deadline:</strong>{" "}
                {internship.deadline}
              </p>

              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() =>
                    (window.location.href =
                      `/employer/internships/edit/${internship.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(internship.id)
                  }
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;