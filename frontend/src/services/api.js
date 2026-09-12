export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const getMediaUrl = (url) => {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_URL}${url}`;
};
