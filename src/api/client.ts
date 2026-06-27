import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "../utils/config";

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  auth?: {
    username: string;
    password: string;
  };
}

export interface ApiClientConfig {
  baseURL?: string;
  token?: string;
  timeout?: number;
}

/**
 * HTTP Client Wrapper
 * Provides a consistent API for making HTTP requests in tests.
 */
export class ApiClient {
  private client: AxiosInstance;

  constructor(clientConfig: ApiClientConfig = {}) {
    this.client = axios.create({
      baseURL: clientConfig.baseURL || config.apiBaseUrl,
      timeout: clientConfig.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...(clientConfig.token && { Authorization: `Bearer ${clientConfig.token}` }),
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (reqConfig) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${reqConfig.method?.toUpperCase()} ${reqConfig.url}`);
        return reqConfig;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          console.error(
            `API Error: ${error.response.status} ${error.response.statusText}`,
            error.response.data
          );
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T = unknown>(url: string, options: RequestOptions = {}): Promise<AxiosResponse<T>> {
    const reqConfig: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
      auth: options.auth,
    };
    return this.client.get<T>(url, reqConfig);
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<AxiosResponse<T>> {
    const reqConfig: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
      auth: options.auth,
    };
    return this.client.post<T>(url, data, reqConfig);
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<AxiosResponse<T>> {
    const reqConfig: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
      auth: options.auth,
    };
    return this.client.put<T>(url, data, reqConfig);
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    options: RequestOptions = {}
  ): Promise<AxiosResponse<T>> {
    const reqConfig: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
      auth: options.auth,
    };
    return this.client.patch<T>(url, data, reqConfig);
  }

  async delete<T = unknown>(url: string, options: RequestOptions = {}): Promise<AxiosResponse<T>> {
    const reqConfig: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
      auth: options.auth,
    };
    return this.client.delete<T>(url, reqConfig);
  }

  setToken(token: string): void {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  clearToken(): void {
    delete this.client.defaults.headers.common["Authorization"];
  }
}

/** Default API client instance */
export const apiClient = new ApiClient();
