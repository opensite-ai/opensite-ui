import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailFullscreenHero } from "../project-detail-fullscreen-hero";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode;
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

describe("ProjectDetailFullscreenHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailFullscreenHero title="Mountain Expedition" />);
    expect(screen.getByText("Mountain Expedition")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailFullscreenHero subtitle="A journey through the peaks" />);
    expect(screen.getByText("A journey through the peaks")).toBeInTheDocument();
  });

  it("renders category, year, and client", () => {
    render(<ProjectDetailFullscreenHero category="Adventure Photography" year="2024" client="National Geographic" />);
    expect(screen.getByText("Adventure Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("National Geographic")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    const sections = [
      { id: "journey", title: "The Journey", content: "A 30-day expedition" },
    ];
    render(<ProjectDetailFullscreenHero sections={sections} />);
    expect(screen.getByText("The Journey")).toBeInTheDocument();
    expect(screen.getByText("A 30-day expedition")).toBeInTheDocument();
  });

  it("applies custom className to article", () => {
    const { container } = render(<ProjectDetailFullscreenHero className="custom-class" title="Test Project" />);
    expect(container.querySelector("article")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailFullscreenHero backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("preserves the flexible back action contract and media boundaries", () => {
    const { container, rerender } = render(
      <ProjectDetailFullscreenHero
        backAction={{
          label: "Back",
          href: "/back",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
          children: null,
          className: "custom-action",
        }}
      />,
    );
    const rawAction = container.querySelector('a[href="/back"]') as HTMLElement;
    expect(rawAction).toHaveClass("custom-action");
    expect(
      within(rawAction)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(
      within(rawAction).queryByText("lucide/arrow-left"),
    ).not.toBeInTheDocument();
    expect(
      within(rawAction).queryByText("lucide/arrow-right"),
    ).not.toBeInTheDocument();

    rerender(
      <ProjectDetailFullscreenHero
        backAction={{
          label: "Custom",
          href: "/custom",
          icon: <span data-testid="custom-before">before</span>,
          iconAfter: <span data-testid="custom-after">after</span>,
        }}
      />,
    );
    let action = container.querySelector('a[href="/custom"]') as HTMLElement;
    expect(within(action).getByTestId("custom-before")).toBeInTheDocument();
    expect(within(action).getByTestId("custom-after")).toBeInTheDocument();
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    for (const [backAction, expectedText] of [
      [{ label: "Empty", href: "/empty", icon: "", iconAfter: "" }, "Empty"],
      [
        {
          label: "Boundary",
          href: "/boundary",
          icon: false,
          iconAfter: 0,
        },
        "Boundary0",
      ],
      [
        {
          label: "Hidden false",
          href: "/false-child",
          icon: "lucide/hidden",
          children: false,
        },
        "",
      ],
      [
        {
          label: "Hidden zero",
          href: "/zero-child",
          icon: "lucide/hidden",
          children: 0,
        },
        "0",
      ],
    ] as const) {
      rerender(<ProjectDetailFullscreenHero backAction={backAction} />);
      action = container.querySelector(
        `a[href="${backAction.href}"]`,
      ) as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <ProjectDetailFullscreenHero
        backAction={{
          label: "Hidden label",
          href: "/children",
          icon: "lucide/hidden-before",
          iconAfter: "lucide/hidden-after",
          children: <span>Custom children</span>,
        }}
      />,
    );
    action = container.querySelector('a[href="/children"]') as HTMLElement;
    expect(within(action).getByText("Custom children")).toBeInTheDocument();
    expect(within(action).queryByText("Hidden label")).not.toBeInTheDocument();
    expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();

    const heroImage = {
      src: "lucide/image-looking-url",
      alt: "Boundary hero",
    };
    rerender(
      <ProjectDetailFullscreenHero
        backAction={{
          label: "Generated back",
          href: "/generated",
          icon: "lucide/generated",
        }}
        backActionSlot={<div>Custom back slot</div>}
        heroImage={heroImage}
      />,
    );
    expect(screen.getByText("Custom back slot")).toBeInTheDocument();
    expect(container.querySelector('a[href="/generated"]')).not.toBeInTheDocument();
    expect(screen.getByAltText("Boundary hero")).toHaveAttribute(
      "src",
      "lucide/image-looking-url",
    );
    expect(
      container.querySelector('[data-name="lucide/image-looking-url"]'),
    ).not.toBeInTheDocument();

    rerender(<ProjectDetailFullscreenHero heroImage={heroImage} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.getByAltText("Boundary hero")).toBeInTheDocument();
  });
});
