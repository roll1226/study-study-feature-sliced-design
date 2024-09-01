import { render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { Loading } from "../../Loading";
import { lazyImport } from "../../utils/lazyImport";

const MockComponent = () => <div>Mock Component</div>;

const mockFactory = () =>
  Promise.resolve({
    MockComponent,
  });

describe("lazyImport", () => {
  it("should lazily import the component", async () => {
    const { MockComponent } = lazyImport(mockFactory, "MockComponent");

    render(
      <Suspense fallback={<Loading />}>
        <MockComponent />
      </Suspense>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Mock Component")).toBeInTheDocument();
    });
  });
});
