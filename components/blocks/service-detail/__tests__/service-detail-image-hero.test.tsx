import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailImageHero } from "../service-detail-image-hero";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServiceDetailImageHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ServiceDetailImageHero />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ServiceDetailImageHero className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders the title", () => {
    render(<ServiceDetailImageHero title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(
      <ServiceDetailImageHero
        heroImage={{ src: "/test-image.jpg", alt: "Test hero image" }}
      />
    );
    const img = screen.getAllByTestId("mock-img")[0];
    expect(img).toBeInTheDocument();
  });

  it("renders the intro title and description", () => {
    render(
      <ServiceDetailImageHero
        introTitle="Custom Intro Title"
        introDescription="Custom intro description text"
      />
    );
    expect(screen.getByText("Custom Intro Title")).toBeInTheDocument();
    expect(screen.getByText("Custom intro description text")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(
      <ServiceDetailImageHero
        contentSections={[
          {
            title: "Section Title",
            paragraphs: ["First paragraph", "Second paragraph"],
          },
        ]}
      />
    );
    expect(screen.getByText("Section Title")).toBeInTheDocument();
    expect(screen.getByText("First paragraph")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph")).toBeInTheDocument();
  });

  it("renders services list", () => {
    render(
      <ServiceDetailImageHero
        servicesList={{
          title: "Our Services",
          items: ["Service 1", "Service 2"],
        }}
      />
    );
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("Service 2")).toBeInTheDocument();
  });
});
