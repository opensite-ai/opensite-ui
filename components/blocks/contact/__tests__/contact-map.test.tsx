import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMap } from "../contact-map";

vi.mock("@page-speed/maps", () => ({
  GeoMap: ({ className }: { className?: string }) => (
    <div data-testid="mock-geo-map" className={className}>
      map
    </div>
  ),
}));

describe("ContactMap", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactMap
        heading="Test Heading"
        description="Test Description"
        mapProps={{
          markers: [
            {
              id: "office",
              latitude: 33.4934,
              longitude: -111.9261,
              title: "Office",
            },
          ],
        }}
      />
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("mock-geo-map")).toBeInTheDocument();
  });

  it("does not render the map when locations are missing coordinates", () => {
    render(
      <ContactMap
        heading="Test Heading"
        mapProps={{
          markers: [
            {
              id: "office",
              latitude: undefined as unknown as number,
              longitude: -111.9261,
              title: "Office",
            },
          ],
        }}
      />
    );

    expect(screen.queryByTestId("mock-geo-map")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactMap className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
