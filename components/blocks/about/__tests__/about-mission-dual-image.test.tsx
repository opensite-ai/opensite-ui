import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutMissionDualImage } from "../about-mission-dual-image";

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
}));

describe("AboutMissionDualImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutMissionDualImage
        missionTitle="Test Mission Title"
        missionContent="Test Mission Content"
        visionTitle="Test Vision Title"
        visionContent="Test Vision Content"
      />
    );
    expect(screen.getByText("Test Mission Title")).toBeInTheDocument();
    expect(screen.getByText("Test Mission Content")).toBeInTheDocument();
    expect(screen.getByText("Test Vision Title")).toBeInTheDocument();
    expect(screen.getByText("Test Vision Content")).toBeInTheDocument();
  });

  it("renders custom mission title and content", () => {
    render(<AboutMissionDualImage missionTitle="Custom Mission" missionContent="Custom mission content" />);
    expect(screen.getByText("Custom Mission")).toBeInTheDocument();
    expect(screen.getByText("Custom mission content")).toBeInTheDocument();
  });

  it("renders custom vision title and content", () => {
    render(<AboutMissionDualImage visionTitle="Custom Vision" visionContent="Custom vision content" />);
    expect(screen.getByText("Custom Vision")).toBeInTheDocument();
    expect(screen.getByText("Custom vision content")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Learn More", href: "/about", variant: "default" as const },
    ];
    render(<AboutMissionDualImage actions={actions} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutMissionDualImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
