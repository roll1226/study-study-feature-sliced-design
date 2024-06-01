import useLogin from "@entities/User/hooks/useLogin";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("useLogin", () => {
  it("should handle login", async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail("eve.holt@reqres.in");
      result.current.setPassword("cityslicka");
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.error).toBeNull();
  });

  it("should handle login failure", async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.error).not.toBeNull();
    // 他のアサーションを追加する
  });
});
