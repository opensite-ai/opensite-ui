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

  it("renders with default props", () => {
    render(<IndustriesHoverRevealGrid />);
    expect(screen.getByText("Industries")).toBeInTheDocument();
    expect(screen.getAllByText("Overview:").length).toBeGreaterThan(0);
  });

  it("renders all industry items correctly", () => {
    render(<IndustriesHoverRevealGrid industries={mockIndustries} />);
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("Retail")).toBeInTheDocument();
    expect(screen.getByText("Manufacturing")).toBeInTheDocument();
  });

  it("renders industry descriptions", () => {
    render(<IndustriesHoverRevealGrid industries={mockIndustries} />);
    expect(
      screen.getByText("Digital solutions for modern healthcare providers")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Secure fintech applications and banking solutions")
    ).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(
      <IndustriesHoverRevealGrid
        industries={mockIndustries}
        heading="Our Sectors"
      />
    );
    expect(screen.getByText("Our Sectors")).toBeInTheDocument();
  });

  it("renders custom industry label", () => {
    render(
      <IndustriesHoverRevealGrid
        industries={mockIndustries}
        industryLabel="Sector"
      />
    );
    expect(screen.getAllByText("Sector:").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid
        industries={mockIndustries}
        className="custom-class"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders images with correct alt text", () => {
    render(<IndustriesHoverRevealGrid industries={mockIndustries} />);
    expect(screen.getByAltText("Healthcare industry")).toBeInTheDocument();
    expect(screen.getByAltText("Finance industry")).toBeInTheDocument();
  });

  it("renders links with correct href", () => {
    render(<IndustriesHoverRevealGrid industries={mockIndustries} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/industries/healthcare");
    expect(links[1]).toHaveAttribute("href", "/industries/finance");
  });

  it("applies responsive grid classes", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid industries={mockIndustries} />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("lg:grid-cols-2");
    expect(grid?.className).toContain("xl:grid-cols-4");
  });

  it("renders with empty industries array", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid industries={[]} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders section with lg spacing", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid industries={mockIndustries} />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-20");
  });

  it("renders container with max-w-7xl", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid industries={mockIndustries} />
    );
    const containerDiv = container.querySelector(".max-w-7xl");
    expect(containerDiv).toBeInTheDocument();
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

  it("renders industry cards with overflow-hidden", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid industries={mockIndustries} />
    );
    const cards = container.querySelectorAll(".overflow-hidden");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders with single industry item", () => {
    const singleIndustry: IndustryItem[] = [
      {
        name: "Tech",
        description: "Technology solutions",
        image: "/tech.jpg",
        imageAlt: "Tech industry",
        url: "/industries/tech",
      },
    ];
    render(<IndustriesHoverRevealGrid industries={singleIndustry} />);
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Technology solutions")).toBeInTheDocument();
  });

  it("renders bg-muted styling on cards", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid industries={mockIndustries} />
    );
    const mutedElements = container.querySelectorAll(".bg-muted");
    expect(mutedElements.length).toBeGreaterThan(0);
  });

  it("renders min-h-120 on card containers", () => {
    const { container } = render(
      <IndustriesHoverRevealGrid industries={mockIndustries} />
    );
    const minHeightElements = container.querySelectorAll(".min-h-120");
    expect(minHeightElements.length).toBeGreaterThan(0);
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
