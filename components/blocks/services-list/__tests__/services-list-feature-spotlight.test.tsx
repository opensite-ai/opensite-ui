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

  it("renders with default props", () => {
    render(<ServicesListFeatureSpotlight />);
    expect(screen.getByText("Service advantages built for modern teams")).toBeInTheDocument();
    expect(screen.getByText("The OpenSite AI approach")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ServicesListFeatureSpotlight heading="Our Key Features" />);
    expect(screen.getByText("Our Key Features")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<ServicesListFeatureSpotlight subheading="Why choose us" />);
    expect(screen.getByText("Why choose us")).toBeInTheDocument();
  });

  it("renders features", () => {
    const features = [
      { id: "1", title: "Fast Performance", description: "Lightning fast load times", iconName: "lucide/zap" },
      { id: "2", title: "Secure", description: "Enterprise-grade security", iconName: "lucide/shield" },
    ];
    render(<ServicesListFeatureSpotlight features={features} />);
    expect(screen.getByText("Fast Performance")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    const features = [
      { id: "1", title: "Feature", description: "This is a detailed description of the feature", iconName: "lucide/star" },
    ];
    render(<ServicesListFeatureSpotlight features={features} />);
    expect(screen.getByText("This is a detailed description of the feature")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ServicesListFeatureSpotlight className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
