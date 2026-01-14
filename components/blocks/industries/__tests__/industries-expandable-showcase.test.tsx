import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  IndustriesExpandableShowcase,
  type IndustryContractor,
} from "../industries-expandable-showcase";

describe("IndustriesExpandableShowcase", () => {
  const mockContractors: IndustryContractor[] = [
    {
      id: "solar",
      category: "Solar",
      title: "Scaling Solar Infrastructure with Advanced Grid Integration",
      imageSrc: "/solar.jpg",
      imageAlt: "Solar power generation",
      learnMoreUrl: "/industries/solar",
    },
    {
      id: "wind",
      category: "Wind",
      title: "Maximizing Wind Farm Efficiency with AI Optimization",
      imageSrc: "/wind.jpg",
      imageAlt: "Wind power generation",
      learnMoreUrl: "/industries/wind",
    },
    {
      id: "hydro",
      category: "Hydro",
      title: "Revolutionizing Hydroelectric Power Generation",
      imageSrc: "/hydro.jpg",
      imageAlt: "Hydroelectric operations",
      learnMoreUrl: "/industries/hydro",
    },
  ];

  it("renders custom heading", () => {
    render(
      <IndustriesExpandableShowcase
        contractors={mockContractors}
        heading="Our Energy Solutions"
      />
    );
    expect(screen.getByText("Our Energy Solutions")).toBeInTheDocument();
  });

  it("combines all props correctly", () => {
    const { container } = render(
      <IndustriesExpandableShowcase
        contractors={mockContractors}
        heading="Renewable Energy"
        className="custom-section"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-section");
    expect(screen.getByText("Renewable Energy")).toBeInTheDocument();
    expect(screen.getAllByText("Solar").length).toBeGreaterThan(0);
  });
});
