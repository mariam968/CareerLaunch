import { API_URL } from "./api";

const EMPLOYER_STATS_URL = `${API_URL}/api/applications/employer/stats/`;

export async function getEmployerDashboardStats() {
  const token = localStorage.getItem("token");

  const response = await fetch(EMPLOYER_STATS_URL, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch dashboard statistics");
  }

  return data;
}