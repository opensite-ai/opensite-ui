import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureTabbedContentImage } from "../feature-tabbed-content-image";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureTabbedContentImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureTabbedContentImage title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureTabbedContentImage title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureTabbedContentImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders slides when provided", () => {
    const slides = [
      { id: 1, tabName: "Tab One", title: "Slide One Title" },
      { id: 2, tabName: "Tab Two", title: "Slide Two Title" },
    ];
    render(<FeatureTabbedContentImage slides={slides} />);
    expect(screen.getByText("Tab One")).toBeInTheDocument();
    expect(screen.getByText("Tab Two")).toBeInTheDocument();
  });

  it("uses nullish checklist icon resolution inside the persistent wrapper", () => {
    const { container } = render(
      <FeatureTabbedContentImage
        slides={[
          {
            id: 1,
            tabName: "Icons",
            features: [
              "String default",
              { content: "Object default" },
              {
                content: "Raw icon",
                icon: "lucide/sparkles",
                iconName: "lucide/ignored",
              },
              { content: "Named icon", iconName: "lucide/gem" },
              {
                content: "Empty icon",
                icon: "",
                iconName: "lucide/ignored-empty",
              },
              {
                content: "False icon",
                icon: false,
                iconName: "lucide/ignored-false",
              },
              {
                content: "Zero icon",
                icon: 0,
                iconName: "lucide/ignored-zero",
              },
              {
                content: "Custom icon",
                icon: <span data-testid="custom-feature-icon">custom</span>,
                iconName: "lucide/ignored-custom",
              },
              {
                content: "Null named icon",
                icon: null,
                iconName: "lucide/null-fallback",
              },
            ],
          },
        ]}
      />,
    );

    const wrapperFor = (content: string) =>
      screen.getByText(content).closest("li")?.firstElementChild as HTMLElement;

    for (const content of ["String default", "Object default"]) {
      const icon = within(wrapperFor(content)).getByTestId("mock-icon");
      expect(icon).toHaveAttribute("data-name", "lucide/check-circle-2");
      expect(icon).toHaveAttribute("data-size", "16");
    }

    const rawWrapper = wrapperFor("Raw icon");
    expect(within(rawWrapper).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/sparkles",
    );
    expect(within(rawWrapper).queryByText("lucide/sparkles")).not.toBeInTheDocument();
    expect(within(wrapperFor("Named icon")).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/gem",
    );
    expect(
      within(wrapperFor("Null named icon")).getByTestId("mock-icon"),
    ).toHaveAttribute("data-name", "lucide/null-fallback");

    for (const content of ["Empty icon", "False icon"]) {
      const wrapper = wrapperFor(content);
      expect(wrapper).toHaveClass("mt-1.5");
      expect(wrapper).toBeEmptyDOMElement();
    }

    const zeroWrapper = wrapperFor("Zero icon");
    expect(zeroWrapper).toHaveClass("mt-1.5");
    expect(zeroWrapper).toHaveTextContent("0");
    expect(within(zeroWrapper).queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(
      within(wrapperFor("Custom icon")).getByTestId("custom-feature-icon"),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();
  });

  it("routes both action icon positions through DynamicIcon", () => {
    const { container } = render(
      <FeatureTabbedContentImage
        slides={[
          {
            id: 1,
            tabName: "Actions",
            actions: [
              {
                label: "Raw action",
                href: "/raw",
                icon: "lucide/arrow-left",
                iconAfter: "lucide/arrow-right",
              },
              {
                label: "Custom action",
                href: "/custom",
                icon: <span data-testid="custom-before">before</span>,
                iconAfter: <span data-testid="custom-after">after</span>,
              },
            ],
          },
        ]}
      />,
    );

    const rawAction = container.querySelector('a[href="/raw"]') as HTMLElement;
    expect(
      within(rawAction)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(within(rawAction).queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(within(rawAction).queryByText("lucide/arrow-right")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-before")).toBeInTheDocument();
    expect(screen.getByTestId("custom-after")).toBeInTheDocument();
  });

  it("preserves strict icon guards and truthy children behavior for actions", () => {
    const { container } = render(
      <FeatureTabbedContentImage
        slides={[
          {
            id: 1,
            tabName: "Action boundaries",
            actions: [
              { label: "Empty", href: "/empty", icon: "", iconAfter: "" },
              { label: "Boundary", href: "/boundary", icon: false, iconAfter: 0 },
              {
                label: "Hidden",
                href: "/truthy-child",
                icon: "lucide/hidden",
                children: <span>Custom children</span>,
              },
              {
                label: "Zero children",
                href: "/zero-child",
                icon: "lucide/zero-child",
                children: 0,
              },
              {
                label: "False children",
                href: "/false-child",
                icon: "lucide/false-child",
                children: false,
              },
              {
                label: "Empty children",
                href: "/empty-child",
                icon: "lucide/empty-child",
                children: "",
              },
            ],
          },
        ]}
      />,
    );

    expect(container.querySelector('a[href="/empty"]')).toHaveTextContent("Empty");
    expect(container.querySelector('a[href="/boundary"]')).toHaveTextContent(
      "Boundary0",
    );
    expect(screen.getByText("Custom children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/hidden"]'),
    ).not.toBeInTheDocument();

    for (const [href, label, iconName] of [
      ["/zero-child", "Zero children", "lucide/zero-child"],
      ["/false-child", "False children", "lucide/false-child"],
      ["/empty-child", "Empty children", "lucide/empty-child"],
    ]) {
      const action = container.querySelector(`a[href="${href}"]`) as HTMLElement;
      expect(within(action).getByText(label)).toBeInTheDocument();
      expect(within(action).getByTestId("mock-icon")).toHaveAttribute(
        "data-name",
        iconName,
      );
    }
  });

  it("preserves truthy feature, action, image, and slide slot precedence", () => {
    const slide = {
      id: 1,
      tabName: "Slot tab",
      features: ["Array feature"],
      actions: [{ label: "Array action", href: "/array" }],
      image: "lucide/image-looking-url",
      imageAlt: "Image boundary",
    };
    const { container, rerender } = render(
      <FeatureTabbedContentImage
        slides={[
          {
            ...slide,
            featuresSlot: false,
            actionsSlot: false,
            imageSlot: false,
          },
        ]}
        slidesSlot={false}
      />,
    );
    expect(screen.getByText("Array feature")).toBeInTheDocument();
    expect(screen.getByText("Array action")).toBeInTheDocument();
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "lucide/image-looking-url",
    );
    expect(
      container.querySelector('[data-name="lucide/image-looking-url"]'),
    ).not.toBeInTheDocument();

    rerender(
      <FeatureTabbedContentImage
        slides={[
          {
            ...slide,
            featuresSlot: <li>Custom features slot</li>,
            actionsSlot: <div>Custom actions slot</div>,
            imageSlot: <div>Custom image slot</div>,
          },
        ]}
      />,
    );
    expect(screen.getByText("Custom features slot")).toBeInTheDocument();
    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.getByText("Custom image slot")).toBeInTheDocument();
    expect(screen.queryByText("Array feature")).not.toBeInTheDocument();
    expect(screen.queryByText("Array action")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();

    rerender(
      <FeatureTabbedContentImage
        slides={[slide]}
        slidesSlot={<div>Custom slides slot</div>}
      />,
    );
    expect(screen.getByText("Custom slides slot")).toBeInTheDocument();
    expect(screen.queryByText("Slot tab")).not.toBeInTheDocument();
  });

  it("honors an explicit default tab", () => {
    render(
      <FeatureTabbedContentImage
        defaultTab="2"
        slides={[
          { id: 1, tabName: "First tab", title: "First content" },
          { id: 2, tabName: "Second tab", title: "Second content" },
        ]}
      />,
    );

    expect(screen.getByText("Second content")).toBeInTheDocument();
    expect(screen.queryByText("First content")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureTabbedContentImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
