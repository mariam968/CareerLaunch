import { useEffect, useState } from "react";
import { API_URL } from "../services/api";

function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [firstName, setFirstName] = useState("");
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const fullName = localStorage.getItem("full_name");

    if (fullName) {
      const name = fullName.trim().split(" ")[0];
      setFirstName(name);
    }

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const profileResponse = await fetch(
        `${API_URL}/api/accounts/profile/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (profileResponse.ok) {
        const profile = await profileResponse.json();

        const fields = [
          profile.full_name,
          profile.email,
          profile.phone,
          profile.institution,
          profile.course,
          profile.year_of_study,
          profile.location,
          profile.skills,
          profile.cv,
        ];

        const completedFields = fields.filter((field) => {
          return (
            field !== null &&
            field !== undefined &&
            String(field).trim() !== ""
          );
        }).length;

        const percentage = Math.round(
          (completedFields / fields.length) * 100
        );

        setProfileCompletion(percentage);
      }
    } catch (error) {
      console.error("Profile error:", error);
    }

    try {
      const applicationsResponse = await fetch(
        `${API_URL}/api/applications/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (applicationsResponse.ok) {
        const applications = await applicationsResponse.json();

        setApplicationCount(applications.length);
      }
    } catch (error) {
      console.error("Applications error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {greeting},{" "}
          {firstName || "Student"}{" "}
          {greeting === "Good morning"
            ? "☀️"
            : greeting === "Good afternoon"
            ? "🌤️"
            : "🌙"}
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back to CareerLaunch. Let's work towards your next
          opportunity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">
            Applications
          </h2>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {applicationCount}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Applications submitted
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">
            Profile
          </h2>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {profileCompletion}%
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Profile completion
          </p>

          <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${profileCompletion}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Recommended for you
        </h2>

        <p className="mt-2 text-slate-500">
          Find internship opportunities that match your skills and
          interests.
        </p>

        <button
          onClick={() => {
            window.location.href = "/internships";
          }}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Browse Internships
        </button>
      </div>
    </div>
  );
}

export default Dashboard;