import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailStatsHero } from "../service-detail-stats-hero";

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

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    ux: "https://placeholder.com/ux.svg",
    integration1: "https://placeholder.com/integration1.svg",
    integration2: "https://placeholder.com/integration2.svg",
    integration3: "https://placeholder.com/integration3.svg",
  },
}));

describe("ServiceDetailStatsHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    render(<ServiceDetailStatsHero title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders stats section", () => {
    render(
      <ServiceDetailStatsHero
        stats={[
          {
            icon: "/icon.svg",
            title: "Adobe Suite",
            value: "100%",
            description: "Proficiency",
          },
        ]}
      />
    );
    expect(screen.getByText("Adobe Suite")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Proficiency")).toBeInTheDocument();
  });

  it("routes flexible icon slots while preserving image and section slots", () => {
    const { container, rerender } = render(
      <ServiceDetailStatsHero
        heroImage={{ src: "lucide/hero-media", alt: "Hero media" }}
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot="lucide/main-slot"
        stats={[
          {
            title: "String stat",
            value: "10",
            icon: "lucide/stat-media",
            iconSlot: "lucide/stat-slot",
          },
        ]}
      />,
    );

    const stringIcons = screen.getAllByTestId("mock-icon");
    expect(stringIcons.map((icon) => icon.getAttribute("data-name"))).toEqual([
      "lucide/main-slot",
      "lucide/stat-slot",
    ]);
    expect(stringIcons[0]).not.toHaveAttribute("data-size");
    expect(stringIcons[1]).not.toHaveAttribute("data-size");
    expect(container).not.toHaveTextContent("lucide/main-slot");
    expect(container).not.toHaveTextContent("lucide/stat-slot");
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "lucide/hero-media",
    );
    expect(
      container.querySelector('[data-name="lucide/hero-media"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[src="lucide/main-media"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[src="lucide/stat-media"]'),
    ).not.toBeInTheDocument();

    rerender(
      <ServiceDetailStatsHero
        serviceIconSlot={<span data-testid="custom-main-icon" />}
        stats={[
          {
            title: "Custom stat",
            value: "20",
            iconSlot: <span data-testid="custom-stat-icon" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-main-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-stat-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <ServiceDetailStatsHero
        serviceIcon={{ src: "lucide/main-media", alt: "Main media" }}
        serviceIconSlot=""
        stats={[
          {
            title: "False stat",
            value: "30",
            icon: "lucide/false-stat-media",
            iconSlot: false,
          },
          {
            title: "Zero stat",
            value: "40",
            icon: "lucide/zero-stat-media",
            iconSlot: 0,
          },
        ]}
      />,
    );
    expect(
      screen.getAllByTestId("mock-img").map((image) => image.getAttribute("src")),
    ).toEqual([
      "lucide/main-media",
      "lucide/false-stat-media",
      "lucide/zero-stat-media",
    ]);
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent("lucide/main-media");
    expect(container).not.toHaveTextContent("lucide/false-stat-media");
    expect(container).not.toHaveTextContent("lucide/zero-stat-media");

    rerender(
      <ServiceDetailStatsHero
        heroImage={{ src: "lucide/generated-hero", alt: "Generated hero" }}
        heroImageSlot={<div data-testid="hero-slot">Custom hero</div>}
        stats={[{ title: "Generated stat" }]}
        statsSlot={<div data-testid="stats-slot">Custom stats</div>}
      />,
    );
    expect(screen.getByTestId("hero-slot")).toBeInTheDocument();
    expect(screen.getByTestId("stats-slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated stat")).not.toBeInTheDocument();
    expect(
      container.querySelector('img[src="lucide/generated-hero"]'),
    ).not.toBeInTheDocument();
  });
});
