const baseUrl = 'http://localhost:5000/api/artworks';

export const createArtwork = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('description', data.description);
    const res = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (res.ok) return await res.json();
    throw new Error('Upload artwork failed');
}

export const getArtwork = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, { credentials: 'include'});
  if (res.ok) return await res.json();
  throw new Error('Fetch artwork failed');
}

export const toggleLikeArtwork = async (id) => {
    const res = await fetch(`${baseUrl}/toggle-like/${id}`, {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) return await res.json();
    throw new Error('Like/unlike artwork failed');
}

export const checkOwnership = async (id) => {
    const res = await fetch(`${baseUrl}/checkOwnership/${id}`, {
      credentials: 'include'
    });
    if (res.ok) return "Authorization success";
    throw new Error('Authorazation failed');
}