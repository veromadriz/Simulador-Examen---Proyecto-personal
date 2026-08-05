const API_BASE = import.meta.env.VITE_API_BASE ?? '';

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || `HTTP ${response.status}`);
    error.response = response;
    error.data = data;
    throw error;
  }

  return data;
}

export { API_BASE, fetchJson };