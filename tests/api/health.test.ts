import { ApiClient } from "../../src/api/client";
import { assertStatus, assertBodyContains, assertJsonContentType } from "../../src/api/assertions";

describe("Health Check API", () => {
  let client: ApiClient;

  beforeAll(() => {
    client = new ApiClient();
  });

  it("should return 200 for health endpoint", async () => {
    const response = await client.get("/health");
    assertStatus(response, 200);
  });

  it("should return JSON content type", async () => {
    const response = await client.get("/health");
    assertJsonContentType(response);
  });

  it("should contain status field in response", async () => {
    const response = await client.get<{ status: string }>("/health");
    assertBodyContains(response, "status");
    expect(response.data.status).toBe("ok");
  });

  it("should respond within acceptable time", async () => {
    const start = Date.now();
    await client.get("/health");
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(5000);
  });

  it("should handle concurrent requests", async () => {
    const requests = Array.from({ length: 10 }, () => client.get("/health"));
    const responses = await Promise.all(requests);
    responses.forEach((response) => {
      assertStatus(response, 200);
    });
  });
});
