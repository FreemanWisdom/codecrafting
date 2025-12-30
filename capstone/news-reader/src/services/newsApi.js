// newsApi.js
const BASE_URL = "https://api.thenewsapi.com/v1/news";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Fetch latest headlines from TheNewsAPI
export const fetchHeadlines = async (search = "", page = 1, categories = "") => {
  if (!API_KEY) {
    throw new Error("API key is missing. Make sure .env is configured correctly.");
  }

  const url = new URL(`${BASE_URL}/all`);

  // Required query parameters
  url.searchParams.append("api_token", API_KEY);
  url.searchParams.append("language", "en");
  url.searchParams.append("limit", "9");
  url.searchParams.append("page", page.toString());

  // Optional search
  if (search) {
    url.searchParams.append("search", search);
  }

  // Optional categories
  if (categories) {
    url.searchParams.append("categories", categories.toLowerCase());
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      throw new Error(data.message || "Failed to fetch news");
    }

    // Defensive return: Ensure we always return an object with a data array
    return {
      data: Array.isArray(data.data) ? data.data : []
    };
  } catch (error) {
    console.error("Fetch error:", error);
    // Return empty state on error to prevent app crash
    return { data: [] };
  }
};
