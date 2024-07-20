import { render, screen } from "@testing-library/react";
import Navbar from "@widgets/Navbar";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("Navbar", () => {
  it("renders main page link", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const mainPageLink = screen.getByTestId("main-page-link");
    expect(mainPageLink).toBeInTheDocument();
    expect(mainPageLink).toHaveAttribute("href", "/");
  });

  it("renders sub page link", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const subPageLink = screen.getByTestId("sub-page-link");
    expect(subPageLink).toBeInTheDocument();
    expect(subPageLink).toHaveAttribute("href", "/sub");
  });

  it("renders login page link", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const loginPageLink = screen.getByTestId("login-page-link");
    expect(loginPageLink).toBeInTheDocument();
    expect(loginPageLink).toHaveAttribute("href", "/login");
  });
});
