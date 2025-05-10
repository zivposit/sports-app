export const API_BASE_URL = "http://localhost:3000";

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();

    if ("data" in res) {
      return res.data as T;
    }

    return res as T;
  } catch (error) {
    console.error("Fetch API error:", error);
    throw error;
  }
}
