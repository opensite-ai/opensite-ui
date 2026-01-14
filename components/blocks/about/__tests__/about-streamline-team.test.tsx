import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutStreamlineTeam } from "../about-streamline-team";

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

describe("AboutStreamlineTeam", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AboutStreamlineTeam />);
    expect(screen.getByText("Streamline Your Workflow")).toBeInTheDocument();
    expect(screen.getByText(/Our platform helps teams work smarter/)).toBeInTheDocument();
    expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutStreamlineTeam title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutStreamlineTeam description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom team title and description", () => {
    render(<AboutStreamlineTeam teamTitle="Custom Team" teamDescription="Custom team description" />);
    expect(screen.getByText("Custom Team")).toBeInTheDocument();
    expect(screen.getByText("Custom team description")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature 1", description: "Feature 1 description" },
      { title: "Feature 2", description: "Feature 2 description" },
    ];
    render(<AboutStreamlineTeam features={features} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 1 description")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Join Team", href: "/careers", variant: "default" as const },
    ];
    render(<AboutStreamlineTeam actions={actions} />);
    expect(screen.getByText("Join Team")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutStreamlineTeam className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
