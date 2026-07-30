import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaWorkflowTabs } from "../cta-workflow-tabs";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaWorkflowTabs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaWorkflowTabs heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaWorkflowTabs heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaWorkflowTabs description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/about", variant: "outline" as const },
    ];
    render(<CtaWorkflowTabs actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders tabs when provided", () => {
    const tabs = [
      { id: "design", label: "Design", iconName: "lucide/palette", heading: "Design Tab", description: "Design description" },
      { id: "develop", label: "Develop", iconName: "lucide/code", heading: "Develop Tab", description: "Develop description" },
    ];
    render(<CtaWorkflowTabs tabs={tabs} />);
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
    expect(screen.getByText("Design Tab")).toBeInTheDocument();
  });

  it("routes action, tab, and stat icon names through DynamicIcon", () => {
    const { container } = render(
      <CtaWorkflowTabs
        actions={[
          {
            label: "Get Started",
            href: "/icon-action",
            icon: "lucide/rocket",
            iconAfter: "lucide/send",
          },
        ]}
        tabs={[
          {
            id: "design",
            label: "Design",
            icon: "lucide/tab-override",
            iconName: "lucide/legacy-tab",
            heading: "Design Tab",
            image: "/workflow.jpg",
            stats: [
              {
                value: "100",
                label: "Users",
                icon: "lucide/users",
              },
            ],
          },
          {
            id: "fallback",
            label: "Fallback",
            iconName: "lucide/tab-fallback",
          },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual([
      "lucide/rocket",
      "lucide/send",
      "lucide/tab-override",
      "lucide/tab-fallback",
      "lucide/users",
    ]);
    const action = container.querySelector('a[href="/icon-action"]');
    expect(action).not.toHaveTextContent("lucide/rocket");
    expect(action).not.toHaveTextContent("lucide/send");
    const overrideTab = screen.getByText("Design").closest("button");
    expect(overrideTab).not.toHaveTextContent("lucide/tab-override");
    const fallbackTab = screen.getByText("Fallback").closest("button");
    expect(fallbackTab).not.toHaveTextContent("lucide/tab-fallback");
    expect(
      container.querySelector('[data-name="lucide/tab-override"]'),
    ).toHaveAttribute("data-size", "16");
    expect(
      container.querySelector('[data-name="lucide/tab-fallback"]'),
    ).toHaveAttribute("data-size", "16");
    expect(
      container.querySelector('[data-name="lucide/users"]')?.parentElement,
    ).toHaveClass("mb-1");
    expect(
      container.querySelector('[data-name="lucide/users"]')?.parentElement,
    ).not.toHaveTextContent("lucide/users");
    expect(screen.getByAltText("Design Tab")).toHaveAttribute(
      "src",
      "/workflow.jpg",
    );
  });

  it("preserves custom action, tab, and stat icon elements", () => {
    render(
      <CtaWorkflowTabs
        actions={[
          {
            label: "Custom Action",
            icon: <span data-testid="custom-action-leading">leading</span>,
            iconAfter: <span data-testid="custom-action-trailing">trailing</span>,
          },
        ]}
        tabs={[
          {
            id: "custom",
            label: "Custom Tab",
            icon: <span data-testid="custom-tab-icon">tab</span>,
            iconName: "lucide/legacy-tab",
            stats: [
              {
                value: "100",
                icon: <span data-testid="custom-stat-icon">stat</span>,
              },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-action-leading")).toHaveTextContent(
      "leading",
    );
    expect(screen.getByTestId("custom-action-trailing")).toHaveTextContent(
      "trailing",
    );
    expect(screen.getByTestId("custom-tab-icon")).toHaveTextContent("tab");
    expect(screen.getByTestId("custom-stat-icon")).toHaveTextContent("stat");
    expect(screen.getByText("Custom Tab").closest("button")).not.toHaveTextContent(
      "lucide/legacy-tab",
    );
  });

  it("preserves action edge values, the first-arrow fallback, and children", () => {
    const { container, rerender } = render(
      <CtaWorkflowTabs
        actions={[
          {
            label: "Empty Icons",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Falsy Icons",
            href: "/falsy",
            icon: false,
            iconAfter: 0,
          },
        ]}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(container.querySelector('a[href="/empty"]')).toHaveTextContent(
      "Empty Icons",
    );
    expect(container.querySelector('a[href="/falsy"]')).toHaveTextContent(
      "Falsy Icons0",
    );

    rerender(
      <CtaWorkflowTabs
        actions={[{ label: "Default Arrow", href: "/default" }]}
      />,
    );
    const fallback = screen.getByTestId("mock-icon");
    expect(fallback).toHaveAttribute("data-name", "lucide/arrow-right");
    expect(fallback).toHaveAttribute("data-size", "16");
    expect(fallback).toHaveClass("ml-2");

    rerender(
      <CtaWorkflowTabs
        actions={[
          {
            label: "Generated Label",
            href: "/children",
            icon: "lucide/rocket",
            children: (
              <span data-testid="custom-action-content">Custom Action</span>
            ),
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-action-content")).toHaveTextContent(
      "Custom Action",
    );
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/children"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    const childrenAction = container.querySelector('a[href="/children"]');
    expect(childrenAction).not.toHaveTextContent("lucide/rocket");
    expect(childrenAction).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves tab nullish precedence and stat wrapper truthiness", () => {
    const { container } = render(
      <CtaWorkflowTabs
        tabs={[
          {
            id: "empty",
            label: "Empty Tab",
            icon: "",
            iconName: "lucide/legacy-empty",
            stats: [
              { value: "Empty Stat", icon: "" },
              { value: "False Stat", icon: false },
              { value: "Zero Stat", icon: 0 },
            ],
          },
          {
            id: "false",
            label: "False Tab",
            icon: false,
            iconName: "lucide/legacy-false",
          },
          {
            id: "zero",
            label: "Zero Tab",
            icon: 0,
            iconName: "lucide/legacy-zero",
          },
          {
            id: "legacy-empty",
            label: "Legacy Empty",
            iconName: "",
          },
        ]}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(container).toHaveTextContent("0Zero Tab");
    expect(container).toHaveTextContent("0Zero Stat");
    expect(container.querySelectorAll(".mb-1")).toHaveLength(0);
    expect(screen.getByText("Empty Tab").closest("button")).not.toHaveTextContent(
      "lucide/legacy-empty",
    );
    expect(screen.getByText("False Tab").closest("button")).not.toHaveTextContent(
      "lucide/legacy-false",
    );
    expect(
      screen.getByRole("button", { name: "0Zero Tab" }),
    ).not.toHaveTextContent("lucide/legacy-zero");
  });

  it("preserves action and tab slot overrides", () => {
    render(
      <CtaWorkflowTabs
        actions={[{ label: "Generated Action" }]}
        actionsSlot={<span>Custom Actions</span>}
        tabs={[{ id: "generated", label: "Generated Tab" }]}
        tabsSlot={<span>Custom Tabs</span>}
      />,
    );

    expect(screen.getByText("Custom Actions")).toBeInTheDocument();
    expect(screen.getByText("Custom Tabs")).toBeInTheDocument();
    expect(screen.queryByText("Generated Action")).not.toBeInTheDocument();
    expect(screen.queryByText("Generated Tab")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaWorkflowTabs className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
