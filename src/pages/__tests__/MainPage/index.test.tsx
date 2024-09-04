import { render, screen } from "@testing-library/react";
import { MainPage } from "../../MainPage";

describe("MainPage", () => {
  it("should render the main page content", () => {
    render(<MainPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "This is Main Page"
    );
  });
});
