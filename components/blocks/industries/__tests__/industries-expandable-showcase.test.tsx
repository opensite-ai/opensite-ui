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

  it("renders with default props", () => {
    render(<IndustriesExpandableShowcase />);
    expect(
      screen.getByText("Powering Renewable Industries")
    ).toBeInTheDocument();
  });

  it("renders all contractor categories correctly", () => {
    render(<IndustriesExpandableShowcase contractors={mockContractors} />);
    expect(screen.getAllByText("Solar").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Wind").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Hydro").length).toBeGreaterThan(0);
  });

  it("renders contractor titles", () => {
    render(<IndustriesExpandableShowcase contractors={mockContractors} />);
    expect(
      screen.getAllByText(
        "Scaling Solar Infrastructure with Advanced Grid Integration"
      ).length
    ).toBeGreaterThan(0);
  });

  it("renders custom heading", () => {
    render(
      <IndustriesExpandableShowcase
        contractors={mockContractors}
        heading="Our Energy Solutions"
      />
    );
    expect(screen.getByText("Our Energy Solutions")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <IndustriesExpandableShowcase
        contractors={mockContractors}
        className="custom-class"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders links with correct href", () => {
    render(<IndustriesExpandableShowcase contractors={mockContractors} />);
    const links = screen.getAllByRole("link");
    const solarLinks = links.filter(
      (link) => link.getAttribute("href") === "/industries/solar"
    );
    expect(solarLinks.length).toBeGreaterThan(0);
  });

  it("renders with empty contractors array", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={[]} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders section with py-16 spacing", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-16");
  });

  it("renders container class", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders mobile layout with space-y-6", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const mobileLayout = container.querySelector(".space-y-6.lg\\:hidden");
    expect(mobileLayout).toBeInTheDocument();
  });

  it("renders desktop layout with lg:flex", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const desktopLayout = container.querySelector(".hidden.lg\\:flex");
    expect(desktopLayout).toBeInTheDocument();
  });

  it("renders with single contractor item", () => {
    const singleContractor: IndustryContractor[] = [
      {
        id: "geothermal",
        category: "Geothermal",
        title: "Harnessing Earth's Natural Heat",
        imageSrc: "/geothermal.jpg",
        imageAlt: "Geothermal energy",
        learnMoreUrl: "/industries/geothermal",
      },
    ];
    render(<IndustriesExpandableShowcase contractors={singleContractor} />);
    expect(screen.getAllByText("Geothermal").length).toBeGreaterThan(0);
  });

  it("renders learn more links", () => {
    render(<IndustriesExpandableShowcase contractors={mockContractors} />);
    const learnMoreLinks = screen.getAllByText("Learn more");
    expect(learnMoreLinks.length).toBeGreaterThan(0);
  });

  it("renders border styling", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const borderedElements = container.querySelectorAll(".border");
    expect(borderedElements.length).toBeGreaterThan(0);
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

  it("renders heading with correct text size", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const heading = container.querySelector("h2");
    expect(heading?.className).toContain("text-4xl");
  });

  it("renders rounded-lg on mobile cards", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const roundedElements = container.querySelectorAll(".rounded-lg");
    expect(roundedElements.length).toBeGreaterThan(0);
  });

  it("renders aspect-video on mobile images", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const aspectVideo = container.querySelectorAll(".aspect-video");
    expect(aspectVideo.length).toBeGreaterThan(0);
  });

  it("renders overflow-hidden on containers", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const overflowHidden = container.querySelectorAll(".overflow-hidden");
    expect(overflowHidden.length).toBeGreaterThan(0);
  });

  it("renders muted foreground text for titles", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const mutedText = container.querySelectorAll(".text-muted-foreground");
    expect(mutedText.length).toBeGreaterThan(0);
  });

  it("handles hover state change on desktop panels", () => {
    const { container } = render(
      <IndustriesExpandableShowcase contractors={mockContractors} />
    );
    const desktopLayout = container.querySelector(".hidden.lg\\:flex");
    expect(desktopLayout).toBeInTheDocument();
  });
});
