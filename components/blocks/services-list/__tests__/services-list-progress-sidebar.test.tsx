import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListProgressSidebar } from "../services-list-progress-sidebar";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

describe("ServicesListProgressSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit sidebar content", () => {
    render(
      <ServicesListProgressSidebar
        sidebarHeading="Our Creative Process"
        sidebarDescription="We follow a proven methodology"
      />
    );
    expect(screen.getByText("Our Creative Process")).toBeInTheDocument();
    expect(screen.getByText(/We follow a proven methodology/)).toBeInTheDocument();
  });

  it("renders custom sidebar heading", () => {
    render(<ServicesListProgressSidebar sidebarHeading="Our Methodology" />);
    expect(screen.getByText("Our Methodology")).toBeInTheDocument();
  });

  it("renders custom sidebar description", () => {
    render(<ServicesListProgressSidebar sidebarDescription="A step-by-step approach to success" />);
    expect(screen.getByText("A step-by-step approach to success")).toBeInTheDocument();
  });

  it("renders services with progress", () => {
    const services = [
      { title: "Discovery", description: "Understanding your needs", progress: 100, status: "Complete", iconName: "lucide/lightbulb" },
      { title: "Design", description: "Creating the solution", progress: 50, status: "In Progress", iconName: "lucide/palette" },
    ];
    render(<ServicesListProgressSidebar services={services} />);
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Complete")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders primary action button", () => {
    render(<ServicesListProgressSidebar primaryAction={{ label: "Start Your Project", href: "/start" }} />);
    expect(screen.getByText("Start Your Project")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(
      <ServicesListProgressSidebar
        className="custom-class"
        sidebarHeading="Test Heading"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("preserves custom icon precedence, fallbacks, sentinels, and wrappers", () => {
    const { container } = render(
      <ServicesListProgressSidebar
        iconClassName="service-icon-shell"
        services={[
          {
            title: "String icon",
            icon: "lucide/custom-progress",
            iconName: "lucide/ignored-progress",
            className: "string-service",
          },
          {
            title: "Custom icon",
            icon: <span data-testid="custom-service-icon">custom</span>,
            iconName: "lucide/ignored-custom",
            className: "custom-service",
          },
          {
            title: "Empty icon",
            icon: "",
            iconName: "lucide/empty-fallback",
            className: "empty-service",
          },
          {
            title: "False icon",
            icon: false,
            iconName: "lucide/false-fallback",
            className: "false-service",
          },
          {
            title: "Zero icon",
            icon: 0,
            iconName: "lucide/zero-fallback",
            className: "zero-service",
          },
          {
            title: "No icon",
            className: "no-icon-service",
          },
        ]}
      />,
    );

    const stringCard = container.querySelector(".string-service") as HTMLElement;
    const stringIcon = stringCard.querySelector(
      '[data-name="lucide/custom-progress"]',
    );
    expect(stringIcon).toHaveClass("h-6", "w-6");
    expect(
      stringCard.querySelector('[data-name="lucide/ignored-progress"]'),
    ).not.toBeInTheDocument();
    expect(
      within(stringCard).queryByText("lucide/custom-progress"),
    ).not.toBeInTheDocument();

    const customCard = container.querySelector(".custom-service") as HTMLElement;
    expect(
      within(customCard).getByTestId("custom-service-icon"),
    ).toBeInTheDocument();
    expect(
      customCard.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, iconName] of [
      [".empty-service", "lucide/empty-fallback"],
      [".false-service", "lucide/false-fallback"],
      [".zero-service", "lucide/zero-fallback"],
    ]) {
      const card = container.querySelector(selector) as HTMLElement;
      expect(card.querySelector(`[data-name="${iconName}"]`)).toHaveClass(
        "h-6",
        "w-6",
      );
    }

    const noIconCard = container.querySelector(
      ".no-icon-service",
    ) as HTMLElement;
    expect(noIconCard.querySelector(".service-icon-shell")).toBeInTheDocument();
    expect(
      within(noIconCard).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });

  it("preserves action and service slot truthiness and the fixed action icon", () => {
    const { container, rerender } = render(
      <ServicesListProgressSidebar
        primaryAction={{ label: "Start", href: "/start" }}
        actionsSlot={false}
        services={[{ title: "Generated service" }]}
        servicesSlot={false}
      />,
    );

    const action = container.querySelector('a[href="/start"]') as HTMLElement;
    expect(action).toHaveAttribute("data-testid", "mock-pressable");
    expect(
      action.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveClass("ml-2", "h-4", "w-4");
    expect(screen.getByText("Generated service")).toBeInTheDocument();

    rerender(
      <ServicesListProgressSidebar
        primaryAction={{ label: "Hidden action", href: "/hidden" }}
        actionsSlot={<div>Custom actions slot</div>}
        services={[{ title: "Hidden service" }]}
        servicesSlot={<div>Custom services slot</div>}
      />,
    );
    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.getByText("Custom services slot")).toBeInTheDocument();
    expect(container.querySelector('a[href="/hidden"]')).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden service")).not.toBeInTheDocument();
  });
});
