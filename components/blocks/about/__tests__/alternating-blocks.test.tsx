import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AlternatingBlocks } from "../alternating-blocks";
import type { AlternatingBlockSection } from "../alternating-blocks";

describe("AlternatingBlocks", () => {
  const mockSections: AlternatingBlockSection[] = [
    {
      content: <div>Content 1</div>,
      media: <img src="test1.jpg" alt="Test 1" />,
      mediaLeft: false,
    },
    {
      content: <div>Content 2</div>,
      media: <img src="test2.jpg" alt="Test 2" />,
      mediaLeft: true,
    },
  ];

  it("renders all sections correctly", () => {
    render(<AlternatingBlocks sections={mockSections} />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.getByAltText("Test 1")).toBeInTheDocument();
    expect(screen.getByAltText("Test 2")).toBeInTheDocument();
  });

  it("applies correct grid layout", () => {
    const { container } = render(<AlternatingBlocks sections={mockSections} />);
    const grids = container.querySelectorAll(".grid");
    expect(grids.length).toBe(2);
    grids.forEach((grid) => {
      expect(grid.className).toContain("md:grid-cols-2");
    });
  });

  it("alternates media position correctly when mediaLeft is false", () => {
    const sections: AlternatingBlockSection[] = [
      {
        content: <div data-testid="content">Content</div>,
        media: <img src="test.jpg" alt="Test" />,
        mediaLeft: false,
      },
    ];
    const { container } = render(<AlternatingBlocks sections={sections} />);
    const gridDiv = container.querySelector(".grid");
    const children = gridDiv?.querySelectorAll(":scope > div");
    const contentWrapper = children?.[0];
    const mediaWrapper = children?.[1];

    // When mediaLeft is false, content wrapper should NOT have md:order-2
    expect(contentWrapper?.className).not.toContain("md:order-2");
    // Media wrapper should NOT have md:order-1
    expect(mediaWrapper?.className).not.toContain("md:order-1");
  });

  it("alternates media position correctly when mediaLeft is true", () => {
    const sections: AlternatingBlockSection[] = [
      {
        content: <div data-testid="content">Content</div>,
        media: <img src="test.jpg" alt="Test" />,
        mediaLeft: true,
      },
    ];
    const { container } = render(<AlternatingBlocks sections={sections} />);
    const gridDiv = container.querySelector(".grid");
    const children = gridDiv?.querySelectorAll(":scope > div");
    const contentWrapper = children?.[0];
    const mediaWrapper = children?.[1];

    // When mediaLeft is true, content wrapper should have md:order-2
    expect(contentWrapper?.className).toContain("md:order-2");
    // Media wrapper should have md:order-1
    expect(mediaWrapper?.className).toContain("md:order-1");
  });

  it("applies custom className", () => {
    const { container } = render(
      <AlternatingBlocks sections={mockSections} className="custom-class" />,
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default spacing classes from Section component", () => {
    const { container } = render(<AlternatingBlocks sections={mockSections} />);
    const section = container.firstChild as HTMLElement;
    // Default spacing is "lg" which applies py-20 md:py-32
    expect(section.className).toContain("py-20");
  });

  it("applies correct container width", () => {
    const { container } = render(<AlternatingBlocks sections={mockSections} />);
    const innerContainer = container.querySelector(".max-w-\\[900px\\]");
    expect(innerContainer).toBeInTheDocument();
  });

  it("renders with empty sections array", () => {
    const { container } = render(<AlternatingBlocks sections={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders complex content nodes", () => {
    const complexSections: AlternatingBlockSection[] = [
      {
        content: (
          <div>
            <h3>Title</h3>
            <p>Description</p>
            <button>CTA</button>
          </div>
        ),
        media: (
          <div>
            <img src="test.jpg" alt="Test" />
          </div>
        ),
        mediaLeft: false,
      },
    ];

    render(<AlternatingBlocks sections={complexSections} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("CTA")).toBeInTheDocument();
  });

  it("applies border and rounded styles to media container", () => {
    const { container } = render(<AlternatingBlocks sections={mockSections} />);
    const mediaContainers = container.querySelectorAll(".rounded-lg.border");
    expect(mediaContainers.length).toBe(2);
  });

  it("centers media content", () => {
    const { container } = render(<AlternatingBlocks sections={mockSections} />);
    const mediaWrappers = container.querySelectorAll(
      ".flex.h-full.w-full.items-center.justify-center",
    );
    expect(mediaWrappers.length).toBe(2);
  });

  it("renders with title prop", () => {
    render(<AlternatingBlocks sections={mockSections} title="Our Story" />);
    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });

  it("renders with subtitle prop", () => {
    render(<AlternatingBlocks sections={mockSections} subtitle="About Us" />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders with both title and subtitle", () => {
    render(
      <AlternatingBlocks
        sections={mockSections}
        title="Our Story"
        subtitle="About Us"
      />,
    );
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });

  it("applies custom background variant", () => {
    const { container } = render(
      <AlternatingBlocks sections={mockSections} background="gray" />,
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("bg-muted/30");
  });

  it("applies custom spacing variant", () => {
    const { container } = render(
      <AlternatingBlocks sections={mockSections} spacing="xl" />,
    );
    const section = container.firstChild as HTMLElement;
    // xl spacing applies py-24 md:py-40
    expect(section.className).toContain("py-24");
  });

  it("applies small spacing variant", () => {
    const { container } = render(
      <AlternatingBlocks sections={mockSections} spacing="sm" />,
    );
    const section = container.firstChild as HTMLElement;
    // sm spacing applies py-12 md:py-16
    expect(section.className).toContain("py-12");
  });

  it("applies contentClassName to inner container", () => {
    const { container } = render(
      <AlternatingBlocks
        sections={mockSections}
        contentClassName="custom-content-class"
      />,
    );
    const innerContainer = container.querySelector(".max-w-\\[900px\\]");
    expect(innerContainer?.className).toContain("custom-content-class");
  });

  it("combines all Section props correctly", () => {
    const { container } = render(
      <AlternatingBlocks
        sections={mockSections}
        title="Our Journey"
        subtitle="About"
        background="white"
        spacing="md"
        className="section-custom"
        contentClassName="content-custom"
      />,
    );
    const section = container.firstChild as HTMLElement;
    const innerContainer = container.querySelector(".max-w-\\[900px\\]");

    // Check Section wrapper props
    expect(screen.getByText("Our Journey")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(section.className).toContain("section-custom");
    expect(section.className).toContain("bg-white");
    // md spacing applies py-16 md:py-24
    expect(section.className).toContain("py-16");

    // Check contentClassName applied
    expect(innerContainer?.className).toContain("content-custom");
  });
});
