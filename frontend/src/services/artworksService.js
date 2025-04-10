const baseUrl = 'http://localhost:5000/api/artworks';

export const checkOwnership = async (id) => {
  const res = await fetch(`${baseUrl}/checkOwnership/${id}`, {
    credentials: 'include'
  });

  if (res.ok) return "Authorization success";
  throw new Error('Authorization failed');
};

export const createArtwork = async (data) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  if (res.ok) return await res.json();
  throw new Error('Upload artwork failed');
};

export const deleteArtwork = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (res.ok) return "Artwork deleted successfully";
  throw new Error('Delete artwork failed');
};

export const getArtwork = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, { credentials: 'include' });

  if (res.ok) return await res.json();
  throw new Error('Fetch artwork failed');
};

export const toggleLikeArtwork = async (id) => {
  const res = await fetch(`${baseUrl}/toggle-like/${id}`, {
    method: 'POST',
    credentials: 'include'
  });

  if (res.ok) return await res.json();
  throw new Error('Like/unlike artwork failed');
};

export const updateArtwork = async (id, data) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  if (res.ok) return await res.json();
  throw new Error('Update artwork failed');
};
