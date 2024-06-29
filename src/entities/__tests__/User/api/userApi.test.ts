import { login } from "@entities/User/api/userApi";
import { ResultCurrentUser } from "@entities/User/models/currentUser";
import { describe, expect, it, vi } from "vitest";

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
  it("ログインに成功した場合、ユーザーデータを返す", async () => {
    // モックデータ
    const mockUser: ResultCurrentUser = {
      token: "mock-token",
    };

    // fetch関数をモック化
    global.fetch = vi.fn(() =>
      Promise.resolve(mockResponse(200, mockUser))
    ) as unknown as typeof fetch;

    // ログインを実行
    const result = await login("mock@example.com", "password");

    // 期待される結果を確認
    expect(result).toEqual(mockUser);
  });

  it("ログインに失敗した場合、エラーをスローする", async () => {
    // fetch関数をモック化
    global.fetch = vi.fn(() =>
      Promise.resolve(mockResponse(400, { error: "Failed to login" }))
    ) as unknown as typeof fetch;

    // エラーハンドリングをテスト
    await expect(login("mock@example.com", "password")).rejects.toThrow(
      "Failed to login"
    );
  });
});
