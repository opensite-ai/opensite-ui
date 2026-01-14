import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailStatsHero } from "../service-detail-stats-hero";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
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
});
