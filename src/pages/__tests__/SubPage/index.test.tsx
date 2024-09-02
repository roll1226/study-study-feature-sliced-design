import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SubPage } from "../../SubPage";

describe("SubPage", () => {
  it("should render the heading correctly", () => {
    render(<SubPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "This is Sub Page"
    );
  });
});
