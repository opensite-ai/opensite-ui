import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailCompactCards } from "../service-detail-compact-cards";

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

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServiceDetailCompactCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    render(<ServiceDetailCompactCards title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders services with icons", () => {
    render(
      <ServiceDetailCompactCards
        services={[
          { icon: "lucide/users", title: "User research" },
          { icon: "lucide/map", title: "Journey mapping" },
        ]}
      />
    );
    expect(screen.getByText("User research")).toBeInTheDocument();
    expect(screen.getByText("Journey mapping")).toBeInTheDocument();
  });

  it("routes flexible icon overrides while preserving image and slot boundaries", () => {
    const { container, rerender } = render(
      <ServiceDetailCompactCards
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot="lucide/main-slot"
        expertise={[
          {
            title: "String expertise",
            icon: "lucide/expertise-media",
            iconSlot: "lucide/expertise-slot",
          },
        ]}
        services={[
          {
            title: "String service",
            icon: "lucide/service-override",
            iconName: "lucide/service-fallback",
          },
        ]}
      />,
    );

    const stringIcons = screen.getAllByTestId("mock-icon");
    expect(stringIcons.map((icon) => icon.getAttribute("data-name"))).toEqual([
      "lucide/main-slot",
      "lucide/expertise-slot",
      "lucide/service-override",
    ]);
    expect(stringIcons[0]).not.toHaveAttribute("data-size");
    expect(stringIcons[1]).not.toHaveAttribute("data-size");
    expect(stringIcons[2]).toHaveAttribute("data-size", "20");
    expect(stringIcons[2]).toHaveClass("shrink-0", "text-primary");
    expect(container).not.toHaveTextContent("lucide/main-slot");
    expect(container).not.toHaveTextContent("lucide/expertise-slot");
    expect(container).not.toHaveTextContent("lucide/service-override");
    expect(
      container.querySelector('img[src="lucide/main-media"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[src="lucide/expertise-media"]'),
    ).not.toBeInTheDocument();

    rerender(
      <ServiceDetailCompactCards
        serviceIconSlot={<span data-testid="custom-main-icon" />}
        expertise={[
          {
            title: "Custom expertise",
            iconSlot: <span data-testid="custom-expertise-icon" />,
          },
        ]}
        services={[
          {
            title: "Custom service",
            icon: <span data-testid="custom-service-icon" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-main-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-expertise-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-service-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <ServiceDetailCompactCards
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot=""
        expertise={[
          {
            title: "Fallback expertise",
            icon: "lucide/expertise-media",
            iconSlot: false,
          },
        ]}
        services={[
          {
            title: "Fallback service",
            icon: 0,
            iconName: "lucide/service-fallback",
          },
        ]}
      />,
    );
    expect(
      screen.getAllByTestId("mock-img").map((image) => image.getAttribute("src")),
    ).toEqual(["lucide/main-media", "lucide/expertise-media"]);
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/service-fallback",
    );
    expect(container).not.toHaveTextContent("lucide/main-media");
    expect(container).not.toHaveTextContent("lucide/expertise-media");
    expect(container).not.toHaveTextContent("lucide/service-fallback");

    rerender(
      <ServiceDetailCompactCards
        expertise={[{ title: "Generated expertise" }]}
        expertiseSlot={<div data-testid="expertise-slot">Custom expertise</div>}
        services={[{ title: "Generated service" }]}
        servicesSlot={<div data-testid="services-slot">Custom services</div>}
      />,
    );
    expect(screen.getByTestId("expertise-slot")).toBeInTheDocument();
    expect(screen.getByTestId("services-slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated expertise")).not.toBeInTheDocument();
    expect(screen.queryByText("Generated service")).not.toBeInTheDocument();
  });
});
