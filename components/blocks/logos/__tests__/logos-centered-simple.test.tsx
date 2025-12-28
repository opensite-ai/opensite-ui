import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosCenteredSimple } from "../logos-centered-simple";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

describe("LogosCenteredSimple", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<LogosCenteredSimple />);
    expect(screen.getByText("Trusted by innovative companies")).toBeInTheDocument();
    expect(screen.getByText("Join thousands of businesses that rely on our platform")).toBeInTheDocument();
  });

  it("renders custom title and subtitle", () => {
    render(
      <LogosCenteredSimple
        title="Custom Title"
        subtitle="Custom Subtitle"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("renders default logos", () => {
    render(<LogosCenteredSimple />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBe(6);
  });

  it("renders custom logos", () => {
    const customLogos = [
      { name: "Custom Company 1", logo: "/custom1.png" },
      { name: "Custom Company 2", logo: "/custom2.png" },
    ];
    render(<LogosCenteredSimple logos={customLogos} />);
    expect(screen.getByAltText("Custom Company 1 logo")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Company 2 logo")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LogosCenteredSimple className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosCenteredSimple />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("handles empty logos array", () => {
    render(<LogosCenteredSimple logos={[]} />);
    expect(screen.getByText("Trusted by innovative companies")).toBeInTheDocument();
  });
});
