import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("react-dom/client", async () => {
  const originalModule = await vi.importActual<
    typeof import("react-dom/client")
  >("react-dom/client");
  return {
    ...originalModule,
    createRoot: vi.fn().mockImplementation((container: HTMLElement) => ({
      render: (element: React.ReactNode) => {
        // Render the element using testing-library's render method
        render(element, { container });
      },
    })),
  };
});

describe("Test Main.tsx", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute("id", "root");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("Check show App", async () => {
    await waitFor(() => import("@app/main"));
    const element = await screen.findByText(/This is Main Page/i);

    expect(element).toBeInTheDocument();
  });
});
