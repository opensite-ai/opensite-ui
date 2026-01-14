import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutDeveloperProfile } from "../about-developer-profile";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("AboutDeveloperProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutDeveloperProfile
        name="Test Name"
        role="Test Role"
        bio="Test Bio"
      />
    );
    expect(screen.getByText("Test Name")).toBeInTheDocument();
    expect(screen.getByText("Test Role")).toBeInTheDocument();
    expect(screen.getByText("Test Bio")).toBeInTheDocument();
  });

  it("renders custom name", () => {
    render(<AboutDeveloperProfile name="Custom Name" />);
    expect(screen.getByText("Custom Name")).toBeInTheDocument();
  });

  it("renders custom role", () => {
    render(<AboutDeveloperProfile role="Custom Role" />);
    expect(screen.getByText("Custom Role")).toBeInTheDocument();
  });

  it("renders custom bio", () => {
    render(<AboutDeveloperProfile bio="Custom bio text" />);
    expect(screen.getByText("Custom bio text")).toBeInTheDocument();
  });

  it("renders skills when provided", () => {
    const skills = ["React", "TypeScript", "Node.js"];
    render(<AboutDeveloperProfile skills={skills} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Contact Me", href: "/contact", variant: "default" as const },
    ];
    render(<AboutDeveloperProfile actions={actions} />);
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutDeveloperProfile className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
