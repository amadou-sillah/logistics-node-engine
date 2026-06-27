"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exponentialBackoff = exponentialBackoff;
async function exponentialBackoff(fn) {
    let attempt = 0;
    const maxAttempts = 5;
    while (attempt < maxAttempts) {
        try {
            return await fn();
        }
        catch (error) {
            attempt++;
            const delay = Math.pow(2, attempt) * 100;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Max retries exceeded');
}
