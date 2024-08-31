import { lazyImport } from "@shared/utils/lazyImport";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

// Mock Component
const MockComponent = () => <div>Mock Component</div>;

// Mock factory function
const mockFactory = () => Promise.resolve({ MockComponent });

describe("lazyImport", () => {
  it("should correctly lazy load a component", async () => {
    const { MockComponent: LazyMockComponent } = lazyImport(
      mockFactory,
      "MockComponent"
    );

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <LazyMockComponent />
      </Suspense>
    );

    // The fallback should be rendered while loading
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy component to load
    await screen.findByText("Mock Component");

    // The lazy-loaded component should be rendered
    expect(screen.getByText("Mock Component")).toBeInTheDocument();
  });
});
