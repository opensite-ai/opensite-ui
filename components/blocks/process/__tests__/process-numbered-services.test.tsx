import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProcessNumberedServices } from "../process-numbered-services";

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
      />
    ) : (
      <>{name}</>
    ),
}));

describe("ProcessNumberedServices", () => {
  const mockServices = [
    {
      number: "01",
      title: "Consulting",
      description: "Strategic guidance for your business",
      capabilities: ["Strategy", "Planning"],
      action: { label: "Learn more", href: "/consulting" },
    },
    {
      number: "02",
      title: "Development",
      description: "Building robust solutions",
      capabilities: ["Web", "Mobile"],
      action: { label: "Learn more", href: "/development" },
    },
    {
      number: "03",
      title: "Support",
      description: "Ongoing maintenance and support",
      capabilities: ["24/7 Support", "Monitoring"],
      action: { label: "Learn more", href: "/support" },
    },
  ];

  it("renders title and description", () => {
    render(
      <ProcessNumberedServices
        heading="What We Offer"
        description="Our range of services"
      />
    );
    expect(screen.getByText("What We Offer")).toBeInTheDocument();
    expect(screen.getByText("Our range of services")).toBeInTheDocument();
  });

  it("renders all provided services", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(screen.getByText("Consulting")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(
      screen.getByText("Strategic guidance for your business")
    ).toBeInTheDocument();
    expect(screen.getByText("Building robust solutions")).toBeInTheDocument();
    expect(
      screen.getByText("Ongoing maintenance and support")
    ).toBeInTheDocument();
  });

  it("renders service numbers", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders capabilities", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("Planning")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("24/7 Support")).toBeInTheDocument();
    expect(screen.getByText("Monitoring")).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    const learnMoreLinks = screen.getAllByText("Learn more");
    expect(learnMoreLinks.length).toBe(3);
  });

  it("renders CTA links with correct hrefs", () => {
    render(<ProcessNumberedServices services={mockServices} />);
    const consultingLink = screen.getAllByText("Learn more")[0].closest("a");
    expect(consultingLink).toHaveAttribute("href", "/consulting");
  });

  it("routes action icon names and preserves asymmetric sentinel behavior", () => {
    const { container } = render(
      <ProcessNumberedServices
        services={[
          {
            number: "01",
            title: "String icons",
            action: {
              label: "String action",
              href: "/string",
              icon: "lucide/settings",
              iconAfter: "lucide/arrow-right",
            },
          },
          {
            number: "02",
            title: "Custom icons",
            action: {
              label: "Custom action",
              icon: <span data-testid="custom-leading-icon" />,
              iconAfter: <span data-testid="custom-trailing-icon" />,
            },
          },
          {
            number: "03",
            title: "Leading zero",
            action: {
              label: "Leading zero action",
              href: "/leading-zero",
              icon: 0,
              iconAfter: false,
            },
          },
          {
            number: "04",
            title: "Trailing zero",
            action: {
              label: "Trailing zero action",
              href: "/trailing-zero",
              iconAfter: 0,
            },
          },
          {
            number: "05",
            title: "Empty icons",
            action: {
              label: "Empty action",
              href: "/empty",
              icon: "",
              iconAfter: "",
            },
          },
        ]}
      />,
    );

    const stringAction = screen
      .getByText("String action")
      .closest("a") as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/settings", "lucide/arrow-right"]);
    expect(stringAction).not.toHaveTextContent("lucide/settings");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-right");
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    const leadingZero = container.querySelector(
      '[href="/leading-zero"]',
    ) as HTMLElement;
    expect(leadingZero).toHaveTextContent("0Leading zero action");
    expect(within(leadingZero).queryByTestId("mock-icon")).not.toBeInTheDocument();

    const trailingZero = container.querySelector(
      '[href="/trailing-zero"]',
    ) as HTMLElement;
    expect(trailingZero).toHaveTextContent("Trailing zero action0");
    expect(
      within(trailingZero).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(within(emptyAction).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves action children and per-service slot precedence", () => {
    const { container } = render(
      <ProcessNumberedServices
        services={[
          {
            number: "01",
            title: "Zero children",
            action: {
              label: "Hidden by zero",
              href: "/zero-children",
              icon: "lucide/hidden-zero",
              children: 0,
            },
          },
          {
            number: "02",
            title: "Truthy slot",
            action: {
              label: "Hidden by slot",
              icon: "lucide/hidden-slot",
            },
            actionSlot: <span data-testid="action-slot">Custom action</span>,
          },
          {
            number: "03",
            title: "Falsy slot",
            action: { label: "Falsy slot fallback" },
            actionSlot: false,
          },
        ]}
      />,
    );

    const zeroChildren = container.querySelector(
      '[href="/zero-children"]',
    ) as HTMLElement;
    expect(zeroChildren).toHaveTextContent("0");
    expect(zeroChildren).not.toHaveTextContent("Hidden by zero");
    expect(
      within(zeroChildren).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden by slot")).not.toBeInTheDocument();
    expect(screen.getByText("Falsy slot fallback")).toBeInTheDocument();
  });

  it("renders grid layout for services", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const serviceRows = container.querySelectorAll(".lg\\:grid-cols-12");
    expect(serviceRows.length).toBe(3);
  });

  it("renders with empty services array", () => {
    const { container } = render(<ProcessNumberedServices services={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders service number badges with hover effect", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const badges = container.querySelectorAll(".rounded-full.border-2.border-primary");
    expect(badges.length).toBe(3);
    badges.forEach((badge) => {
      expect(badge.className).toContain("group-hover:bg-primary");
    });
  });

  it("renders capabilities with check icons", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const capabilityItems = container.querySelectorAll(".rounded-lg.bg-muted");
    expect(capabilityItems.length).toBe(6);
  });

  it("renders services with border top", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const serviceRows = container.querySelectorAll(".border-t");
    expect(serviceRows.length).toBe(3);
  });

  it("renders services without CTA", () => {
    const servicesWithoutCta = [
      {
        number: "01",
        title: "Service 1",
        description: "Description 1",
      },
    ];
    render(<ProcessNumberedServices services={servicesWithoutCta} />);
    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.queryByText("Learn more")).not.toBeInTheDocument();
  });

  it("renders services without capabilities", () => {
    const servicesWithoutCapabilities = [
      {
        number: "01",
        title: "Service 1",
        description: "Description 1",
        action: { label: "Learn more", href: "/service" },
      },
    ];
    render(<ProcessNumberedServices services={servicesWithoutCapabilities} />);
    expect(screen.getByText("Service 1")).toBeInTheDocument();
  });

  it("renders capabilities grid with two columns on small screens", () => {
    const { container } = render(
      <ProcessNumberedServices services={mockServices} />
    );
    const capabilitiesGrid = container.querySelector(".sm\\:grid-cols-2");
    expect(capabilitiesGrid).toBeInTheDocument();
  });
});
