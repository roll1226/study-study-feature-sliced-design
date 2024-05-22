import App from "@app/App";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("sample test", () => {
    render(<App />);
    const linkElement = screen.getByText(/count is/i);
    expect(linkElement).toBeInTheDocument();
  });
});
