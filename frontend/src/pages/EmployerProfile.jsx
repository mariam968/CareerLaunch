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

      setSuccess("Company profile updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-6 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="text-sm font-medium text-blue-600">
            Loading company profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/employer/dashboard")}
          className="mb-5 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <span className="text-lg">←</span>
          Back to Dashboard
        </button>

        {/* Blue Header */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-blue-600 shadow-lg">
          <div className="px-5 py-6 sm:px-6 sm:py-8 md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm sm:h-16 sm:w-16 sm:text-3xl">
                🏢
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Company Profile
                </h1>

                <p className="mt-1 text-sm leading-6 text-blue-100">
                  Manage your company's presence on CareerLaunch.
                </p>
              </div>

            </div>
          </div>

          <div className="bg-blue-700 px-5 py-3 sm:px-6 md:px-8">
            <p className="text-xs leading-5 font-medium text-blue-100">
              Keep your company information accurate and up to date.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:px-5">
            <span className="shrink-0 text-lg">⚠️</span>

            <p className="min-w-0 break-words text-sm font-medium leading-6 text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4 sm:px-5">
            <span className="shrink-0 text-lg">✓</span>

            <p className="min-w-0 break-words text-sm font-medium leading-6 text-green-700">
              {success}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Company Information */}
          <div className="border-b border-slate-200 px-4 py-6 sm:px-6 sm:py-7 md:px-8">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg">
                🏢
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-slate-900">
                  Company Information
                </h2>

                <p className="text-xs leading-5 text-slate-500">
                  Basic information about your company
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Company Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="company_name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company Name
                </label>

                <input
                  id="company_name"
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="company@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 0700123456"
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Industry
                </label>

                <input
                  id="industry"
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Technology"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>
          </div>

          {/* About Company */}
          <div className="border-b border-slate-200 bg-blue-50/40 px-4 py-6 sm:px-6 sm:py-7 md:px-8">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg">
                💼
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-slate-900">
                  About Your Company
                </h2>

                <p className="text-xs leading-5 text-slate-500">
                  Tell students what your company does
                </p>
              </div>
            </div>

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Company Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell students about your company..."
              rows="6"
              className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Website */}
          <div className="px-4 py-6 sm:px-6 sm:py-7 md:px-8">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                🌐
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-slate-900">
                  Online Presence
                </h2>

                <p className="text-xs leading-5 text-slate-500">
                  Help students learn more about your company
                </p>
              </div>
            </div>

            <label
              htmlFor="website"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Company Website
            </label>

            <input
              id="website"
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Save */}
          <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700">
                Ready to save your changes?
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Your updated profile will appear on CareerLaunch.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {saving ? "Saving..." : "Save Company Profile"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployerProfile;