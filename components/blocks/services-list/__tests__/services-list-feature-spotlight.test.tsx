import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesListFeatureSpotlight } from "../services-list-feature-spotlight";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(20).fill("https://placeholder.com/image.jpg"),
}));

describe("ServicesListFeatureSpotlight", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders default heading", () => {
    render(<ServicesListFeatureSpotlight />);
    expect(
      screen.getByText("Service advantages built for modern teams")
    ).toBeInTheDocument();
  });

  it("renders feature items", () => {
    render(<ServicesListFeatureSpotlight />);
    expect(screen.getByText("Independent Strategy")).toBeInTheDocument();
    expect(screen.getByText("Personal Guidance")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ServicesListFeatureSpotlight className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
