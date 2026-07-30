import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProjectDetailCompactMetadata } from "../project-detail-compact-metadata";

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

describe("ProjectDetailCompactMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailCompactMetadata title="Mobile App Redesign" />);
    expect(screen.getByText("Mobile App Redesign")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailCompactMetadata subtitle="A banking app experience" />);
    expect(screen.getByText("A banking app experience")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailCompactMetadata description="A complete redesign of the mobile banking experience" />);
    expect(screen.getByText("A complete redesign of the mobile banking experience")).toBeInTheDocument();
  });

  it("renders metadata details", () => {
    const metadata = [
      { label: "Client", value: "TechCorp" },
      { label: "Year", value: "2024" },
      { label: "Role", value: "Lead Designer" },
    ];
    render(<ProjectDetailCompactMetadata metadata={metadata} />);
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Client")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("Lead Designer")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailCompactMetadata className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailCompactMetadata backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("preserves the flexible back action contract and media boundaries", () => {
    const { container, rerender } = render(
      <ProjectDetailCompactMetadata
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
      <ProjectDetailCompactMetadata
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
      rerender(<ProjectDetailCompactMetadata backAction={backAction} />);
      action = container.querySelector(
        `a[href="${backAction.href}"]`,
      ) as HTMLElement;
      expect(action).toHaveTextContent(expectedText);
      expect(within(action).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    rerender(
      <ProjectDetailCompactMetadata
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
      <ProjectDetailCompactMetadata
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

    rerender(<ProjectDetailCompactMetadata heroImage={heroImage} />);
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
    expect(screen.getByAltText("Boundary hero")).toBeInTheDocument();
  });
});
