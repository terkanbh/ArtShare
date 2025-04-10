const baseUrl = 'http://localhost:5000/api/users';

export const getUsers = async () => {
  const res = await fetch(baseUrl, {
    method: 'GET',
    credentials: 'include'
  });
  if (res.ok) return await res.json();
  throw new Error('Fetch users failed');
};

export const deleteUser = async (id) => {
  const res = await fetch(baseUrl + `/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (res.ok) return 'Delete user successfull';
  throw new Error('Delete user failed')
}

export const getUserWithArtworks = async (id) => {
  const res = await fetch(`${baseUrl}/${id}/artworks`, {
    method: 'GET',
    credentials: 'include'
  });
  if (res.ok) return await res.json();
  throw new Error('Fetch user failed');
};

export const updateUser = async (id, formData) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
  if (res.ok) return await res.json();
  throw Error('Update user failed')
}
