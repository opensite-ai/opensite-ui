import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ServicesListTableHover } from "../services-list-table-hover";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServicesListTableHover", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ServicesListTableHover />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ServicesListTableHover className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ServicesListTableHover />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    const { getByText } = render(
      <ServicesListTableHover
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Title")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });
});
