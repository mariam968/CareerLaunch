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
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 md:px-8 md:py-8">

      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {greeting},{" "}
          {firstName || "Student"}{" "}
          {greeting === "Good morning"
            ? "☀️"
            : greeting === "Good afternoon"
            ? "🌤️"
            : "🌙"}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Welcome back to CareerLaunch. Let's work towards your next
          opportunity.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">

        {/* Applications Card */}
        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-medium text-slate-500">
            Applications
          </h2>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {applicationCount}
          </p>

          <p className="mt-1 break-words text-sm text-slate-500">
            Applications submitted
          </p>
        </div>

        {/* Profile Card */}
        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-medium text-slate-500">
            Profile
          </h2>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {profileCompletion}%
          </p>

          <p className="mt-1 break-words text-sm text-slate-500">
            Profile completion
          </p>

          {/* Progress Bar */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${profileCompletion}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-6 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-6">

        <h2 className="break-words text-lg font-bold text-slate-900 sm:text-xl">
          Recommended for you
        </h2>

        <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-500 sm:text-base">
          Find internship opportunities that match your skills and
          interests.
        </p>

        <button
          onClick={() => {
            window.location.href = "/internships";
          }}
          className="mt-5 flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Browse Internships
        </button>
      </div>

    </div>
  );
}

export default Dashboard;