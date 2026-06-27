"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callJavaApi = callJavaApi;
const axios_1 = __importDefault(require("axios"));
const retry_policy_1 = require("./retry-policy");
const javaApiBase = process.env.JAVA_API_URL || 'http://localhost:8080/api';
const client = axios_1.default.create({
    baseURL: javaApiBase,
    timeout: 5000,
});
async function callJavaApi(method, path, data) {
    return (0, retry_policy_1.exponentialBackoff)(async () => {
        const response = await client.request({ method, url: path, data });
        return response.data;
    });
}
