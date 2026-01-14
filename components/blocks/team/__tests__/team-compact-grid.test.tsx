import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TeamCompactGrid } from "../team-compact-grid";
import type { TeamCompactGridMember } from "../team-compact-grid";

describe("TeamCompactGrid", () => {
  const mockMembers: TeamCompactGridMember[] = [
    {
      id: "person-1",
      name: "Jane Doe",
      role: "CEO",
      department: "Leadership",
      avatar: "/avatars/jane.jpg",
    },
    {
      id: "person-2",
      name: "John Smith",
      role: "CTO",
      department: "Engineering",
      avatar: "/avatars/john.jpg",
    },
    {
      id: "person-3",
      name: "Alice Johnson",
      role: "Designer",
      department: "Design",
      avatar: "/avatars/alice.jpg",
    },
    {
      id: "person-4",
      name: "Bob Williams",
      role: "Product Manager",
      department: "Product",
      avatar: "/avatars/bob.jpg",
    },
  ];

  it("renders all team members correctly", () => {
    render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        description="Test description"
        ctaHeading="Test CTA"
        ctaButtonText="Test Button"
      />
    );
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("CTO")).toBeInTheDocument();
  });

  it("renders department badges for all members", () => {
    render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    expect(screen.getByText("Leadership")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  it("renders custom heading and description", () => {
    render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Our Team"
        description="Meet the people making it happen"
      />
    );
    expect(screen.getByText("Our Team")).toBeInTheDocument();
    expect(
      screen.getByText("Meet the people making it happen")
    ).toBeInTheDocument();
  });

  it("renders CTA section with provided content", () => {
    render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaHeading="Ready to build the future with us?"
        ctaButtonText="Explore Careers"
      />
    );
    expect(
      screen.getByText("Ready to build the future with us?")
    ).toBeInTheDocument();
    expect(screen.getByText("Explore Careers")).toBeInTheDocument();
  });

  it("renders custom CTA content", () => {
    render(
      <TeamCompactGrid
        members={mockMembers}
        ctaHeading="Join Our Team"
        ctaDescription="We're hiring!"
        ctaButtonText="View Openings"
        ctaButtonUrl="/careers"
      />
    );
    expect(screen.getByText("Join Our Team")).toBeInTheDocument();
    expect(screen.getByText("We're hiring!")).toBeInTheDocument();
    expect(screen.getByText("View Openings")).toBeInTheDocument();
  });

  it("applies correct 4-column grid layout", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-4");
  });

  it("applies custom background variant", () => {
    const { container } = render(
      <TeamCompactGrid members={mockMembers} background="white" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("bg-background");
  });

  it("applies custom spacing variant", () => {
    const { container } = render(
      <TeamCompactGrid members={mockMembers} spacing="sm" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-12");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TeamCompactGrid members={mockMembers} className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("renders member cards with hover effects", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    const cards = container.querySelectorAll(".group");
    expect(cards.length).toBe(mockMembers.length);
    cards.forEach((card) => {
      expect(card.className).toContain("hover:bg-muted");
    });
  });

  it("renders avatars for all members", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    const avatars = container.querySelectorAll("[data-slot='avatar']");
    expect(avatars.length).toBe(mockMembers.length);
  });

  it("renders with empty members array", () => {
    const { container } = render(
      <TeamCompactGrid
        members={[]}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(0);
  });

  it("applies border and rounded styles to member cards", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    const cards = container.querySelectorAll(".rounded-lg.border");
    expect(cards.length).toBe(mockMembers.length);
  });

  it("renders CTA button with correct href", () => {
    render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Explore Careers"
        ctaButtonUrl="/join-us"
      />
    );
    const button = screen.getByText("Explore Careers").closest("a");
    expect(button).toHaveAttribute("href", "/join-us");
  });

  it("applies backdrop blur to member cards", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    const cards = container.querySelectorAll(".backdrop-blur-sm");
    expect(cards.length).toBe(mockMembers.length);
  });

  it("renders CTA section with border separator", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaHeading="Test CTA"
        ctaButtonText="Test Button"
      />
    );
    const ctaSection = container.querySelector(".border-t.pt-16");
    expect(ctaSection).toBeInTheDocument();
  });

  it("centers CTA content", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaHeading="Test CTA"
        ctaButtonText="Test Button"
      />
    );
    const ctaSection = container.querySelector(".text-center");
    expect(ctaSection).toBeInTheDocument();
  });

  it("applies responsive heading sizes", () => {
    const { container } = render(
      <TeamCompactGrid
        members={mockMembers}
        heading="Test Team"
        ctaButtonText="Test Button"
      />
    );
    const heading = container.querySelector("h2");
    expect(heading?.className).toContain("lg:text-5xl");
  });
});
