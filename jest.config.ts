import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@e2e/(.*)$": "<rootDir>/src/e2e/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@performance/(.*)$": "<rootDir>/src/performance/$1",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/performance/**",
  ],
  coverageDirectory: "reports/coverage",
  coverageReporters: ["text", "lcov", "html"],
  setupFiles: ["dotenv/config"],
  verbose: true,
};

export default config;
