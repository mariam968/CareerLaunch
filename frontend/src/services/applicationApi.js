const API_URL = "http://127.0.0.1:8000/api/applications/";

export async function getApplications() {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
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

export async function submitApplication(applicationData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  Object.entries(applicationData).forEach(([key, value]) => {
    if (key !== "student" && value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}create/`, {
    method: "POST",

    headers: {
      Authorization: `Token ${token}`,
    },

    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to submit application");
  }

  return data;
}
