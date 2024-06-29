import App from "@app/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

const setup = () => {
  userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
};

describe("Test App.tsx First Main Page", () => {
  it("check show App", () => {
    setup();
    const element = screen.getByText(/This is Main Page/i);
    expect(element).toBeInTheDocument();
  });

  it("App Page to Sub Page", async () => {
    setup();
    const subPageLink = screen.getByTestId("sub-page-link");

    await waitFor(() => userEvent.click(subPageLink));
    const subPageElement = screen.getByText(/This is Sub Page/i);
    expect(subPageElement).toBeInTheDocument();
  });

  it("App Page to Sub Page to Main Page", async () => {
    setup();
    const mainPageLink = screen.getByTestId("main-page-link");
    const subPageLink = screen.getByTestId("sub-page-link");

    await waitFor(() => userEvent.click(subPageLink));
    const subPageElement = screen.getByText(/This is Sub Page/i);
    expect(subPageElement).toBeInTheDocument();

    await waitFor(() => userEvent.click(mainPageLink));
    const mainPageElement = screen.getByText(/This is Main Page/i);
    expect(mainPageElement).toBeInTheDocument();
  });

  it("App Page to Login Page", async () => {
    setup();
    const loginPageLink = screen.getByTestId("login-page-link");

    await waitFor(() => userEvent.click(loginPageLink));
    const loginPageElement = screen.getByText(/This is Login Page/i);
    expect(loginPageElement).toBeInTheDocument();
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
