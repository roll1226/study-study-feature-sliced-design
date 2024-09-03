import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFoundPage } from "../../NotFoundPage";

describe("NotFoundPage", () => {
  it("should render the correct content", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    // Check if the heading is rendered
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "404 - Page Not Found"
    );

    // Check if the paragraph is rendered
    expect(
      screen.getByText("Sorry, the page you are looking for does not exist.")
    ).toBeInTheDocument();

    // Check if the link is rendered and has correct href
    const link = screen.getByRole("link", { name: "Go back to Main Page" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
