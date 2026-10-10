
import { useEffect, useState } from "react";
import {
  getEmployerInternships,
  deleteEmployerInternship,
  getEmployerProfile,
} from "../services/employerApi";
import { getEmployerDashboardStats } from "../services/employerDashboardApi";

function EmployerDashboard() {
  const [internships, setInternships] = useState([]);
  const [stats, setStats] = useState({
    total_internships: 0,
    total_applicants: 0,
    accepted_applicants: 0,
    pending_applicants: 0,
  });
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [internshipData, statsData, profileData] = await Promise.all([
        getEmployerInternships(),
        getEmployerDashboardStats(),
        getEmployerProfile(),
      ]);

      setInternships(
        Array.isArray(internshipData)
          ? internshipData
          : internshipData.results || []
      );
      setStats(statsData);
      setVerificationStatus(profileData.verification_status || "pending");
    } catch (err) {
      setError(err.message || "Unable to load your dashboard.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this internship?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteEmployerInternship(id);

      setInternships((current) =>
        current.filter((internship) => internship.id !== id)
      );

      setStats((current) => ({
        ...current,
        total_internships: Math.max(0, current.total_internships - 1),
      }));
    } catch (err) {
      setError(err.message || "Failed to delete internship.");
    }
  }

  function handlePostInternship() {
    if (verificationStatus !== "verified") return;
    window.location.href = "/employer/internships/create";
  }

  function navigateTo(path) {
    window.location.href = path;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl bg-blue-600 p-5 text-white shadow-lg sm:mb-8 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                  🏢
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-blue-100 sm:text-sm">
                    Employer Portal
                  </p>
                  <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                    Employer Dashboard
                  </h1>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage your internship opportunities, applications, and
                applicants from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePostInternship}
              disabled={verificationStatus !== "verified"}
              className={`w-full rounded-xl px-5 py-3 text-sm font-bold shadow-md transition sm:w-auto ${
                verificationStatus === "verified"
                  ? "bg-white text-blue-600 hover:bg-blue-50"
                  : "cursor-not-allowed bg-white/40 text-white"
              }`}
            >
              + Post Internship
            </button>
          </div>
        </div>

        {verificationStatus === "pending" && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:mb-8 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg sm:h-12 sm:w-12 sm:text-xl">
                🟡
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-amber-900 sm:text-lg">
                  Verification Pending
                </h2>
                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Your company information is being reviewed by CareerLaunch.
                  You can post internship opportunities once your account is
                  verified.
                </p>
              </div>
            </div>
          </div>
        )}

        {verificationStatus === "verified" && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 sm:mb-8 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg sm:h-12 sm:w-12 sm:text-xl">
                🟢
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-green-900 sm:text-lg">
                  Verified Employer
                </h2>
                <p className="mt-1 text-sm leading-6 text-green-800">
                  Your company has been verified by CareerLaunch. You can now
                  post internship opportunities.
                </p>
              </div>
            </div>
          </div>
        )}

        {verificationStatus === "rejected" && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 sm:mb-8 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-lg sm:h-12 sm:w-12 sm:text-xl">
                🔴
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-red-900 sm:text-lg">
                  Verification Unsuccessful
                </h2>
                <p className="mt-1 text-sm leading-6 text-red-800">
                  Your employer account has not been approved. Please contact
                  CareerLaunch for assistance.
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium leading-6 text-red-700 sm:px-5">
            {error}
            <button
              type="button"
              onClick={loadDashboard}
              className="ml-3 font-bold underline"
            >
              Try again
            </button>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                💼
              </div>
              <span className="text-right text-[10px] font-semibold uppercase tracking-wide text-blue-600 sm:text-xs">
                Opportunities
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Total Internships
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.total_internships}
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Internship opportunities posted
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                👥
              </div>
              <span className="text-right text-[10px] font-semibold uppercase tracking-wide text-indigo-600 sm:text-xs">
                Applications
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Total Applicants
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.total_applicants}
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Students who applied
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">
                ⏳
              </div>
              <span className="text-right text-[10px] font-semibold uppercase tracking-wide text-amber-600 sm:text-xs">
                Review
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.pending_applicants}
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Applications awaiting review
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
                ✓
              </div>
              <span className="text-right text-[10px] font-semibold uppercase tracking-wide text-green-600 sm:text-xs">
                Successful
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">Accepted</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.accepted_applicants}
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Students accepted
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mb-8 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Manage your company and applicants quickly.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handlePostInternship}
              disabled={verificationStatus !== "verified"}
              className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition sm:w-auto ${
                verificationStatus === "verified"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              }`}
            >
              + Post Internship
            </button>

            <button
              type="button"
              onClick={() => navigateTo("/employer/applicants")}
              className="w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 sm:w-auto"
            >
              👥 View Applicants
            </button>

            <button
              type="button"
              onClick={() => navigateTo("/employer/profile")}
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              🏢 Company Profile
            </button>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              My Internships
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Manage the internship opportunities you have posted.
            </p>
          </div>

          {internships.length > 0 && (
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              {internships.length} posted
            </span>
          )}
        </div>

        {internships.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-6 text-center shadow-sm sm:p-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              💼
            </div>
            <h3 className="text-lg font-bold leading-7 text-slate-900 sm:text-xl">
              You haven't posted any internships yet.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {verificationStatus === "verified"
                ? "Create your first internship opportunity and start receiving applications from students."
                : "Your company must be verified before you can post internship opportunities."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={handlePostInternship}
                disabled={verificationStatus !== "verified"}
                className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition sm:w-auto ${
                  verificationStatus === "verified"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                Post Your First Internship
              </button>
              <button
                type="button"
                onClick={() => navigateTo("/employer/profile")}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Company Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm sm:h-12 sm:w-12">
                        {internship.company
                          ? internship.company.charAt(0).toUpperCase()
                          : "C"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="break-words text-base font-bold text-slate-900 sm:text-lg">
                          {internship.title}
                        </h3>
                        <p className="mt-1 break-words text-sm font-medium text-blue-600">
                          {internship.company}
                        </p>
                      </div>
                    </div>

                    <span className="w-fit shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {internship.internship_type}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="min-w-0 rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        📍 {internship.location}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Category
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        🏷️ {internship.category}
                      </p>
                    </div>

                    <div className="rounded-xl bg-amber-50 p-4 sm:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                        Application Deadline
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        📅 {internship.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={() =>
                        navigateTo(
                          `/employer/internships/edit/${internship.id}`
                        )
                      }
                      className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigateTo(
                          `/employer/internships/${internship.id}/applicants`
                        )
                      }
                      className="w-full rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 sm:w-auto"
                    >
                      👥 View Applicants
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(internship.id)}
                      className="w-full rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployerDashboard;
