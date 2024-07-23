import App from "@app/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

// setup関数でSuspenseを使用
const setup = () => {
  userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </MemoryRouter>
  );
};

describe("Test App.tsx First Main Page", () => {
  it("check show App", async () => {
    setup();
    // `findBy`を使って非同期レンダリングを待つ
    const element = await screen.findByText(/This is Main Page/i);
    expect(element).toBeInTheDocument();
  });

  it("App Page to Sub Page", async () => {
    setup();
    const subPageLink = screen.getByTestId("sub-page-link");

    await userEvent.click(subPageLink);
    // `findBy`を使って非同期レンダリングを待つ
    const subPageElement = await screen.findByText(/This is Sub Page/i);
    expect(subPageElement).toBeInTheDocument();
  });

  it("App Page to Sub Page to Main Page", async () => {
    setup();
    const mainPageLink = screen.getByTestId("main-page-link");
    const subPageLink = screen.getByTestId("sub-page-link");

    await userEvent.click(subPageLink);
    const subPageElement = await screen.findByText(/This is Sub Page/i);
    expect(subPageElement).toBeInTheDocument();

    await userEvent.click(mainPageLink);
    // `findBy`を使って非同期レンダリングを待つ
    const mainPageElement = await screen.findByText(/This is Main Page/i);
    expect(mainPageElement).toBeInTheDocument();
  });

  it("App Page to Login Page", async () => {
    setup();
    const loginPageLink = screen.getByTestId("login-page-link");

    await userEvent.click(loginPageLink);
    // `findBy`を使って非同期レンダリングを待つ
    const loginPageElement = await screen.findByText(/This is Login Page/i);
    expect(loginPageElement).toBeInTheDocument();
  });

  it("Transition Not Found Page", async () => {
    render(
      <MemoryRouter initialEntries={["/***"]}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </MemoryRouter>
    );
    // `findBy`を使って非同期レンダリングを待つ
    const element = await screen.findByText(/404 - Page Not Found/i);
    expect(element).toBeInTheDocument();
  });
});
