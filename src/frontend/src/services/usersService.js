const baseUrl = 'http://localhost:5000/api/users';

export const getUserWithArtworks = async (id) => {
    const res = await fetch(`${baseUrl}/${id}/artworks`, {
        method: 'GET',
        credentials: 'include'
    });
    if (res.ok) return await res.json();
    throw new Error('There was a problem getting user details');
};