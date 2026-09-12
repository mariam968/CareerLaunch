import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployerInternships,
  updateEmployerInternship,
} from "../services/employerApi";

function EmployerEditInternship() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInternship();
  }, [id]);

  async function loadInternship() {
    try {
      setLoading(true);
      setError("");

      const internships = await getEmployerInternships();

      const internship = internships.find(
        (item) => item.id === Number(id)
      );

      if (!internship) {
        throw new Error("Internship not found.");
      }

      setFormData({
        title: internship.title || "",
        company: internship.company || "",
        location: internship.location || "",
        internship_type:
          internship.internship_type || "Full-time",
        category: internship.category || "",
        description: internship.description || "",
        requirements: internship.requirements || "",
        responsibilities:
          internship.responsibilities || "",
        deadline: internship.deadline || "",
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
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateEmployerInternship(id, formData);

      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="font-medium text-blue-600">
              Loading internship...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl">

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
        <div className="mb-6 overflow-hidden rounded-2xl bg-blue-600 shadow-lg">
          <div className="flex items-center gap-4 px-6 py-7 md:px-8">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              ✏️
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                Edit Internship
              </h1>

              <p className="mt-1 text-sm text-blue-100">
                Update the details of your internship opportunity.
              </p>
            </div>

          </div>

          <div className="bg-blue-700 px-6 py-3 md:px-8">
            <p className="text-xs font-medium text-blue-100">
              Make sure your internship information is clear and up to date.
            </p>
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Basic Information */}
          <div className="border-b border-slate-200 px-6 py-7 md:px-8">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                💼
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Basic Information
                </h2>

                <p className="text-xs text-slate-500">
                  Tell students about this opportunity.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Title */}
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Internship Title
                </label>

                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Software Development Intern"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company Name
                </label>

                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Kampala, Uganda"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Type */}
              <div>
                <label
                  htmlFor="internship_type"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Internship Type
                </label>

                <select
                  id="internship_type"
                  name="internship_type"
                  value={formData.internship_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Full-time">
                    Full-time
                  </option>

                  <option value="Part-time">
                    Part-time
                  </option>

                  <option value="Hybrid">
                    Hybrid
                  </option>

                  <option value="Remote">
                    Remote
                  </option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category
                </label>

                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Technology"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="border-b border-slate-200 bg-blue-50/40 px-6 py-7 md:px-8">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                📝
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Internship Details
                </h2>

                <p className="text-xs text-slate-500">
                  Describe the opportunity for students.
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the internship opportunity..."
                required
                className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Requirements */}
            <div className="mb-5">
              <label
                htmlFor="requirements"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Requirements
              </label>

              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="6"
                placeholder="List the skills, qualifications, or experience required..."
                required
                className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Responsibilities */}
            <div>
              <label
                htmlFor="responsibilities"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Responsibilities
              </label>

              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows="6"
                placeholder="Describe what the intern will be responsible for..."
                required
                className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Deadline */}
          <div className="px-6 py-7 md:px-8">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-lg">
                📅
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Application Deadline
                </h2>

                <p className="text-xs text-slate-500">
                  Set the final date students can apply.
                </p>
              </div>
            </div>

            <div className="max-w-md">
              <label
                htmlFor="deadline"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Application Deadline
              </label>

              <input
                id="deadline"
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end md:px-8">

            <button
              type="button"
              onClick={() =>
                navigate("/employer/dashboard")
              }
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EmployerEditInternship;