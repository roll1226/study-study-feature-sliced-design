import { lazyImport } from "@shared/utils/lazyImport";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

const MockComponent = () => <div>Mock Component</div>;

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

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await screen.findByText("Mock Component");

    expect(screen.getByText("Mock Component")).toBeInTheDocument();
  });
});
