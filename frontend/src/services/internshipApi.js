const API_URL = "http://127.0.0.1:8000/api/internships/";

export async function getInternships() {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch internships");
  }

  return data;
}

export async function getInternship(id) {
  const response = await fetch(`${API_URL}${id}/`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch internship");
  }

  return data;
}
