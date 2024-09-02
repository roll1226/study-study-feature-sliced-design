import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoginPage } from "../../LoginPage";

vi.mock("@features/UserLogin", () => {
  return {
    default: () => <div>UserLogin Component</div>,
  };
});

describe("LoginPage", () => {
  it("should render the UserLogin component", () => {
    render(<LoginPage />);

    expect(screen.getByText("UserLogin Component")).toBeInTheDocument();
  });
});
