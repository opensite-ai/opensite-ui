import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProcessHoverCards } from "../process-hover-cards";

describe("ProcessHoverCards", () => {
  const mockSteps = [
    {
      step: "01",
      title: "Discovery",
      image: "https://example.com/image1.jpg",
      description: "Understanding your needs",
    },
    {
      step: "02",
      title: "Strategy",
      image: "https://example.com/image2.jpg",
      description: "Planning the approach",
    },
    {
      step: "03",
      title: "Execution",
      image: "https://example.com/image3.jpg",
      description: "Building the solution",
    },
  ];

  it("renders custom title and description", () => {
    render(
      <ProcessHoverCards
        title="How We Work"
        description="Our unique approach"
      />
    );
    expect(screen.getByText("How We Work")).toBeInTheDocument();
    expect(screen.getByText("Our unique approach")).toBeInTheDocument();
  });

  it("renders all provided steps", () => {
    render(<ProcessHoverCards steps={mockSteps} />);
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("Execution")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<ProcessHoverCards steps={mockSteps} />);
    expect(screen.getByText("Understanding your needs")).toBeInTheDocument();
    expect(screen.getByText("Planning the approach")).toBeInTheDocument();
    expect(screen.getByText("Building the solution")).toBeInTheDocument();
  });

  it("renders step numbers with leading zeros", () => {
    render(<ProcessHoverCards steps={mockSteps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders steps as list items with group class", () => {
    const { container } = render(<ProcessHoverCards steps={mockSteps} />);
    const listItems = container.querySelectorAll("li.group");
    expect(listItems.length).toBe(3);
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessHoverCards steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders steps with border bottom", () => {
    const { container } = render(<ProcessHoverCards steps={mockSteps} />);
    const listItems = container.querySelectorAll("li");
    listItems.forEach((item) => {
      expect(item.className).toContain("border-b");
    });
  });

  it("applies hover text color change class", () => {
    const { container } = render(<ProcessHoverCards steps={mockSteps} />);
    const titles = container.querySelectorAll("h3");
    titles.forEach((title) => {
      expect(title.className).toContain("group-hover:text-primary");
    });
  });

  it("renders mono font for step numbers", () => {
    const { container } = render(<ProcessHoverCards steps={mockSteps} />);
    const stepNumbers = container.querySelectorAll(".font-mono");
    expect(stepNumbers.length).toBe(3);
  });

  it("handles mouse enter and leave events", () => {
    const { container } = render(<ProcessHoverCards steps={mockSteps} />);
    const listItem = container.querySelector("li");
    
    if (listItem) {
      fireEvent.mouseEnter(listItem);
      fireEvent.mouseLeave(listItem);
    }
    
    expect(container.firstChild).toBeInTheDocument();
  });
});
