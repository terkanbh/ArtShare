const baseUrl = 'http://localhost:5000/api/artworks';

export const getArtwork = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, { credentials: 'include'});
  if (res.ok) return await res.json();
  throw new Error('There was a problem fetching artwork');
}

export const toggleLikeArtwork = async (id) => {
    const res = await fetch(`${baseUrl}/toggle-like/${id}`, {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) return await res.json();
    throw new Error('There was a problem while trying to like/unlike artwork');
}