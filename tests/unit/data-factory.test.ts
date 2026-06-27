import {
  createUser,
  createAdmin,
  createUsers,
  createApiResponse,
  randomString,
  randomEmail,
  resetFactory,
} from "../../src/utils/data-factory";

describe("Data Factory", () => {
  beforeEach(() => {
    resetFactory();
  });

  describe("createUser", () => {
    it("should create a user with default values", () => {
      const user = createUser();
      expect(user.id).toBeDefined();
      expect(user.username).toContain("user_");
      expect(user.email).toContain("@test.example.com");
      expect(user.firstName).toBe("Test");
      expect(user.lastName).toBe("User");
      expect(user.role).toBe("user");
    });

    it("should accept overrides", () => {
      const user = createUser({ firstName: "John", role: "admin" });
      expect(user.firstName).toBe("John");
      expect(user.role).toBe("admin");
    });

    it("should generate unique IDs", () => {
      const user1 = createUser();
      const user2 = createUser();
      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe("createAdmin", () => {
    it("should create a user with admin role", () => {
      const admin = createAdmin();
      expect(admin.role).toBe("admin");
      expect(admin.firstName).toBe("Admin");
    });

    it("should accept overrides", () => {
      const admin = createAdmin({ firstName: "Super" });
      expect(admin.firstName).toBe("Super");
      expect(admin.role).toBe("admin");
    });
  });

  describe("createUsers", () => {
    it("should create specified number of users", () => {
      const users = createUsers(5);
      expect(users).toHaveLength(5);
    });

    it("should create users with overrides", () => {
      const users = createUsers(3, { role: "viewer" });
      users.forEach((user) => {
        expect(user.role).toBe("viewer");
      });
    });

    it("should generate unique users", () => {
      const users = createUsers(10);
      const ids = users.map((u) => u.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(10);
    });
  });

  describe("createApiResponse", () => {
    it("should create a response with defaults", () => {
      const response = createApiResponse({ name: "test" });
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ name: "test" });
      expect(response.timestamp).toBeDefined();
    });

    it("should accept custom status and message", () => {
      const response = createApiResponse("created", 201, "Resource created");
      expect(response.status).toBe(201);
      expect(response.message).toBe("Resource created");
    });
  });

  describe("randomString", () => {
    it("should generate string of specified length", () => {
      const str = randomString(10);
      expect(str).toHaveLength(10);
    });

    it("should generate alphanumeric characters", () => {
      const str = randomString(100);
      expect(str).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it("should generate different strings", () => {
      const str1 = randomString(20);
      const str2 = randomString(20);
      expect(str1).not.toBe(str2);
    });
  });

  describe("randomEmail", () => {
    it("should generate valid email format", () => {
      const email = randomEmail();
      expect(email).toMatch(/^[a-zA-Z0-9]+@test\.example\.com$/);
    });
  });

  describe("resetFactory", () => {
    it("should reset the internal counter", () => {
      createUser();
      createUser();
      resetFactory();
      // After reset, counter starts again
      const user = createUser();
      expect(user.id).toContain("-1");
    });
  });
});
