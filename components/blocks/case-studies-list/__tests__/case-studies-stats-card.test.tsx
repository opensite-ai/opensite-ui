import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudiesStatsCard } from "../case-studies-stats-card";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, asButton }: { children: React.ReactNode; href?: string; className?: string; asButton?: boolean }) => (
    asButton ? (
      <button className={className} data-testid="mock-pressable">{children}</button>
    ) : (
      <a href={href} className={className} data-testid="mock-pressable">{children}</a>
    )
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`icon-${name}`} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

describe("CaseStudiesStatsCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title and summary", () => {
    render(
      <CaseStudiesStatsCard
        title="Custom Title"
        summary="Custom summary"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom summary")).toBeInTheDocument();
  });

  it("renders custom stats", () => {
    const customStats = [
      { number: "200%", text: "Custom stat text" },
    ];

    render(<CaseStudiesStatsCard stats={customStats} />);
    expect(screen.getByText("200%")).toBeInTheDocument();
    expect(screen.getByText("Custom stat text")).toBeInTheDocument();
  });

  it("renders custom author", () => {
    const customAuthor = {
      name: "Custom Author",
      image: "/custom-avatar.jpg",
      role: "Custom Role",
    };

    render(<CaseStudiesStatsCard author={customAuthor} />);
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Role")).toBeInTheDocument();
  });

  it("handles empty stats array", () => {
    render(<CaseStudiesStatsCard stats={[]} title="Test Title" summary="Test summary" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test summary")).toBeInTheDocument();
    // Stats container should be empty when no stats are provided
    const statsContainer = document.querySelector(".grid");
    expect(statsContainer?.children.length ?? 0).toBe(0);
  });

  it("renders action icon names dynamically and preserves custom icons", () => {
    const leadingIcon = "lucide/chart-no-axes-combined";
    const trailingIcon = "lucide/arrow-right";

    render(
      <CaseStudiesStatsCard
        actions={[
          {
            label: "Read story",
            href: "/story",
            icon: leadingIcon,
            iconAfter: trailingIcon,
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    const stringAction = screen.getByText("Read story").closest("button, a");
    expect(stringAction).not.toBeNull();
    expect(stringAction).not.toHaveTextContent(leadingIcon);
    expect(stringAction).not.toHaveTextContent(trailingIcon);
    expect(screen.getByTestId(`icon-${leadingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId(`icon-${trailingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });
});
