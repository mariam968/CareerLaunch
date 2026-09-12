import { API_URL } from "./api";

const PROFILE_URL = `${API_URL}/api/accounts/profile/`;

export async function getProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(PROFILE_URL, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch profile");
  }

  return data;
}

export async function updateProfile(profileData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await fetch(PROFILE_URL, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update profile");
  }

  return data;
}
