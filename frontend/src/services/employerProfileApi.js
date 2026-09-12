import { API_URL } from "./api";

const EMPLOYER_PROFILE_URL =
  `${API_URL}/api/employers/profile/`;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Token ${token}`,
  };
}

export async function getEmployerProfile() {
  const response = await fetch(EMPLOYER_PROFILE_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to fetch employer profile"
    );
  }

  return data;
}

export async function updateEmployerProfile(profileData) {
  const response = await fetch(EMPLOYER_PROFILE_URL, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to update employer profile"
    );
  }

  return data;
}