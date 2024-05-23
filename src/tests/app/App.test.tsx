import App from "@app/App";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Test App.tsx", () => {
  it("check show App", () => {
    render(<App />);
    const linkElement = screen.getByText(/This is Main Page/i);
    expect(linkElement).toBeInTheDocument();
  });
});
