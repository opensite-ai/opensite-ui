import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMap } from "../contact-map";

vi.mock("../../../ui/geo-map", () => ({
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
      />
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("mock-geo-map")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactMap className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
