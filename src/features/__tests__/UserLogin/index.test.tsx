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

describe("Testing the UserLogin component", () => {
  beforeEach(() => {
    // 各テストの前にフックの戻り値をリセットする
    mockUseUser.mockReset();
    mockUseFetch.mockReset();
  });

  it("Forms render correctly", () => {
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

  it("HandleLogin calls when the login button is clicked", async () => {
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

  it("HandleLogin is called when the login button is clicked", () => {
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

  it("Welcome message displayed when user logs in", () => {
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

  it("Loading message while fetch hook is loading data", () => {
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

  it("Error message displayed when fetch hook returns error message", () => {
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

  it("User card displayed when fetch hook returns data", () => {
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
