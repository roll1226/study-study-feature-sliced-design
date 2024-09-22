import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { login } from "@entities/User/api/userApi";
import { useUser } from "@entities/User/hooks/useUser";
import { ResultCurrentUser } from "@entities/User/models/currentUser";

vi.mock("@entities/User/api/userApi.ts", () => ({
  login: vi.fn(),
}));

describe("useUser", () => {
  it("should handle login successfully", async () => {
    const userData: ResultCurrentUser = {
      token: "QpwL5tke4Pnpja7X4",
    };

    // login 関数が成功するモックを設定
    vi.mocked(login).mockResolvedValueOnce(userData);

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.handleLogin("eve.holt@reqres.in", "cityslicka");
    });

    expect(result.current.user).toEqual(userData);
    expect(result.current.error).toBeNull();
  });

  it("should handle login failure", async () => {
    const error = new Error("Login failed");

    // login 関数が失敗するモックを設定
    vi.mocked(login).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.handleLogin("test@example.com", "password");
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toEqual(error);
  });
});
