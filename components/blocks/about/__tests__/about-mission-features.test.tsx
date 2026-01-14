import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutMissionFeatures } from "../about-mission-features";

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

describe("AboutMissionFeatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AboutMissionFeatures />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText(/Opensite AI makes it easy to build/)).toBeInTheDocument();
    expect(screen.getByText("OUR MISSION")).toBeInTheDocument();
    expect(screen.getByText("We make creating software easy.")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutMissionFeatures title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutMissionFeatures description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom mission label and text", () => {
    render(<AboutMissionFeatures missionLabel="Custom Label" missionText="Custom mission text" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
    expect(screen.getByText("Custom mission text")).toBeInTheDocument();
  });

  it("renders custom features title and description", () => {
    render(<AboutMissionFeatures featuresTitle="Custom Features" featuresDescription="Custom features description" />);
    expect(screen.getByText("Custom Features")).toBeInTheDocument();
    expect(screen.getByText("Custom features description")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature 1", description: "Feature 1 description" },
      { title: "Feature 2", description: "Feature 2 description" },
    ];
    render(<AboutMissionFeatures features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 1 description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutMissionFeatures className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
