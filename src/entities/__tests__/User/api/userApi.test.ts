import { describe, expect, it, vi } from "vitest";
import { login } from "@entities/User/api/userApi";
import { ResultCurrentUser } from "@entities/User/models/currentUser";

// モックレスポンスの型
const mockResponse = (status: number, body: unknown) => {
  console.log(status, body);

  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
};

describe("login", () => {
  it("Returns user data if login is successful", async () => {
    const mockUser: ResultCurrentUser = {
      token: "mock-token",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve(mockResponse(200, mockUser))
    ) as unknown as typeof fetch;

    // ログインを実行
    const result = await login("mock@example.com", "password");

    expect(result).toEqual(mockUser);
  });

  it("Throw error if login fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(mockResponse(400, { error: "Failed to login" }))
    ) as unknown as typeof fetch;

    await expect(login("mock@example.com", "password")).rejects.toThrow(
      "Failed to login"
    );
  });
});
