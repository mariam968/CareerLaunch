import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    full_name: "",
    phone: "",
    institution: "",
    course: "",
    year_of_study: "",
    location: "",
    skills: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const registrationData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      phone: formData.phone,
      institution: formData.institution,
      course: formData.course,
      year_of_study: formData.year_of_study,
      location: formData.location,
      skills: formData.skills,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/accounts/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const firstError = Object.values(data)[0];

        if (Array.isArray(firstError)) {
          throw new Error(firstError[0]);
        }

        throw new Error(
          typeof firstError === "string"
            ? firstError
            : data.detail || "Registration failed."
        );
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.username) {
        localStorage.setItem("username", data.username);
      }

      if (data.full_name) {
        localStorage.setItem("full_name", data.full_name);
      } else {
        localStorage.setItem("full_name", formData.full_name);
      }

      localStorage.setItem("userType", "student");

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="flex h-16 items-center border-b border-slate-200 bg-white px-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Career<span className="text-blue-600">Launch</span>
        </h1>
      </div>

      {/* Main */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">

          {/* Left Blue Panel */}
          <div className="hidden bg-blue-600 p-10 text-white md:flex md:flex-col md:justify-between">

            <div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🎓
              </div>

              <h2 className="text-3xl font-bold leading-tight">
                Start building your career today.
              </h2>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Create your student account, discover internship
                opportunities, build experience, and take the next
                step toward your career.
              </p>

            </div>

            <div className="rounded-2xl bg-blue-700 p-5">

              <p className="text-sm font-semibold">
                Join CareerLaunch
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-100">
                Discover opportunities, connect with employers,
                and grow your professional experience.
              </p>

            </div>

          </div>

          {/* Right Registration Form */}
          <div className="p-7 sm:p-10">

            {/* Title */}
            <div className="mb-8">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl md:hidden">
                🎓
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Create student account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Create your CareerLaunch account and start finding
                opportunities.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>

              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* Account Information */}
              <div>

                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Account Information
                </h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Username */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Username
                    </label>

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      placeholder="Choose a username"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                  {/* Email */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                  {/* Password */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                  {/* Confirm Password */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="password2"
                      value={formData.password2}
                      onChange={handleChange}
                      required
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

              </div>

              {/* Personal Information */}
              <div>

                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Full Name */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                  {/* Phone */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="0700000000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                  {/* Location */}
                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="Kampala"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

              </div>

              {/* Education */}
              <div>

                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Education
                </h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Institution */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Institution
                    </label>

                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      placeholder="Makerere University"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                  {/* Course */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Course
                    </label>

                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      placeholder="Computer Science"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                  {/* Year */}
                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Year of Study
                    </label>

                    <select
                      name="year_of_study"
                      value={formData.year_of_study}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">
                        Select your year
                      </option>

                      <option value="Year 1">
                        Year 1
                      </option>

                      <option value="Year 2">
                        Year 2
                      </option>

                      <option value="Year 3">
                        Year 3
                      </option>

                      <option value="Year 4">
                        Year 4
                      </option>

                      <option value="Year 5">
                        Year 5
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* Additional Information */}
              <div>

                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Additional Information
                </h2>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Skills
                  </label>

                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Python, React, Git, Communication..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Create Account */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create Student Account"}
              </button>

            </form>

            {/* Login / Employer Registration */}
            <div className="mt-8 border-t border-slate-200 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Already have a student account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Log in to your account →
              </button>

              <div className="my-5 flex items-center gap-3">

                <div className="h-px flex-1 bg-slate-200"></div>

                <span className="text-xs text-slate-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-200"></div>

              </div>

              <p className="text-sm text-slate-500">
                Are you an employer?
              </p>

              <button
                type="button"
                onClick={() => navigate("/employer/register")}
                className="mt-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an employer account →
              </button>

              <p className="mt-4 text-xs text-slate-400">
                CareerLaunch • Connecting students with opportunities
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;