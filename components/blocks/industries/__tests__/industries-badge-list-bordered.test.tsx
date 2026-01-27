import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  IndustriesBadgeListBordered,
  type IndustryService,
} from "../industries-badge-list-bordered";

describe("IndustriesBadgeListBordered", () => {
  const mockServices: IndustryService[] = [
    {
      title: "E-Commerce",
      description:
        "End-to-end e-commerce solutions from storefront to fulfillment",
      imageSrc: "/ecommerce.jpg",
      imageAlt: "E-commerce solutions",
    },
    {
      title: "SaaS Platforms",
      description: "Scalable software-as-a-service application development",
      imageSrc: "/saas.jpg",
      imageAlt: "SaaS development",
    },
    {
      title: "Healthcare Tech",
      description: "HIPAA-compliant healthcare technology solutions",
      imageSrc: "/healthcare.jpg",
      imageAlt: "Healthcare technology",
    },
  ];

  it("renders all service items correctly", () => {
    render(<IndustriesBadgeListBordered services={mockServices} />);
    expect(screen.getByText("E-Commerce")).toBeInTheDocument();
    expect(screen.getByText("SaaS Platforms")).toBeInTheDocument();
    expect(screen.getByText("Healthcare Tech")).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    render(<IndustriesBadgeListBordered services={mockServices} />);
    expect(
      screen.getByText(
        "End-to-end e-commerce solutions from storefront to fulfillment"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Scalable software-as-a-service application development")
    ).toBeInTheDocument();
  });

  it("renders custom badge text", () => {
    render(
      <IndustriesBadgeListBordered
        services={mockServices}
        badge="Our Expertise"
      />
    );
    expect(screen.getByText("Our Expertise")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(
      <IndustriesBadgeListBordered
        services={mockServices}
        heading="Industries We Specialize In"
      />
    );
    expect(screen.getByText("Industries We Specialize In")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <IndustriesBadgeListBordered
        services={mockServices}
        className="custom-class"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders images with correct alt text", () => {
    render(<IndustriesBadgeListBordered services={mockServices} />);
    expect(screen.getByAltText("E-commerce solutions")).toBeInTheDocument();
    expect(screen.getByAltText("SaaS development")).toBeInTheDocument();
    expect(screen.getByAltText("Healthcare technology")).toBeInTheDocument();
  });

  it("renders with empty services array", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={[]} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders section with xl spacing", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} spacing="xl" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-24");
  });

  it("renders container with max-w-7xl", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} />
    );
    const containerDiv = container.querySelector(".max-w-7xl");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders bordered rows", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} />
    );
    const borderedElements = container.querySelectorAll(".border-b");
    expect(borderedElements.length).toBeGreaterThan(0);
  });

  it("renders grid layout for rows", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} />
    );
    const grids = container.querySelectorAll(".grid");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("renders with single service item", () => {
    const singleService: IndustryService[] = [
      {
        title: "FinTech",
        description: "Financial technology solutions",
        imageSrc: "/fintech.jpg",
        imageAlt: "FinTech solutions",
      },
    ];
    render(<IndustriesBadgeListBordered services={singleService} />);
    expect(screen.getByText("FinTech")).toBeInTheDocument();
    expect(
      screen.getByText("Financial technology solutions")
    ).toBeInTheDocument();
  });

  it("renders object-contain images", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} />
    );
    const objectContain = container.querySelectorAll(".object-contain");
    expect(objectContain.length).toBeGreaterThan(0);
  });

  it("renders responsive grid columns", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} />
    );
    const grids = container.querySelectorAll(".md\\:grid-cols-12");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("combines all props correctly", () => {
    const { container } = render(
      <IndustriesBadgeListBordered
        services={mockServices}
        badge="Expertise"
        heading="Our Industries"
        className="custom-section"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-section");
    expect(screen.getByText("Expertise")).toBeInTheDocument();
    expect(screen.getByText("Our Industries")).toBeInTheDocument();
    expect(screen.getByText("E-Commerce")).toBeInTheDocument();
  });

  it("renders text styling correctly", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} heading="Test Heading" />
    );
    const headings = container.querySelectorAll("h2");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders muted foreground text for descriptions", () => {
    const { container } = render(
      <IndustriesBadgeListBordered services={mockServices} />
    );
    const mutedText = container.querySelectorAll(".text-muted-foreground");
    expect(mutedText.length).toBeGreaterThan(0);
  });
});
