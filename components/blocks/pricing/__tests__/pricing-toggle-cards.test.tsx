import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PricingToggleCards } from "../pricing-toggle-cards";

describe("PricingToggleCards", () => {
  const mockPlans = [
    {
      name: "Basic",
      description: "For individuals",
      monthlyPrice: "$10",
      yearlyPrice: "$100",
      features: [{ text: "Feature 1" }, { text: "Feature 2" }],
      action: { label: "Get Started", href: "/basic" },
    },
    {
      name: "Pro",
      description: "For teams",
      monthlyPrice: "$30",
      yearlyPrice: "$300",
      features: [{ text: "Feature 1" }, { text: "Feature 2" }, { text: "Feature 3" }],
      action: { label: "Start Trial", href: "/pro" },
      isPopular: true,
    },
  ];

  it("renders custom heading and description", () => {
    render(
      <PricingToggleCards
        heading="Our Plans"
        description="Select the best option"
      />
    );
    expect(screen.getByText("Our Plans")).toBeInTheDocument();
    expect(screen.getByText("Select the best option")).toBeInTheDocument();
  });

  it("renders all plan names and descriptions", () => {
    render(<PricingToggleCards plans={mockPlans} />);
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.getByText("For individuals")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("For teams")).toBeInTheDocument();
  });

  it("displays monthly prices by default", () => {
    render(<PricingToggleCards plans={mockPlans} />);
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("$30")).toBeInTheDocument();
    expect(screen.getAllByText("/month").length).toBeGreaterThan(0);
  });

  it("toggles to yearly prices when switch is clicked", () => {
    render(<PricingToggleCards plans={mockPlans} />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$300")).toBeInTheDocument();
    expect(screen.getAllByText("/year").length).toBeGreaterThan(0);
  });

  it("highlights popular plan", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
    const popularCard = container.querySelector(".border-primary");
    expect(popularCard).toBeInTheDocument();
  });

  it("renders all plan features", () => {
    render(<PricingToggleCards plans={mockPlans} />);
    expect(screen.getAllByText("Feature 1").length).toBe(2);
    expect(screen.getAllByText("Feature 2").length).toBe(2);
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders plan buttons with correct text and href", () => {
    render(<PricingToggleCards plans={mockPlans} />);
    const basicButton = screen.getByText("Get Started");
    const proButton = screen.getByText("Start Trial");
    expect(basicButton.closest("a")).toHaveAttribute("href", "/basic");
    expect(proButton.closest("a")).toHaveAttribute("href", "/pro");
  });

  it("applies correct grid layout", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("renders feature icons", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    const featureItems = container.querySelectorAll("li");
    expect(featureItems.length).toBeGreaterThan(0);
  });

  it("renders buttons for all plans", () => {
    render(<PricingToggleCards plans={mockPlans} />);
    const basicButton = screen.getByText("Get Started").closest("a");
    const proButton = screen.getByText("Start Trial").closest("a");
    expect(basicButton).toBeInTheDocument();
    expect(proButton).toBeInTheDocument();
  });

  it("renders card content with proper structure", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    const cards = container.querySelectorAll("[data-slot='card']");
    expect(cards.length).toBe(mockPlans.length);
  });

  it("renders with empty plans array", () => {
    const { container } = render(<PricingToggleCards plans={[]} />);
    // When plans is empty, the grid element for plans is not rendered
    // But the header grid may still exist
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies shadow to popular plan card", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    const popularCard = container.querySelector(".shadow-lg");
    expect(popularCard).toBeInTheDocument();
  });

  it("renders price with correct font size", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    const prices = container.querySelectorAll(".text-4xl");
    expect(prices.length).toBeGreaterThan(0);
  });

  it("positions popular badge correctly", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    const badge = screen.getByText("Most Popular").parentElement;
    expect(badge?.className).toContain("absolute");
    expect(badge?.className).toContain("-top-3");
  });

  it("applies flex layout to cards", () => {
    const { container } = render(<PricingToggleCards plans={mockPlans} />);
    const cards = container.querySelectorAll(".flex.flex-col");
    expect(cards.length).toBeGreaterThan(0);
  });
});
