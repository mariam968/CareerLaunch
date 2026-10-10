import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function EmployerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_name: "",
    phone: "",
    location: "",
    industry: "",
    description: "",
    website: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/employers/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const messages = Object.values(data)
          .flat()
          .join(" ");

        throw new Error(
          messages || "Registration failed."
        );
      }

      const loginResponse = await fetch(
        `${API_URL}/api/employers/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.detail ||
            "Account created, but automatic login failed."
        );
      }

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("userType", "employer");

      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* Header */}
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 sm:px-6">
        <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          Career<span className="text-blue-600">Launch</span>
        </h1>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-4rem)] justify-center px-4 py-6 sm:px-5 sm:py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:rounded-3xl md:grid-cols-2">

          {/* Left */}
          <div className="hidden bg-blue-600 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🏢
              </div>

              <h2 className="text-3xl font-bold leading-tight">
                Find the next generation of talent.
              </h2>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Create your employer account, post internship
                opportunities, and connect with talented students.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-blue-700 p-5">
              <p className="text-sm font-semibold">
                Join CareerLaunch
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-100">
                Build your talent pipeline and discover students ready
                to grow with your company.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-8 md:p-10">
            <div className="mb-7 sm:mb-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl md:hidden">
                🏢
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create employer account
              </h1>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Register your company on CareerLaunch.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="break-words text-sm font-medium leading-5 text-red-700">
                  {error}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Company */}
              <div>
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  autoComplete="username"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="company@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength={8}
                  required
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Minimum 8 characters.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0700000001"
                  required
                  autoComplete="tel"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                  placeholder="Kampala"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                  placeholder="Technology"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
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
                  placeholder="Tell students about your company"
                  rows={4}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Website
                </label>

                <input
                  id="website"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create Account"}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 border-t border-slate-200 pt-6 text-center sm:mt-8">
              <p className="text-sm text-slate-500">
                Already have an employer account?
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/employer/login")
                }
                className="mt-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Log in to your account
              </button>

              <p className="mt-4 text-xs text-slate-400">
                CareerLaunch Employer Portal
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployerRegister;