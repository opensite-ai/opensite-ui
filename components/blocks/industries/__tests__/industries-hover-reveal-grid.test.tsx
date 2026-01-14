import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  IndustriesHoverRevealGrid,
  type IndustryItem,
} from "../industries-hover-reveal-grid";

describe("IndustriesHoverRevealGrid", () => {
  const mockIndustries: IndustryItem[] = [
    {
      name: "Healthcare",
      description: "Digital solutions for modern healthcare providers",
      image: "/healthcare.jpg",
      imageAlt: "Healthcare industry",
      url: "/industries/healthcare",
    },
    {
      name: "Finance",
      description: "Secure fintech applications and banking solutions",
      image: "/finance.jpg",
      imageAlt: "Finance industry",
      url: "/industries/finance",
    },
    {
      name: "Retail",
      description: "E-commerce and retail technology solutions",
      image: "/retail.jpg",
      imageAlt: "Retail industry",
      url: "/industries/retail",
    },
    {
      name: "Manufacturing",
      description: "Industrial automation and IoT solutions",
      image: "/manufacturing.jpg",
      imageAlt: "Manufacturing industry",
      url: "/industries/manufacturing",
    },
  ];

  it("renders custom heading", () => {
    render(
      <IndustriesHoverRevealGrid
        industries={mockIndustries}
        heading="Our Sectors"
      />
    );
    expect(screen.getByText("Our Sectors")).toBeInTheDocument();
  });

  it("renders header with heading and label", () => {
    render(
      <IndustriesHoverRevealGrid
        industries={mockIndustries}
        heading="Industries We Serve"
        industryLabel="Industry"
      />
    );
    expect(screen.getByText("Industries We Serve")).toBeInTheDocument();
    expect(screen.getAllByText("Industry:").length).toBeGreaterThan(0);
  });

  it("combines all props correctly", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid
        industries={mockIndustries}
        heading="Our Industries"
        industryLabel="Sector"
        className="custom-section"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-section");
    expect(screen.getByText("Our Industries")).toBeInTheDocument();
    expect(screen.getAllByText("Sector:").length).toBeGreaterThan(0);
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
  });
});
