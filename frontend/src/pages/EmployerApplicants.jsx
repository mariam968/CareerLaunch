import { useEffect, useState } from "react";
import {
  getEmployerApplications,
  updateApplicationStatus,
} from "../services/employerApplicationsApi";
import { getMediaUrl } from "../services/api";
import CvViewer from "../components/CvViewer";

function EmployerApplicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // CV viewer state
  const [selectedCv, setSelectedCv] = useState(null);

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

  function getStatusStyle(status) {
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
        return "bg-amber-100 text-amber-700 border-amber-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  }

  function openCv(application) {
    if (!application.cv) {
      return;
    }

    const cvUrl = getMediaUrl(application.cv);

    const fileName =
      application.cv.split("/").pop()?.split("?")[0] || "CV";

    setSelectedCv({
      url: cvUrl,
      fileName,
      applicantName: application.full_name,
    });
  }

  function closeCv() {
    setSelectedCv(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="text-sm font-medium text-slate-600">
            Loading applicants...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-blue-600 p-7 text-white shadow-lg">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl">
                👥
              </div>

              <div>
                <p className="text-sm font-medium text-blue-100">
                  Employer Portal
                </p>

                <h1 className="text-2xl font-bold md:text-3xl">
                  Applicants
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  Review and manage students who applied.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white/15 px-5 py-3 text-center">
              <p className="text-2xl font-bold">
                {applications.length}
              </p>

              <p className="text-xs text-blue-100">
                Total Applicants
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* No applicants */}
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              👥
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              No applicants yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Applications from students will appear here once they apply to
              your internships.
            </p>

            <button
              onClick={() => {
                window.location.href = "/employer/dashboard";
              }}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Applicant Header */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white p-6">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-sm">
                        {application.full_name
                          ? application.full_name.charAt(0).toUpperCase()
                          : "S"}
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {application.full_name}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-blue-600">
                          {application.internship_title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Applicant Details */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
                      Applicant Information
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Email
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                          {application.email}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Phone
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {application.phone}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Institution
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {application.institution}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Course
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {application.course}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Year of Study
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {application.year_of_study}
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                          Applied
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {new Date(
                            application.applied_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Application Status */}
                  <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Application Status
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Update the applicant's progress.
                        </p>
                      </div>

                      <select
                        value={application.status}
                        onChange={(event) =>
                          handleStatusChange(
                            application.id,
                            event.target.value
                          )
                        }
                        className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Under Review">
                          Under Review
                        </option>
                        <option value="Shortlisted">
                          Shortlisted
                        </option>
                        <option value="Interview">Interview</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="mb-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                        ✉️
                      </span>
                      Cover Letter
                    </h3>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                        {application.cover_letter}
                      </p>
                    </div>
                  </div>

                  {/* CV */}
                  {application.cv && (
                    <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-lg">
                          📄
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            Curriculum Vitae
                          </h3>

                          <p className="text-xs text-slate-500">
                            View the applicant's CV
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openCv(application)}
                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View CV
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CV Viewer Modal */}
      {selectedCv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Viewer Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Applicant CV
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedCv.applicantName}
                </h2>

                <p className="text-xs text-slate-500">
                  {selectedCv.fileName}
                </p>
              </div>

              <button
                type="button"
                onClick={closeCv}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-red-100 hover:text-red-600"
                aria-label="Close CV viewer"
              >
                ×
              </button>
            </div>

            {/* Viewer */}
            <div className="min-h-0 flex-1 bg-slate-100">
              <CvViewer
                url={selectedCv.url}
                fileName={selectedCv.fileName}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerApplicants;