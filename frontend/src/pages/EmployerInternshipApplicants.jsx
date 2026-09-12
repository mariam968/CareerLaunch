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

      const data = await getInternshipApplicants(internshipId);

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

  function getStatusClasses(status) {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";

      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";

      case "Shortlisted":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "Interview":
        return "bg-purple-100 text-purple-700 border-purple-200";

      case "Under Review":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-blue-600">
              Loading applicants...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          type="button"
          onClick={() =>
            navigate("/employer/dashboard")
          }
          className="mb-6 flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <span className="text-lg">←</span>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-blue-600 shadow-lg">
          <div className="flex flex-col gap-5 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                👥
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white md:text-3xl">
                  Internship Applicants
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  Review and manage students who applied for this internship.
                </p>
              </div>

            </div>

            {/* Applicant count */}
            <div className="rounded-xl bg-blue-700 px-5 py-3">
              <p className="text-xs font-medium text-blue-100">
                Total Applicants
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {applications.length}
              </p>
            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <span className="text-lg">⚠️</span>

            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              👥
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No applicants yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Students who apply for this internship will appear here.
              Once applications start coming in, you can review their
              profiles and update their application status.
            </p>

          </div>
        ) : (
          <div>

            {/* Section heading */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Applications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review each candidate and update their progress.
                </p>
              </div>
            </div>

            {/* Applicants */}
            <div className="space-y-6">

              {applications.map((application) => (
                <div
                  key={application.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >

                  {/* Applicant header */}
                  <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 md:px-7">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                      <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                          {application.full_name
                            ? application.full_name
                                .charAt(0)
                                .toUpperCase()
                            : "S"}
                        </div>

                        <div>
                          <h2 className="text-lg font-bold text-slate-900">
                            {application.full_name}
                          </h2>

                          <p className="text-sm text-slate-500">
                            Applied{" "}
                            {new Date(
                              application.applied_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-3">

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>

                        <select
                          value={application.status}
                          onChange={(event) =>
                            handleStatusChange(
                              application.id,
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

                    </div>
                  </div>

                  {/* Student details */}
                  <div className="px-6 py-6 md:px-7">

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                      {/* Email */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Email
                        </p>

                        <p className="mt-1 break-words text-sm font-medium text-slate-800">
                          {application.email || "Not provided"}
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Phone
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {application.phone || "Not provided"}
                        </p>
                      </div>

                      {/* Institution */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Institution
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {application.institution || "Not provided"}
                        </p>
                      </div>

                      {/* Course */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Course
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {application.course || "Not provided"}
                        </p>
                      </div>

                      {/* Year */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Year of Study
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {application.year_of_study || "Not provided"}
                        </p>
                      </div>

                      {/* Applied date */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Application Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {new Date(
                            application.applied_at
                          ).toLocaleDateString()}
                        </p>
                      </div>

                    </div>

                    {/* Cover letter */}
                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">

                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-lg">✉️</span>

                        <h3 className="font-semibold text-slate-900">
                          Cover Letter
                        </h3>
                      </div>

                      <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                        {application.cover_letter ||
                          "No cover letter provided."}
                      </p>

                    </div>

                    {/* CV */}
                    <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-lg">
                          📄
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Student CV
                          </p>

                          <p className="text-xs text-slate-500">
                            Review the applicant's CV
                          </p>
                        </div>
                      </div>

                      {application.cv ? (
                        <a
                          href={`http://127.0.0.1:8000${application.cv}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          View CV →
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-slate-400">
                          No CV provided
                        </span>
                      )}

                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default EmployerInternshipApplicants;