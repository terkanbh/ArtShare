export function validateDescription(description) {
    return description.length > 0 && description.length <= 500;
}