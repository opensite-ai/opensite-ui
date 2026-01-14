import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutStartupTeam } from "../about-startup-team";

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

describe("AboutStartupTeam", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AboutStartupTeam />);
    expect(screen.getByText("Building the Future of Software Development")).toBeInTheDocument();
    expect(screen.getByText(/We're a team of passionate builders/)).toBeInTheDocument();
    expect(screen.getByText("Meet Our Leadership")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutStartupTeam title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutStartupTeam description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom team title", () => {
    render(<AboutStartupTeam teamTitle="Custom Team Title" />);
    expect(screen.getByText("Custom Team Title")).toBeInTheDocument();
  });

  it("renders team members when provided", () => {
    const teamMembers = [
      { name: "John Doe", role: "CEO" },
      { name: "Jane Smith", role: "CTO" },
    ];
    render(<AboutStartupTeam teamMembers={teamMembers} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders sidebar links when provided", () => {
    const sidebarLinks = [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
    ];
    render(<AboutStartupTeam sidebarLinks={sidebarLinks} />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutStartupTeam className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
