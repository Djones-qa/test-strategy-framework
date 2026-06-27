import { ApiClient } from "../../src/api/client";
import { createUser } from "../../src/utils/data-factory";
import { assertStatus, assertStatusCreated } from "../../src/api/assertions";

describe("User Workflow Integration", () => {
  let client: ApiClient;

  beforeAll(() => {
    client = new ApiClient();
  });

  describe("User CRUD Workflow", () => {
    let createdUserId: string;

    it("should create a new user", async () => {
      const userData = createUser();
      const response = await client.post<{ id: string }>("/users", {
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });

      assertStatusCreated(response);
      expect(response.data.id).toBeDefined();
      createdUserId = response.data.id;
    });

    it("should retrieve the created user", async () => {
      const response = await client.get(`/users/${createdUserId}`);
      assertStatus(response, 200);
      expect(response.data).toHaveProperty("id", createdUserId);
    });

    it("should update the user", async () => {
      const response = await client.put(`/users/${createdUserId}`, {
        firstName: "Updated",
        lastName: "Name",
      });

      assertStatus(response, 200);
    });

    it("should list all users including the created one", async () => {
      const response = await client.get<{ data: Array<{ id: string }> }>("/users");
      assertStatus(response, 200);
      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: createdUserId })])
      );
    });

    it("should delete the user", async () => {
      const response = await client.delete(`/users/${createdUserId}`);
      assertStatus(response, 204);
    });

    it("should not find the deleted user", async () => {
      try {
        await client.get(`/users/${createdUserId}`);
        fail("Expected 404 error");
      } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response: { status: number } };
          expect(axiosError.response.status).toBe(404);
        }
      }
    });
  });

  describe("Authentication Workflow", () => {
    it("should login and receive a token", async () => {
      const response = await client.post<{ token: string }>("/auth/login", {
        username: "testuser",
        password: "testpass",
      });

      assertStatus(response, 200);
      expect(response.data.token).toBeDefined();
    });

    it("should access protected endpoint with token", async () => {
      const loginResponse = await client.post<{ token: string }>("/auth/login", {
        username: "testuser",
        password: "testpass",
      });

      client.setToken(loginResponse.data.token);
      const protectedResponse = await client.get("/users/me");
      assertStatus(protectedResponse, 200);
    });

    it("should reject access without token", async () => {
      const unauthClient = new ApiClient();
      try {
        await unauthClient.get("/users/me");
        fail("Expected 401 error");
      } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response: { status: number } };
          expect(axiosError.response.status).toBe(401);
        }
      }
    });
  });
});
