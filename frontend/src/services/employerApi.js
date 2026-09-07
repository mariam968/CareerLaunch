const API_URL = "http://127.0.0.1:8000/api/internships/employer/";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getEmployerInternships() {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch internships");
  }

  return data;
}

export async function createEmployerInternship(internshipData) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/internships/employer/create/",
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(internshipData),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to create internship");
  }

  return data;
}

export async function updateEmployerInternship(id, internshipData) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(internshipData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update internship");
  }

  return data;
}

export async function deleteEmployerInternship(id) {
  const response = await fetch(`${API_URL}${id}/delete/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to delete internship");
  }

  return true;
}
