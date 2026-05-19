const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    },
    ...options
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Erro ao comunicar com a API.");
  }

  return data as T;
}
