const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function get(path) {
  const response = await fetch(`${BASE_URL}/${path}`);
  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }
  return response.json();
}
