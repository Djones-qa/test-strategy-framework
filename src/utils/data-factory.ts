/**
 * Test Data Factory
 * Generates consistent test data for use across all test types.
 */

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "viewer";
}

export interface ApiResponse<T = unknown> {
  status: number;
  data: T;
  message?: string;
  timestamp: string;
}

let counter = 0;

function nextId(): string {
  counter++;
  return `test-${Date.now()}-${counter}`;
}

/**
 * Generate a test user with optional overrides.
 */
export function createUser(overrides: Partial<User> = {}): User {
  const id = nextId();
  return {
    id,
    username: `user_${id}`,
    email: `user_${id}@test.example.com`,
    firstName: "Test",
    lastName: "User",
    role: "user",
    ...overrides,
  };
}

/**
 * Generate an admin user.
 */
export function createAdmin(overrides: Partial<User> = {}): User {
  return createUser({
    role: "admin",
    firstName: "Admin",
    ...overrides,
  });
}

/**
 * Generate a batch of test users.
 */
export function createUsers(count: number, overrides: Partial<User> = {}): User[] {
  return Array.from({ length: count }, () => createUser(overrides));
}

/**
 * Generate a mock API response.
 */
export function createApiResponse<T>(data: T, status = 200, message?: string): ApiResponse<T> {
  return {
    status,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Generate random string of specified length.
 */
export function randomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

/**
 * Generate a random email.
 */
export function randomEmail(): string {
  return `${randomString(8)}@test.example.com`;
}

/**
 * Reset the internal counter (useful for test isolation).
 */
export function resetFactory(): void {
  counter = 0;
}
