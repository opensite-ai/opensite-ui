import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutStatsSidebar } from "../about-stats-sidebar";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutStatsSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AboutStatsSidebar />);
    expect(screen.getByText("Why Choose Us")).toBeInTheDocument();
    expect(screen.getByText(/We've built a platform that scales with your needs/)).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutStatsSidebar title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutStatsSidebar description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "100+", label: "Customers" },
      { value: "50K", label: "Users" },
    ];
    render(<AboutStatsSidebar stats={stats} />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("Customers")).toBeInTheDocument();
    expect(screen.getByText("50K")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature 1", description: "Feature 1 description" },
      { title: "Feature 2", description: "Feature 2 description" },
    ];
    render(<AboutStatsSidebar features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 1 description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutStatsSidebar className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
