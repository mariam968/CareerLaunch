import { API_URL } from "./api";

const EMPLOYER_INTERNSHIP_URL = `${API_URL}/api/applications/employer/internship/`;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Token ${token}`,
  };
}

export async function getInternshipApplicants(internshipId) {
  const response = await fetch(`${EMPLOYER_INTERNSHIP_URL}${internshipId}/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch applicants");
  }

  return data;
}
