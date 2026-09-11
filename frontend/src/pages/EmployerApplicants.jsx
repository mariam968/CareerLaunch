import { useEffect, useState } from "react";
import {
  getEmployerApplications,
  updateApplicationStatus,
} from "../services/employerApplicationsApi";

function EmployerApplicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployerApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(applicationId, newStatus) {
    try {
      setError("");

      const updatedApplication = await updateApplicationStatus(
        applicationId,
        newStatus
      );

      setApplications((current) =>
        current.map((application) =>
          application.id === applicationId
            ? updatedApplication
            : application
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p>Loading applicants...</p>;
  }

  return (
    <div>
      <h1>Applicants</h1>

      <p>
        View students who have applied to your internships.
      </p>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {applications.length === 0 ? (
        <div>
          <h2>No applicants yet</h2>

          <p>
            Applications from students will appear here.
          </p>
        </div>
      ) : (
        <div>
          {applications.map((application) => (
            <div
              key={application.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <h2>{application.full_name}</h2>

              <p>
                <strong>Internship:</strong>{" "}
                {application.internship_title}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {application.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {application.phone}
              </p>

              <p>
                <strong>Institution:</strong>{" "}
                {application.institution}
              </p>

              <p>
                <strong>Course:</strong>{" "}
                {application.course}
              </p>

              <p>
                <strong>Year of Study:</strong>{" "}
                {application.year_of_study}
              </p>

              <div>
                <strong>Status:</strong>

                <select
                  value={application.status}
                  onChange={(event) =>
                    handleStatusChange(
                      application.id,
                      event.target.value
                    )
                  }
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Under Review">
                    Under Review
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Accepted">
                    Accepted
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </div>

              <p>
                <strong>Applied:</strong>{" "}
                {new Date(
                  application.applied_at
                ).toLocaleDateString()}
              </p>

              <h3>Cover Letter</h3>

              <p>
                {application.cover_letter}
              </p>

              {application.cv && (
                <p>
                  <a
                    href={`http://127.0.0.1:8000${application.cv}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View CV
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerApplicants;