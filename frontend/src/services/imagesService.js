const baseUrl = 'http://localhost:5000/api/images';

export const uploadImage = async (endpoint, id, imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  if (res.ok) return await res.json();
  throw new Error('Image upload failed');
};

export const deleteImage = async (endpoint, id) => {
  console.log(endpoint);
  console.log(id);
  const res = await fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (res.ok) return await res.json();
  throw new Error('Image delete failed');
};
