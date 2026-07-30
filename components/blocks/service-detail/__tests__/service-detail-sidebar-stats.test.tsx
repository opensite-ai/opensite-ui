import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailSidebarStats } from "../service-detail-sidebar-stats";

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

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    ux: "https://placeholder.com/ux.svg",
    integration1: "https://placeholder.com/integration1.svg",
    integration2: "https://placeholder.com/integration2.svg",
    integration3: "https://placeholder.com/integration3.svg",
  },
}));

describe("ServiceDetailSidebarStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    render(<ServiceDetailSidebarStats title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders services with icons", () => {
    render(
      <ServiceDetailSidebarStats
        services={[
          { iconName: "lucide/users", title: "User research" },
          { iconName: "lucide/map", title: "Journey mapping" },
        ]}
      />
    );
    expect(screen.getByText("User research")).toBeInTheDocument();
    expect(screen.getByText("Journey mapping")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-icon").length).toBeGreaterThan(0);
  });

  it("renders sidebar stats", () => {
    render(
      <ServiceDetailSidebarStats
        stats={[
          {
            icon: "/icon.svg",
            title: "Figma",
            description: "5+ years",
          },
        ]}
      />
    );
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("5+ years")).toBeInTheDocument();
  });

  it("routes flexible icon overrides while preserving image and slot boundaries", () => {
    const { container, rerender } = render(
      <ServiceDetailSidebarStats
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot="lucide/main-slot"
        services={[
          {
            title: "String service",
            icon: "lucide/service-override",
            iconName: "lucide/service-fallback",
          },
        ]}
        stats={[
          {
            title: "String stat",
            icon: "lucide/stat-media",
            iconSlot: "lucide/stat-slot",
          },
        ]}
      />,
    );

    const mainIcon = container.querySelector(
      '[data-name="lucide/main-slot"]',
    ) as HTMLElement;
    const serviceIcon = container.querySelector(
      '[data-name="lucide/service-override"]',
    ) as HTMLElement;
    const statIcon = container.querySelector(
      '[data-name="lucide/stat-slot"]',
    ) as HTMLElement;
    expect(mainIcon).toBeInTheDocument();
    expect(mainIcon).not.toHaveAttribute("data-size");
    expect(serviceIcon).toHaveAttribute("data-size", "20");
    expect(serviceIcon).toHaveClass("text-primary");
    expect(statIcon).toBeInTheDocument();
    expect(statIcon).not.toHaveAttribute("data-size");
    expect(container).not.toHaveTextContent("lucide/main-slot");
    expect(container).not.toHaveTextContent("lucide/service-override");
    expect(container).not.toHaveTextContent("lucide/stat-slot");
    expect(
      container.querySelector('img[src="lucide/main-media"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[src="lucide/stat-media"]'),
    ).not.toBeInTheDocument();

    rerender(
      <ServiceDetailSidebarStats
        serviceIconSlot={<span data-testid="custom-main-icon" />}
        services={[
          {
            title: "Custom service",
            icon: <span data-testid="custom-service-icon" />,
          },
        ]}
        stats={[
          {
            title: "Custom stat",
            iconSlot: <span data-testid="custom-stat-icon" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-main-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-service-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-stat-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <ServiceDetailSidebarStats
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot=""
        services={[
          {
            title: "Fallback service",
            icon: 0,
            iconName: "lucide/service-fallback",
          },
        ]}
        stats={[
          {
            title: "Fallback stat",
            icon: "lucide/stat-media",
            iconSlot: false,
          },
        ]}
      />,
    );
    expect(
      screen.getAllByTestId("mock-img").map((image) => image.getAttribute("src")),
    ).toEqual(["lucide/main-media", "lucide/stat-media"]);
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/service-fallback",
    );
    expect(container).not.toHaveTextContent("lucide/main-media");
    expect(container).not.toHaveTextContent("lucide/stat-media");
    expect(container).not.toHaveTextContent("lucide/service-fallback");

    rerender(
      <ServiceDetailSidebarStats
        services={[{ title: "Generated service" }]}
        servicesSlot={<div data-testid="services-slot">Custom services</div>}
        stats={[{ title: "Generated stat" }]}
        statsSlot={<div data-testid="stats-slot">Custom stats</div>}
      />,
    );
    expect(screen.getByTestId("services-slot")).toBeInTheDocument();
    expect(screen.getByTestId("stats-slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated service")).not.toBeInTheDocument();
    expect(screen.queryByText("Generated stat")).not.toBeInTheDocument();
  });
});
