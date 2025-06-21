// Osmosis API Utilities
import axios, { AxiosRequestConfig } from 'axios';
import { OSMOSIS_RPC_ENDPOINT, OSMOSIS_REST_ENDPOINT } from '../config/network.js';
import { API_CONFIG } from '../config/constants.js';

// Configure axios with default settings
const apiClient = axios.create({
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || config.retry >= API_CONFIG.retries) {
      return Promise.reject(error);
    }
    
    config.retry = (config.retry || 0) + 1;
    await new Promise(resolve => setTimeout(resolve, 1000 * config.retry));
    return apiClient.request(config);
  }
);

/**
 * Call Osmosis REST API endpoints
 */
export async function callOsmosisApi(path: string, params: Record<string, any> = {}): Promise<any> {
  try {
    const url = `${OSMOSIS_REST_ENDPOINT}${path}`;
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error: any) {
    console.error(`Error calling Osmosis API ${path}:`, error.message);
    throw new Error(`API call failed: ${error.message}`);
  }
}

/**
 * Call Osmosis RPC endpoints
 */
export async function callOsmosisRpc(method: string, params: any[] = []): Promise<any> {
  try {
    const response = await apiClient.post(OSMOSIS_RPC_ENDPOINT, {
      jsonrpc: "2.0",
      id: 1,
      method,
      params
    });
    
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    
    return response.data.result;
  } catch (error: any) {
    console.error(`Error calling Osmosis RPC ${method}:`, error.message);
    throw new Error(`RPC call failed: ${error.message}`);
  }
}

/**
 * Replace path parameters in API endpoints
 */
export function replacePathParams(template: string, params: Record<string, string>): string {
  let path = template;
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`{${key}}`, encodeURIComponent(value));
  }
  return path;
}

/**
 * Validate required parameters
 */
export function validateRequiredParams(params: any, required: string[]): void {
  for (const param of required) {
    if (!params[param]) {
      throw new Error(`Missing required parameter: ${param}`);
    }
  }
}