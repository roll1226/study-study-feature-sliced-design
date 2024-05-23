import App from "@app/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("Test App.tsx First Main Page", () => {
  it("check show App", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const element = screen.getByText(/This is Main Page/i);
    expect(element).toBeInTheDocument();
  });

  it("Transition App Page", async () => {
    userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const mainPageLink = screen.getByTestId("main-page-link");
    const subPageLink = screen.getByTestId("sub-page-link");

    await waitFor(() => userEvent.click(subPageLink));
    const subPageElement = screen.getByText(/This is Sub Page/i);
    expect(subPageElement).toBeInTheDocument();

    await waitFor(() => userEvent.click(mainPageLink));
    const mainPageElement = screen.getByText(/This is Main Page/i);
    expect(mainPageElement).toBeInTheDocument();
  });

  it("Transition Not Found Page", () => {
    render(
      <MemoryRouter initialEntries={["/***"]}>
        <App />
      </MemoryRouter>
    );
    const element = screen.getByText(/404 - Page Not Found/i);
    expect(element).toBeInTheDocument();
  });
});
