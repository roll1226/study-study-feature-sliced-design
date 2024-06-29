import { User } from "@entities/User/models/user";
import useFetch from "@shared/hooks/useFetch";
import { renderHook, waitFor } from "@testing-library/react";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

describe("useFetchカスタムフックのテスト", () => {
  const mockData = [{ id: 1, name: "John Doe" }];
  const mockUrl = "https://jsonplaceholder.typicode.com/users";

  beforeEach(() => {
    // fetch関数をモックする
    global.fetch = vi.fn();
  });

  it("データを正常にフェッチし、loadingがfalseになることを確認する", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch<User>(mockUrl));

    // 初期状態
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // データフェッチを待つ
    await waitFor(() => expect(result.current.loading).toBe(false));

    // フェッチ後の状態
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("ネットワークエラー時にエラーメッセージを返すことを確認する", async () => {
    const mockError = new Error("Network response was not ok");
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useFetch<User>(mockUrl));

    // 初期状態
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // データフェッチを待つ
    await waitFor(() => expect(result.current.loading).toBe(false));

    // フェッチ後の状態
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it("fetchが例外を投げた場合にエラーメッセージを返すことを確認する", async () => {
    const mockError = new Error("Failed to fetch");
    (fetch as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetch<User>(mockUrl));

    // 初期状態
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // データフェッチを待つ
    await waitFor(() => expect(result.current.loading).toBe(false));

    // フェッチ後の状態
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });
});
