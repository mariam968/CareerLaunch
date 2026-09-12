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
        current.filter((internship) => internship.id !== id)
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-sm font-medium text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 rounded-2xl bg-blue-600 p-7 text-white shadow-lg">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
                  🏢
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-100">
                    Employer Portal
                  </p>

                  <h1 className="text-2xl font-bold md:text-3xl">
                    Employer Dashboard
                  </h1>
                </div>
              </div>

              <p className="max-w-2xl text-sm text-blue-100 md:text-base">
                Manage your internship opportunities, applications,
                and applicants from one place.
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href =
                  "/employer/internships/create";
              }}
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-md transition hover:bg-blue-50"
            >
              + Post Internship
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Internships */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                💼
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Opportunities
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Total Internships
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.total_internships}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Internship opportunities posted
            </p>
          </div>

          {/* Applicants */}
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                👥
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                Applications
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Total Applicants
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.total_applicants}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Students who applied
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
                ⏳
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                Review
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.pending_applicants}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Applications awaiting review
            </p>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                ✓
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-green-600">
                Successful
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Accepted
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stats.accepted_applicants}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Students accepted
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your company and applicants quickly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                window.location.href =
                  "/employer/internships/create";
              }}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Post Internship
            </button>

            <button
              onClick={() => {
                window.location.href =
                  "/employer/applicants";
              }}
              className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              👥 View Applicants
            </button>

            <button
              onClick={() => {
                window.location.href =
                  "/employer/profile";
              }}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              🏢 Company Profile
            </button>
          </div>
        </div>

        {/* Internships Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              My Internships
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage the internship opportunities you have posted.
            </p>
          </div>

          {internships.length > 0 && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              {internships.length} posted
            </span>
          )}
        </div>

        {/* Empty State */}
        {internships.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              💼
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              You haven't posted any internships yet.
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Create your first internship opportunity and
              start receiving applications from students.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  window.location.href =
                    "/employer/internships/create";
                }}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Post Your First Internship
              </button>

              <button
                onClick={() => {
                  window.location.href =
                    "/employer/profile";
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Company Profile
              </button>
            </div>
          </div>
        ) : (
          /* Internship Cards */
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                        {internship.company
                          ? internship.company.charAt(0).toUpperCase()
                          : "C"}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {internship.title}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-blue-600">
                          {internship.company}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {internship.internship_type}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        📍 {internship.location}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
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

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                    <button
                      onClick={() =>
                        (window.location.href =
                          `/employer/internships/edit/${internship.id}`)
                      }
                      className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        (window.location.href =
                          `/employer/internships/${internship.id}/applicants`)
                      }
                      className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      👥 View Applicants
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(internship.id)
                      }
                      className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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