const baseUrl = 'http://localhost:5000/api/images';

export const uploadImage = async (artworkId, imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await fetch(`${baseUrl}/${artworkId}`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  if (res.ok) return await res.json();
  throw new Error('Image upload failed');
};

export const deleteImage = async (artworkId) => {
  const res = await fetch(`${baseUrl}/${artworkId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (res.ok) return await res.json();
  throw new Error('Image delete failed');
};
