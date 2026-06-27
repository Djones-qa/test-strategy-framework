/**
 * Custom Test Reporter
 * Provides structured test result output for CI/CD integration.
 */

export interface TestResult {
  suite: string;
  test: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  error?: string;
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  timestamp: string;
  results: TestResult[];
}

export class TestReporter {
  private results: TestResult[] = [];
  private startTime: number = 0;

  start(): void {
    this.startTime = Date.now();
    this.results = [];
    console.log("\n🧪 Test Execution Started");
    console.log("─".repeat(50));
  }

  addResult(result: TestResult): void {
    this.results.push(result);
    const icon = result.status === "passed" ? "✅" : result.status === "failed" ? "❌" : "⏭️";
    console.log(`${icon} [${result.suite}] ${result.test} (${result.duration}ms)`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }

  getSummary(): TestSummary {
    const duration = Date.now() - this.startTime;
    return {
      total: this.results.length,
      passed: this.results.filter((r) => r.status === "passed").length,
      failed: this.results.filter((r) => r.status === "failed").length,
      skipped: this.results.filter((r) => r.status === "skipped").length,
      duration,
      timestamp: new Date().toISOString(),
      results: this.results,
    };
  }

  printSummary(): void {
    const summary = this.getSummary();
    console.log("\n" + "─".repeat(50));
    console.log("📊 Test Summary");
    console.log("─".repeat(50));
    console.log(`  Total:   ${summary.total}`);
    console.log(`  Passed:  ${summary.passed} ✅`);
    console.log(`  Failed:  ${summary.failed} ❌`);
    console.log(`  Skipped: ${summary.skipped} ⏭️`);
    console.log(`  Duration: ${summary.duration}ms`);
    console.log("─".repeat(50));

    if (summary.failed > 0) {
      console.log("\n❌ Failed Tests:");
      summary.results
        .filter((r) => r.status === "failed")
        .forEach((r) => {
          console.log(`  - [${r.suite}] ${r.test}`);
          if (r.error) console.log(`    ${r.error}`);
        });
    }
  }
}

export const reporter = new TestReporter();
