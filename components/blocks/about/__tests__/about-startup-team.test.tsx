import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AboutStartupTeam } from "../about-startup-team";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, "aria-label": ariaLabel }: { children: React.ReactNode; href?: string; className?: string; "aria-label"?: string }) => (
    <a href={href} className={className} aria-label={ariaLabel} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
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

  it("renders with provided props", () => {
    render(
      <AboutStartupTeam
        title="Test Title"
        description="Test Description"
        teamTitle="Test Team Title"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Team Title")).toBeInTheDocument();
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

  it("routes social icon names and preserves custom and falsy values", () => {
    render(
      <AboutStartupTeam
        teamMembers={[
          {
            name: "Social Member",
            role: "Founder",
            socialLinks: [
              {
                label: "LinkedIn",
                url: "https://example.com/linkedin",
                icon: "lucide/linkedin",
              },
              {
                label: "Custom",
                url: "https://example.com/custom",
                icon: <span data-testid="custom-social-icon" />,
              },
              {
                label: "Zero",
                url: "https://example.com/zero",
                icon: 0,
              },
              {
                label: "False",
                url: "https://example.com/false",
                icon: false,
              },
              {
                label: "Empty",
                url: "https://example.com/empty",
                icon: "",
              },
            ],
          },
        ]}
      />,
    );

    const linkedIn = screen.getByLabelText("LinkedIn");
    expect(
      within(linkedIn).getByTestId("mock-icon"),
    ).toHaveAttribute("data-name", "lucide/linkedin");
    expect(linkedIn).not.toHaveTextContent("lucide/linkedin");
    expect(linkedIn).toHaveAttribute("href", "https://example.com/linkedin");
    expect(screen.getByTestId("custom-social-icon")).toBeInTheDocument();

    const zero = screen.getByLabelText("Zero");
    expect(zero).toHaveTextContent("0");
    expect(within(zero).queryByTestId("mock-icon")).not.toBeInTheDocument();
    for (const label of ["False", "Empty"]) {
      const link = screen.getByLabelText(label);
      expect(link).toBeEmptyDOMElement();
      expect(within(link).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }
  });

  it("preserves teamMembersSlot precedence over generated social links", () => {
    render(
      <AboutStartupTeam
        teamMembers={[
          {
            name: "Hidden Member",
            socialLinks: [
              {
                label: "Hidden Social",
                url: "https://example.com/hidden",
                icon: "lucide/hidden",
              },
            ],
          },
        ]}
        teamMembersSlot={<div data-testid="team-slot">Custom team</div>}
      />,
    );

    expect(screen.getByTestId("team-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Member")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Hidden Social")).not.toBeInTheDocument();
  });

  it("renders sidebar links when provided", () => {
    const sidebarLinks = [
      { label: "About", value: "about", href: "/about" },
      { label: "Team", value: "team", href: "/team" },
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
