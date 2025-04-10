export function validateImage(image) {
    return !image || (image.type === 'image/webp' && image.size <= 40 * 1024);
}