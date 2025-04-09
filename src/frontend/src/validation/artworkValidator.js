export function validateImage(image) {
    return !image || (image.type === 'image/webp' && image.size <= 40 * 1024);
}

export function validateDescription(description) {
    return description.length > 0 && description.length <= 500;
}