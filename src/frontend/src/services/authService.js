const baseUrl = 'http://localhost:5000/api/auth';

export const getCurrentUser = async () => {
  const res = await fetch(`${baseUrl}/me`, {
    credentials: 'include'
  });
  if (res.ok) return await res.json();
  throw new Error("Not authenticated");
};

export const login = async (credentials) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  if (res.ok) return await res.json();
  throw new Error("Login failed");
};

export const logout = async () => {
  await fetch(`${baseUrl}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
};
