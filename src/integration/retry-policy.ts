export async function exponentialBackoff<T>(fn: () => Promise<T>): Promise<T> {
  let attempt = 0;
  const maxAttempts = 5;
  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      const delay = Math.pow(2, attempt) * 100;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}
