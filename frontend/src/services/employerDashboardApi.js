const API_URL = "http://127.0.0.1:8000/api/applications/employer/stats/";

export async function getEmployerDashboardStats() {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
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
