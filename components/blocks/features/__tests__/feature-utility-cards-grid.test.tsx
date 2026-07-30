import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureUtilityCardsGrid } from "../feature-utility-cards-grid";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
    "aria-label": ariaLabel,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
    "aria-label"?: string;
  }) => (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-testid="mock-pressable"
    >
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode | string;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("FeatureUtilityCardsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureUtilityCardsGrid label="Test Label" title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<FeatureUtilityCardsGrid label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureUtilityCardsGrid title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureUtilityCardsGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("routes label icons through DynamicIcon with truthy fallback semantics", () => {
    const { container, rerender } = render(
      <FeatureUtilityCardsGrid
        background="primary"
        label="Raw label"
        labelIcon="lucide/badge-check"
        labelIconName="lucide/ignored"
      />,
    );

    let icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/badge-check");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon).toHaveClass("text-accent-foreground");
    expect(screen.queryByText("lucide/badge-check")).not.toBeInTheDocument();

    for (const [labelIcon, iconName] of [
      ["", "lucide/empty"],
      [false, "lucide/false"],
      [0, "lucide/zero"],
    ] as const) {
      rerender(
        <FeatureUtilityCardsGrid
          label="Fallback label"
          labelIcon={labelIcon}
          labelIconName={iconName}
        />,
      );
      icon = screen.getByTestId("mock-icon");
      expect(icon).toHaveAttribute("data-name", iconName);
      expect(icon).toHaveAttribute("data-size", "20");
    }

    rerender(
      <FeatureUtilityCardsGrid
        label="Custom label"
        labelIcon={<span data-testid="custom-label-icon">custom</span>}
        labelIconName="lucide/ignored-custom"
      />,
    );
    expect(screen.getByTestId("custom-label-icon")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const labelIcon of ["", false, 0] as const) {
      rerender(<FeatureUtilityCardsGrid labelIcon={labelIcon} />);
      expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
      expect(container.querySelector(".text-lg.flex")).not.toBeInTheDocument();
    }
  });

  it("routes both learn-more action icon positions without rendering raw names", () => {
    render(
      <FeatureUtilityCardsGrid
        learnMoreAction={{
          label: "Explore",
          href: "/explore",
          icon: "lucide/arrow-left",
          iconAfter: "lucide/arrow-right",
        }}
      />,
    );

    const action = screen.getByTestId("mock-pressable");
    expect(within(action).getByText("Explore")).toBeInTheDocument();
    expect(within(action).queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(within(action).queryByText("lucide/arrow-right")).not.toBeInTheDocument();
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
  });

  it("preserves custom, empty, false, and zero learn-more icons", () => {
    const { rerender } = render(
      <FeatureUtilityCardsGrid
        learnMoreAction={{
          label: "Custom",
          icon: <span data-testid="custom-before">before</span>,
          iconAfter: <span data-testid="custom-after">after</span>,
        }}
      />,
    );
    expect(screen.getByTestId("custom-before")).toBeInTheDocument();
    expect(screen.getByTestId("custom-after")).toBeInTheDocument();

    rerender(
      <FeatureUtilityCardsGrid
        learnMoreAction={{ label: "Empty", icon: "", iconAfter: "" }}
      />,
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-pressable")).toHaveTextContent("Empty");

    rerender(
      <FeatureUtilityCardsGrid
        learnMoreAction={{ label: "Boundary", icon: false, iconAfter: 0 }}
      />,
    );
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-pressable")).toHaveTextContent("Boundary0");
  });

  it("uses truthy children and slot precedence for learn-more content", () => {
    const generatedAction = {
      label: "Generated",
      href: "/generated",
      icon: "lucide/generated",
    };
    const { rerender } = render(
      <FeatureUtilityCardsGrid
        learnMoreAction={{
          ...generatedAction,
          children: <span>Custom children</span>,
        }}
      />,
    );
    expect(screen.getByText("Custom children")).toBeInTheDocument();
    expect(screen.queryByText("Generated")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    for (const children of ["", false, 0] as const) {
      rerender(
        <FeatureUtilityCardsGrid
          learnMoreAction={{ ...generatedAction, children }}
          learnMoreSlot={false}
        />,
      );
      expect(screen.getByText("Generated")).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toHaveAttribute(
        "data-name",
        "lucide/generated",
      );
    }

    rerender(
      <FeatureUtilityCardsGrid
        learnMoreAction={generatedAction}
        learnMoreSlot={<div>Custom learn-more slot</div>}
      />,
    );
    expect(screen.getByText("Custom learn-more slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps utility images in Img and honors truthy image slots", () => {
    const utilities = [
      {
        title: "Image utility",
        image: "lucide/image-looking-url",
        imageAlt: "Utility preview",
      },
    ];
    const { container, rerender } = render(
      <FeatureUtilityCardsGrid utilities={utilities} />,
    );
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "lucide/image-looking-url",
    );
    expect(screen.getByTestId("mock-img")).toHaveAttribute("alt", "Utility preview");
    expect(
      container.querySelector('[data-name="lucide/image-looking-url"]'),
    ).not.toBeInTheDocument();

    rerender(
      <FeatureUtilityCardsGrid
        utilities={[
          {
            ...utilities[0],
            imageSlot: <div>Custom image slot</div>,
          },
        ]}
      />,
    );
    expect(screen.getByText("Custom image slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureUtilityCardsGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
