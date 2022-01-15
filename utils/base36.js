export function hexToBase36(message) {
    const num = parseInt(message, 16);
    return num.toString(36).toUpperCase();
}

export function base36ToHex(message) {
    const num = parseInt(message, 36);
    return num.toString(16);
}