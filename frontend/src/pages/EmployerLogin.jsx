import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function EmployerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/employers/login/`,
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
        throw new Error(
          data.detail || "Invalid username or password."
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "employer");

      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

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

          {/* Left side */}
          <div className="hidden bg-blue-600 p-10 text-white md:flex md:flex-col md:justify-between">

            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🏢
              </div>

              <h2 className="text-3xl font-bold leading-tight">
                Connect with the next generation of talent.
              </h2>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Manage your internship opportunities, discover talented
                students, and build your future workforce with CareerLaunch.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-blue-700 p-5">
              <p className="text-sm font-semibold">
                Employer Portal
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-100">
                Manage your company, internships, and student applications
                from one place.
              </p>
            </div>

          </div>

          {/* Right side */}
          <div className="p-7 sm:p-10">

            <div className="mb-8">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl md:hidden">
                🏢
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Employer Login
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Log in to manage your CareerLaunch employer account.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <span>⚠️</span>

                <p className="whitespace-pre-line text-sm font-medium text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">

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
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

            </form>

            {/* Register link */}
            <div className="mt-8 border-t border-slate-200 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Don't have an employer account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/employer/register")}
                className="mt-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an employer account
              </button>

              <p className="mt-4 text-xs text-slate-400">
                CareerLaunch Employer Portal
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerLogin;