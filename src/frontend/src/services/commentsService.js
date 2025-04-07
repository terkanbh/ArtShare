const baseUrl = 'http://localhost:5000/api/comments';

export const createComment = async (newComment) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
        credentials: 'include'
    });
    if (res.ok) return await res.json();
    throw new Error("Failed to post comment");
}
