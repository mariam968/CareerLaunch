import { API_URL } from "./api";

const EMPLOYER_URL = `${API_URL}/api/internships/employer/`;
const EMPLOYER_PROFILE_URL = `${API_URL}/api/employers/profile/`;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in to your employer account.");
  }

  return {
    Authorization: `Token ${token}`,
  };
}

export async function getEmployerInternships() {
  const response = await fetch(EMPLOYER_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch internships");
  }

  return data;
}

export async function createEmployerInternship(internshipData) {
  const response = await fetch(`${EMPLOYER_URL}create/`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(internshipData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Failed to create internship");
  }

  return data;
}

export async function updateEmployerInternship(id, internshipData) {
  const response = await fetch(`${EMPLOYER_URL}${id}/`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(internshipData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update internship");
  }

  return data;
}

export async function deleteEmployerInternship(id) {
  const response = await fetch(`${EMPLOYER_URL}${id}/delete/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to delete internship");
  }

  return true;
}

export async function getEmployerProfile() {
  const response = await fetch(EMPLOYER_PROFILE_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch employer profile");
  }

  return data;
}
