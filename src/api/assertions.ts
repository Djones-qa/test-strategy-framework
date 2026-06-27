import { AxiosResponse } from "axios";

/**
 * Custom API Assertions
 * Provides expressive assertions for API response validation.
 */

export function assertStatus(response: AxiosResponse, expectedStatus: number): void {
  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, received ${response.status}. ` +
        `Response: ${JSON.stringify(response.data)}`
    );
  }
}

export function assertStatusOk(response: AxiosResponse): void {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `Expected success status (2xx), received ${response.status}. ` +
        `Response: ${JSON.stringify(response.data)}`
    );
  }
}

export function assertStatusCreated(response: AxiosResponse): void {
  assertStatus(response, 201);
}

export function assertStatusNotFound(response: AxiosResponse): void {
  assertStatus(response, 404);
}

export function assertStatusUnauthorized(response: AxiosResponse): void {
  assertStatus(response, 401);
}

export function assertStatusForbidden(response: AxiosResponse): void {
  assertStatus(response, 403);
}

export function assertStatusBadRequest(response: AxiosResponse): void {
  assertStatus(response, 400);
}

export function assertResponseTime(response: AxiosResponse, maxMs: number): void {
  const responseTime = response.headers["x-response-time"];
  if (responseTime) {
    const time = parseInt(responseTime, 10);
    if (time > maxMs) {
      throw new Error(`Response time ${time}ms exceeded maximum of ${maxMs}ms`);
    }
  }
}

export function assertHasHeader(response: AxiosResponse, header: string): void {
  const normalizedHeader = header.toLowerCase();
  if (!response.headers[normalizedHeader]) {
    throw new Error(`Expected header "${header}" not found in response`);
  }
}

export function assertHeaderEquals(
  response: AxiosResponse,
  header: string,
  expectedValue: string
): void {
  const normalizedHeader = header.toLowerCase();
  const actualValue = response.headers[normalizedHeader];
  if (actualValue !== expectedValue) {
    throw new Error(
      `Expected header "${header}" to be "${expectedValue}", got "${actualValue}"`
    );
  }
}

export function assertBodyContains<T extends Record<string, unknown>>(
  response: AxiosResponse<T>,
  key: string
): void {
  if (!(key in response.data)) {
    throw new Error(
      `Expected response body to contain key "${key}". ` +
        `Keys found: ${Object.keys(response.data).join(", ")}`
    );
  }
}

export function assertBodyEquals<T>(response: AxiosResponse<T>, expected: T): void {
  const actual = JSON.stringify(response.data);
  const exp = JSON.stringify(expected);
  if (actual !== exp) {
    throw new Error(`Response body mismatch.\nExpected: ${exp}\nActual: ${actual}`);
  }
}

export function assertArrayLength(response: AxiosResponse<unknown[]>, expectedLength: number): void {
  if (!Array.isArray(response.data)) {
    throw new Error("Expected response data to be an array");
  }
  if (response.data.length !== expectedLength) {
    throw new Error(
      `Expected array length ${expectedLength}, got ${response.data.length}`
    );
  }
}

export function assertJsonContentType(response: AxiosResponse): void {
  const contentType = response.headers["content-type"] || "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      `Expected JSON content type, got "${contentType}"`
    );
  }
}
