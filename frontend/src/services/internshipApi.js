const API_URL = "http://127.0.0.1:8000/api/internships/";

export async function getInternships() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch internships");
  }

  return response.json();
}

export async function getInternship(id) {
  const response = await fetch(`${API_URL}${id}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch internship");
  }

  return response.json();
}
