const API_URL =
  "http://127.0.0.1:8000/api/applications/employer/internship/";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Token ${token}`,
  };
}

export async function getInternshipApplicants(
  internshipId
) {
  const response = await fetch(
    `${API_URL}${internshipId}/`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to fetch applicants"
    );
  }

  return data;
}