import dotenv from "dotenv";

dotenv.config();

export interface TestConfig {
  baseUrl: string;
  apiBaseUrl: string;
  auth: {
    username: string;
    password: string;
    token?: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  performance: {
    targetUrl: string;
    vus: number;
    duration: string;
  };
  ci: boolean;
  headless: boolean;
}

export const config: TestConfig = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
  auth: {
    username: process.env.AUTH_USERNAME || "testuser",
    password: process.env.AUTH_PASSWORD || "testpass",
    token: process.env.AUTH_TOKEN || undefined,
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    name: process.env.DB_NAME || "testdb",
    user: process.env.DB_USER || "testuser",
    password: process.env.DB_PASSWORD || "testpass",
  },
  performance: {
    targetUrl: process.env.PERF_TARGET_URL || "http://localhost:3000",
    vus: parseInt(process.env.PERF_VUS || "10", 10),
    duration: process.env.PERF_DURATION || "30s",
  },
  ci: process.env.CI === "true",
  headless: process.env.HEADLESS !== "false",
};

export function getEnvironment(): string {
  return process.env.NODE_ENV || "test";
}

export function isCI(): boolean {
  return config.ci;
}
