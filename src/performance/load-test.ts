/**
 * k6 Load Test Script
 * Performance testing for API endpoints.
 *
 * Run: k6 run src/performance/load-test.ts
 *
 * Note: k6 uses its own JavaScript runtime.
 * This file uses k6-compatible syntax.
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const responseTimeTrend = new Trend("response_time_ms");

// Test configuration
export const options = {
  stages: [
    { duration: "10s", target: 5 },   // Ramp up to 5 users
    { duration: "30s", target: 10 },   // Stay at 10 users
    { duration: "10s", target: 20 },   // Spike to 20 users
    { duration: "30s", target: 20 },   // Stay at 20 users
    { duration: "10s", target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    errors: ["rate<0.05"],
    response_time_ms: ["avg<300", "p(95)<500"],
  },
};

const BASE_URL = __ENV.PERF_TARGET_URL || "http://localhost:3000";

export default function (): void {
  // Health check endpoint
  const healthRes = http.get(`${BASE_URL}/api/health`);
  check(healthRes, {
    "health check status is 200": (r) => r.status === 200,
    "health check response time < 200ms": (r) => r.timings.duration < 200,
  });
  errorRate.add(healthRes.status !== 200);
  responseTimeTrend.add(healthRes.timings.duration);

  sleep(1);

  // API endpoint test
  const apiRes = http.get(`${BASE_URL}/api/users`, {
    headers: { "Content-Type": "application/json" },
  });
  check(apiRes, {
    "users endpoint status is 200": (r) => r.status === 200,
    "users response has data": (r) => {
      try {
        const body = JSON.parse(r.body as string);
        return Array.isArray(body.data);
      } catch {
        return false;
      }
    },
  });
  errorRate.add(apiRes.status !== 200);
  responseTimeTrend.add(apiRes.timings.duration);

  sleep(1);

  // POST endpoint test
  const payload = JSON.stringify({
    username: `loadtest_user_${__VU}_${__ITER}`,
    email: `loadtest_${__VU}_${__ITER}@test.com`,
  });

  const postRes = http.post(`${BASE_URL}/api/users`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  check(postRes, {
    "create user status is 201 or 200": (r) => r.status === 201 || r.status === 200,
    "create user response time < 500ms": (r) => r.timings.duration < 500,
  });
  errorRate.add(postRes.status !== 201 && postRes.status !== 200);
  responseTimeTrend.add(postRes.timings.duration);

  sleep(2);
}

export function handleSummary(data: Record<string, unknown>): Record<string, string> {
  return {
    "reports/perf-summary.json": JSON.stringify(data, null, 2),
  };
}
