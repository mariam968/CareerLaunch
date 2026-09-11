const API_URL = "http://127.0.0.1:8000/api/applications/employer/";

export async function getEmployerApplications() {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch applications");
  }

  return data;
}

export async function updateApplicationStatus(applicationId, status) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://127.0.0.1:8000/api/applications/employer/${applicationId}/status/`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update application status");
  }

  return data;
}
