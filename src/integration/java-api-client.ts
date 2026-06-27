import axios, { AxiosInstance } from 'axios';
import { exponentialBackoff } from './retry-policy';

const javaApiBase = process.env.JAVA_API_URL || 'http://localhost:8080/api';

const client: AxiosInstance = axios.create({
  baseURL: javaApiBase,
  timeout: 5000,
});

export async function callJavaApi(method: string, path: string, data?: any) {
  return exponentialBackoff(async () => {
    const response = await client.request({ method, url: path, data });
    return response.data;
  });
}
