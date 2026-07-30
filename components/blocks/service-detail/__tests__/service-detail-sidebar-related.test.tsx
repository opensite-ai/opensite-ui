import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailSidebarRelated } from "../service-detail-sidebar-related";

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

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
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

describe("ServiceDetailSidebarRelated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    render(<ServiceDetailSidebarRelated title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders sidebar stats", () => {
    render(
      <ServiceDetailSidebarRelated
        stats={[
          {
            icon: "/icon.svg",
            title: "Figma",
            description: "Expert",
          },
        ]}
      />
    );
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Expert")).toBeInTheDocument();
  });

  it("routes flexible icon overrides while preserving image and slot boundaries", () => {
    const { container, rerender } = render(
      <ServiceDetailSidebarRelated
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot="lucide/main-slot"
        stats={[
          {
            title: "String stat",
            icon: "lucide/stat-media",
            iconSlot: "lucide/stat-slot",
          },
        ]}
        relatedServices={[
          {
            title: "String related service",
            icon: "lucide/service-override",
            iconName: "lucide/service-fallback",
          },
        ]}
      />,
    );

    const mainIcon = container.querySelector(
      '[data-name="lucide/main-slot"]',
    ) as HTMLElement;
    const statIcon = container.querySelector(
      '[data-name="lucide/stat-slot"]',
    ) as HTMLElement;
    const serviceIcon = container.querySelector(
      '[data-name="lucide/service-override"]',
    ) as HTMLElement;
    expect(mainIcon).toBeInTheDocument();
    expect(mainIcon).not.toHaveAttribute("data-size");
    expect(statIcon).toBeInTheDocument();
    expect(statIcon).not.toHaveAttribute("data-size");
    expect(serviceIcon).toHaveAttribute("data-size", "16");
    expect(serviceIcon).toHaveClass(
      "text-muted-foreground",
      "group-hover:text-primary",
    );
    expect(container).not.toHaveTextContent("lucide/main-slot");
    expect(container).not.toHaveTextContent("lucide/stat-slot");
    expect(container).not.toHaveTextContent("lucide/service-override");
    expect(
      container.querySelector('img[src="lucide/main-media"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[src="lucide/stat-media"]'),
    ).not.toBeInTheDocument();

    rerender(
      <ServiceDetailSidebarRelated
        serviceIconSlot={<span data-testid="custom-main-icon" />}
        stats={[
          {
            title: "Custom stat",
            iconSlot: <span data-testid="custom-stat-icon" />,
          },
        ]}
        relatedServices={[
          {
            title: "Custom related service",
            icon: <span data-testid="custom-service-icon" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-main-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-stat-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-service-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <ServiceDetailSidebarRelated
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot=""
        stats={[
          {
            title: "Fallback stat",
            icon: "lucide/stat-media",
            iconSlot: false,
          },
        ]}
        relatedServices={[
          {
            title: "Fallback related service",
            icon: 0,
            iconName: "lucide/service-fallback",
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
      <ServiceDetailSidebarRelated
        stats={[{ title: "Generated stat" }]}
        statsSlot={<div data-testid="stats-slot">Custom stats</div>}
        relatedServices={[{ title: "Generated related service" }]}
        relatedServicesSlot={
          <div data-testid="related-services-slot">Custom services</div>
        }
      />,
    );
    expect(screen.getByTestId("stats-slot")).toBeInTheDocument();
    expect(screen.getByTestId("related-services-slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated stat")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Generated related service"),
    ).not.toBeInTheDocument();
  });
});
