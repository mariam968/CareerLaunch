const API_URL = "http://127.0.0.1:8000/api/applications/";

export async function getApplications() {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch applications");
  }

  return data;
}

export async function submitApplication(applicationData) {
  const formData = new FormData();

  Object.entries(applicationData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}create/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to submit application");
  }

  return data;
}
