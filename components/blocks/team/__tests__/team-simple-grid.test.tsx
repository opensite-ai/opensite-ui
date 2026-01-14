import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TeamSimpleGrid } from "../team-simple-grid";
import type { TeamSimpleGridMember } from "../team-simple-grid";

describe("TeamSimpleGrid", () => {
  const mockMembers: TeamSimpleGridMember[] = [
    {
      id: "member-1",
      name: "Jane Doe",
      role: "CEO",
      avatar: "/avatars/jane.jpg",
    },
    {
      id: "member-2",
      name: "John Smith",
      role: "CTO",
      avatar: "/avatars/john.jpg",
    },
    {
      id: "member-3",
      name: "Alice Johnson",
      role: "Designer",
      avatar: "/avatars/alice.jpg",
    },
  ];

  it("renders all team members correctly", () => {
    render(<TeamSimpleGrid members={mockMembers} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("CTO")).toBeInTheDocument();
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
  });

  it("renders custom heading and description", () => {
    render(
      <TeamSimpleGrid
        members={mockMembers}
        heading="Our Leadership"
        description="Meet our executive team"
      />
    );
    expect(screen.getByText("Our Leadership")).toBeInTheDocument();
    expect(screen.getByText("Meet our executive team")).toBeInTheDocument();
  });

  it("renders avatars for all members", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    const avatars = container.querySelectorAll("[data-slot='avatar']");
    expect(avatars.length).toBe(mockMembers.length);
  });

  it("applies correct grid layout classes", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("applies custom background variant", () => {
    const { container } = render(
      <TeamSimpleGrid members={mockMembers} background="gray" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("bg-muted/30");
  });

  it("applies custom spacing variant", () => {
    const { container } = render(
      <TeamSimpleGrid members={mockMembers} spacing="xl" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-24");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TeamSimpleGrid members={mockMembers} className="custom-team-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-team-class");
  });

  it("renders with empty members array", () => {
    const { container } = render(<TeamSimpleGrid members={[]} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(0);
  });

  it("centers content correctly", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    const headerDiv = container.querySelector(".flex.flex-col.items-center");
    expect(headerDiv?.className).toContain("text-center");
  });

  it("applies correct avatar sizing classes", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    const avatars = container.querySelectorAll(".size-20");
    expect(avatars.length).toBeGreaterThan(0);
  });

  it("renders avatar fallback with initials", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    // Avatar fallback should contain initials
    const fallbacks = container.querySelectorAll("[data-slot='avatar-fallback']");
    expect(fallbacks.length).toBe(mockMembers.length);
  });

  it("applies responsive text sizing", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    const heading = container.querySelector("h2");
    expect(heading?.className).toContain("lg:text-4xl");
  });

  it("renders description with muted foreground color", () => {
    const { container } = render(
      <TeamSimpleGrid
        members={mockMembers}
        description="Custom description"
      />
    );
    const description = screen.getByText("Custom description");
    expect(description.className).toContain("text-muted-foreground");
  });

  it("applies correct gap spacing in grid", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("gap-x-8");
    expect(grid?.className).toContain("gap-y-16");
  });

  it("renders member cards with centered layout", () => {
    const { container } = render(<TeamSimpleGrid members={mockMembers} />);
    const memberCards = container.querySelectorAll(
      ".flex.flex-col.items-center"
    );
    expect(memberCards.length).toBeGreaterThan(1); // Header + member cards
  });
});
