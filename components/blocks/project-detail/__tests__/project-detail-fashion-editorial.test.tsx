import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailFashionEditorial } from "../project-detail-fashion-editorial";

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

describe("ProjectDetailFashionEditorial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailFashionEditorial title="AUTUMN COLLECTION" />);
    expect(screen.getByText("AUTUMN COLLECTION")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailFashionEditorial subtitle="Fall/Winter 2024" />);
    expect(screen.getByText("Fall/Winter 2024")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailFashionEditorial description="A stunning fashion editorial" />);
    expect(screen.getByText("A stunning fashion editorial")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailFashionEditorial category="Fashion" year="2024" />);
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders credits section", () => {
    const credits = [
      { role: "Photographer", name: "Jane Doe" },
      { role: "Stylist", name: "John Smith" },
    ];
    render(<ProjectDetailFashionEditorial credits={credits} />);
    expect(screen.getByText("Photographer")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Stylist")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailFashionEditorial className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailFashionEditorial backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("preserves the flexible back action contract and media boundaries", () => {
    const { container, rerender } = render(
      <ProjectDetailFashionEditorial
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
      <ProjectDetailFashionEditorial
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
      rerender(<ProjectDetailFashionEditorial backAction={backAction} />);
      action = container.querySelector(
        `a[href="${backAction.href}"]`,
      ) as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <ProjectDetailFashionEditorial
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
      <ProjectDetailFashionEditorial
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

    rerender(<ProjectDetailFashionEditorial heroImage={heroImage} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.getByAltText("Boundary hero")).toBeInTheDocument();
  });
});
