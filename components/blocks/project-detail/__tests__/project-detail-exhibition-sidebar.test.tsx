import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailExhibitionSidebar } from "../project-detail-exhibition-sidebar";

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

describe("ProjectDetailExhibitionSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailExhibitionSidebar title="Reflections" />);
    expect(screen.getByText("Reflections")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailExhibitionSidebar subtitle="A mixed media series" />);
    expect(screen.getByText("A mixed media series")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailExhibitionSidebar description="A series exploring identity and self-perception" />);
    expect(screen.getByText("A series exploring identity and self-perception")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailExhibitionSidebar category="Mixed Media" year="2024" artist="Jane Artist" />);
    expect(screen.getByText("Mixed Media")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Jane Artist")).toBeInTheDocument();
  });

  it("renders exhibitions sidebar", () => {
    const exhibitions = [
      { title: "Solo Show", venue: "Modern Gallery", date: "Jan 2024" },
      { title: "Group Exhibition", venue: "Art Center", date: "Mar 2024" },
    ];
    render(<ProjectDetailExhibitionSidebar exhibitions={exhibitions} />);
    expect(screen.getByText("Exhibitions")).toBeInTheDocument();
    expect(screen.getByText("Solo Show")).toBeInTheDocument();
    expect(screen.getByText("Modern Gallery")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailExhibitionSidebar className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailExhibitionSidebar backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("preserves the flexible back action contract and media boundaries", () => {
    const { container, rerender } = render(
      <ProjectDetailExhibitionSidebar
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
      <ProjectDetailExhibitionSidebar
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
      rerender(<ProjectDetailExhibitionSidebar backAction={backAction} />);
      action = container.querySelector(
        `a[href="${backAction.href}"]`,
      ) as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <ProjectDetailExhibitionSidebar
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
      <ProjectDetailExhibitionSidebar
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

    rerender(<ProjectDetailExhibitionSidebar heroImage={heroImage} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.getByAltText("Boundary hero")).toBeInTheDocument();
  });
});
