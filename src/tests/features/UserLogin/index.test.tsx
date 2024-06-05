import { useUser } from "@entities/User/hooks/useUser";
import UserLogin from "@features/UserLogin";
import useFetch from "@shared/hooks/useFetch";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedFunction, beforeEach, describe, expect, it, vi } from "vitest";

// useUserフックのモック
vi.mock("@entities/User/hooks/useUser");
const mockUseUser = useUser as MockedFunction<typeof useUser>;

// useFetchフックのモック
vi.mock("@shared/hooks/useFetch");
const mockUseFetch = useFetch as MockedFunction<typeof useFetch>;

describe("UserLoginコンポーネントのテスト", () => {
  beforeEach(() => {
    // 各テストの前にフックの戻り値をリセットする
    mockUseUser.mockReset();
    mockUseFetch.mockReset();
  });

  it("フォームが正しくレンダリングされる", () => {
    mockUseUser.mockReturnValue({
      user: null,
      error: null,
      handleLogin: vi.fn(),
    });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<UserLogin />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("ログインボタンをクリックしたときにhandleLoginが呼び出される", async () => {
    const handleLogin = vi.fn();
    mockUseUser.mockReturnValue({
      user: null,
      error: null,
      handleLogin,
    });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<UserLogin />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(handleLogin).toHaveBeenCalledWith("test@example.com", "password");
  });

  it("エラーメッセージが表示される", () => {
    const error = new Error("Invalid credentials");
    mockUseUser.mockReturnValue({
      user: null,
      error,
      handleLogin: vi.fn(),
    });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<UserLogin />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("ユーザーがログインしているときにウェルカムメッセージが表示される", () => {
    const user = { token: "12345" };
    mockUseUser.mockReturnValue({
      user,
      error: null,
      handleLogin: vi.fn(),
    });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<UserLogin />);

    expect(screen.getByText("Welcome, 12345!")).toBeInTheDocument();
  });

  it("fetchフックがデータをロードしている間にローディングメッセージが表示される", () => {
    mockUseUser.mockReturnValue({
      user: null,
      error: null,
      handleLogin: vi.fn(),
    });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<UserLogin />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("fetchフックがエラーメッセージを返したときにエラーメッセージが表示される", () => {
    const fetchError = new Error("Failed to fetch data");
    mockUseUser.mockReturnValue({
      user: null,
      error: null,
      handleLogin: vi.fn(),
    });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: fetchError,
    });

    render(<UserLogin />);

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("fetchフックがデータを返したときにユーザーカードが表示される", () => {
    const users = [
      { id: 1, name: "Leanne Graham", username: "Bret" },
      { id: 2, name: "Ervin Howell", username: "Antonette" },
    ];
    mockUseUser.mockReturnValue({
      user: null,
      error: null,
      handleLogin: vi.fn(),
    });
    mockUseFetch.mockReturnValue({
      data: users,
      loading: false,
      error: null,
    });

    render(<UserLogin />);

    users.forEach((user) => {
      expect(screen.getByText(`ID: ${user.id}`)).toBeInTheDocument();
      expect(screen.getByText(`NAME: ${user.name}`)).toBeInTheDocument();
      expect(
        screen.getByText(`USERNAME: ${user.username}`)
      ).toBeInTheDocument();
    });
  });
});
