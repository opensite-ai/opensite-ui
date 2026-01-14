import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureIntegrationCards } from "../feature-integration-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.jpg"),
}));

describe("FeatureIntegrationCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureIntegrationCards />);
    expect(screen.getByText("Integrations")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureIntegrationCards title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureIntegrationCards description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders integrations when provided", () => {
    const integrations = [{ title: "Integration 1", description: "Description 1" }];
    render(<FeatureIntegrationCards integrations={integrations} />);
    expect(screen.getByText("Integration 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureIntegrationCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
