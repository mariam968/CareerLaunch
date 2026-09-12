import { API_URL } from "./api";

const INTERNSHIPS_URL = `${API_URL}/api/internships/`;

export async function getInternships() {
  const response = await fetch(INTERNSHIPS_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch internships");
  }

  return data;
}

export async function getInternship(id) {
  const response = await fetch(`${INTERNSHIPS_URL}${id}/`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch internship");
  }

  return data;
}
