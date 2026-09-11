import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInternshipApplicants } from "../services/employerInternshipApplicantsApi";
import { updateApplicationStatus } from "../services/employerApplicationsApi";

function EmployerInternshipApplicants() {
  const { internshipId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplicants();
  }, [internshipId]);

  async function loadApplicants() {
    try {
      setLoading(true);
      setError("");

      const data = await getInternshipApplicants(
        internshipId
      );

      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(
    applicationId,
    newStatus
  ) {
    try {
      setError("");

      const updatedApplication =
        await updateApplicationStatus(
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
      <button
        type="button"
        onClick={() =>
          navigate("/employer/dashboard")
        }
      >
        ← Back to Dashboard
      </button>

      <h1>Internship Applicants</h1>

      <p>
        Review students who applied for this
        internship.
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
            Students who apply for this internship
            will appear here.
          </p>
        </div>
      ) : (
        <div>
          <h2>
            {applications.length} Applicant
            {applications.length !== 1 ? "s" : ""}
          </h2>

          {applications.map((application) => (
            <div
              key={application.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            >
              <h2>
                {application.full_name}
              </h2>

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

              <p>
                <strong>Applied:</strong>{" "}
                {new Date(
                  application.applied_at
                ).toLocaleDateString()}
              </p>

              <div style={{ margin: "15px 0" }}>
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
                    padding: "6px",
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

export default EmployerInternshipApplicants;