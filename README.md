# Test Strategy Framework

[![CI Pipeline](https://github.com/Djones-qa/test-strategy-framework/actions/workflows/ci.yaml/badge.svg)](https://github.com/Djones-qa/test-strategy-framework/actions/workflows/ci.yaml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40-orange.svg)](https://playwright.dev/)
[![Jest](https://img.shields.io/badge/Jest-29-red.svg)](https://jestjs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Comprehensive QA test strategy & automation framework — API testing, E2E testing, performance testing, and CI integration.

## Features

- **API Testing** — HTTP client wrapper with custom assertions using Axios + Jest
- **E2E Testing** — Cross-browser testing with Playwright and Page Object Models
- **Performance Testing** — Load testing with k6 and configurable thresholds
- **CI/CD Pipeline** — GitHub Actions workflow with lint, test, and performance stages
- **Test Data Factory** — Consistent test data generation with factory pattern
- **Custom Reporter** — Structured test result output for CI integration
- **TypeScript First** — Full type safety across the entire framework

## Project Structure

```
test-strategy-framework/
├── .github/workflows/ci.yaml       # CI pipeline (lint, unit, e2e, perf)
├── src/
│   ├── api/                         # API test utilities & helpers
│   │   ├── client.ts                # HTTP client wrapper
│   │   └── assertions.ts            # Custom API assertions
│   ├── e2e/                         # E2E test utilities
│   │   ├── fixtures.ts              # Playwright fixtures
│   │   └── pages/                   # Page Object Models
│   │       └── login.page.ts
│   ├── performance/                 # Performance test scripts
│   │   └── load-test.ts             # k6 load test script
│   └── utils/                       # Shared utilities
│       ├── config.ts                # Environment config
│       ├── data-factory.ts          # Test data generators
│       └── reporter.ts              # Custom test reporter
├── tests/
│   ├── api/                         # API test specs
│   │   └── health.test.ts
│   ├── e2e/                         # E2E test specs
│   │   └── login.spec.ts
│   ├── integration/                 # Integration test specs
│   │   └── workflow.test.ts
│   └── unit/                        # Unit tests for utilities
│       └── data-factory.test.ts
├── reports/                         # Generated test reports (gitignored)
├── docs/
│   └── test-plan.md                 # Test plan documentation
├── .env.example                     # Environment variable template
├── jest.config.ts                   # Jest configuration
├── playwright.config.ts             # Playwright configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- k6 (for performance tests)

### Installation

```bash
# Clone the repository
git clone https://github.com/Djones-qa/test-strategy-framework.git
cd test-strategy-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment template
cp .env.example .env
```

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run API tests
npm run test:api

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run performance tests
npm run test:perf

# Run tests with coverage
npm run report
```

### Linting & Formatting

```bash
# Run linter
npm run lint

# Format code
npm run format
```

## Test Strategy

### Test Pyramid

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit | Jest | Business logic, utilities |
| API | Jest + Axios | Endpoint validation, contracts |
| Integration | Jest + Axios | Multi-service workflows |
| E2E | Playwright | User journeys, cross-browser |
| Performance | k6 | Load testing, thresholds |

### Performance Thresholds

- **p95 Response Time:** < 500ms
- **p99 Response Time:** < 1000ms
- **Error Rate:** < 5%

### Coverage Goals

- Unit test coverage > 80%
- All critical API endpoints covered
- E2E coverage of key user journeys

## CI/CD Pipeline

The GitHub Actions workflow runs on push to `main`/`develop` and pull requests:

1. **Lint & Type Check** — ESLint + TypeScript compiler
2. **Unit Tests** — Jest with coverage reporting
3. **API Tests** — Endpoint validation
4. **E2E Tests** — Playwright cross-browser tests
5. **Performance Tests** — k6 load tests

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and update values:

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Application base URL | `http://localhost:3000` |
| `API_BASE_URL` | API base URL | `http://localhost:3000/api` |
| `AUTH_USERNAME` | Test auth username | `testuser` |
| `AUTH_PASSWORD` | Test auth password | `testpass` |
| `PERF_VUS` | Virtual users for perf tests | `10` |
| `PERF_DURATION` | Performance test duration | `30s` |

## Author

**Darrius Jones**

- GitHub: [@Djones-qa](https://github.com/Djones-qa)
- LinkedIn: [darrius-jones-28226b350](https://www.linkedin.com/in/darrius-jones-28226b350)

## License

MIT © 2026 Darrius Jones

See [LICENSE](./LICENSE) for details.
