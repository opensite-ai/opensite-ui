import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingSimpleCard } from "../pricing-simple-card";

describe("PricingSimpleCard", () => {
  const mockFeatures = [
    { text: "Feature 1" },
    { text: "Feature 2" },
    { text: "Feature 3" },
    { text: "Feature 4" },
  ];

  it("renders default title and description", () => {
    render(<PricingSimpleCard />);
    expect(screen.getByText("Pro Plan")).toBeInTheDocument();
    expect(
      screen.getByText("Everything you need to grow your business")
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <PricingSimpleCard
        title="Enterprise Plan"
        description="For large organizations"
      />
    );
    expect(screen.getByText("Enterprise Plan")).toBeInTheDocument();
    expect(screen.getByText("For large organizations")).toBeInTheDocument();
  });

  it("renders default price and interval", () => {
    render(<PricingSimpleCard />);
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("/month")).toBeInTheDocument();
  });

  it("renders custom price and interval", () => {
    render(
      <PricingSimpleCard price="$99" priceInterval="/year" />
    );
    expect(screen.getByText("$99")).toBeInTheDocument();
    expect(screen.getByText("/year")).toBeInTheDocument();
  });

  it("renders all default features", () => {
    render(<PricingSimpleCard />);
    expect(screen.getByText("Unlimited projects")).toBeInTheDocument();
    expect(screen.getByText("Advanced analytics")).toBeInTheDocument();
    expect(screen.getByText("Priority support")).toBeInTheDocument();
    expect(screen.getByText("API access")).toBeInTheDocument();
    expect(screen.getByText("Custom integrations")).toBeInTheDocument();
    expect(screen.getByText("Team collaboration")).toBeInTheDocument();
  });

  it("renders custom features", () => {
    render(<PricingSimpleCard features={mockFeatures} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
    expect(screen.getByText("Feature 4")).toBeInTheDocument();
  });

  it("renders default button text", () => {
    render(<PricingSimpleCard />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders custom action text and href", () => {
    render(
      <PricingSimpleCard
        action={{ label: "Subscribe Now", href: "/subscribe" }}
      />
    );
    const button = screen.getByText("Subscribe Now");
    expect(button).toBeInTheDocument();
    expect(button.closest("a")).toHaveAttribute("href", "/subscribe");
  });

  it("applies custom className", () => {
    const { container } = render(
      <PricingSimpleCard className="custom-pricing-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-pricing-class");
  });

  it("renders feature list with check icons", () => {
    const { container } = render(<PricingSimpleCard features={mockFeatures} />);
    const featureItems = container.querySelectorAll("li");
    expect(featureItems.length).toBe(mockFeatures.length);
  });

  it("applies correct card padding", () => {
    const { container } = render(<PricingSimpleCard />);
    const card = container.querySelector(".p-8");
    expect(card).toBeInTheDocument();
  });

  it("centers content correctly", () => {
    const { container } = render(<PricingSimpleCard />);
    const centeredDiv = container.querySelector(".text-center");
    expect(centeredDiv).toBeInTheDocument();
  });

  it("applies correct max-width constraint", () => {
    const { container } = render(<PricingSimpleCard />);
    const maxWidthDiv = container.querySelector(".max-w-md");
    expect(maxWidthDiv).toBeInTheDocument();
  });

  it("renders button with full width", () => {
    const { container } = render(<PricingSimpleCard />);
    const button = screen.getByText("Get Started").closest("a");
    expect(button?.className).toContain("w-full");
  });

  it("applies correct spacing between features", () => {
    const { container } = render(<PricingSimpleCard features={mockFeatures} />);
    const featureList = container.querySelector("ul");
    expect(featureList?.className).toContain("space-y-3");
  });

  it("renders price with large font size", () => {
    const { container } = render(<PricingSimpleCard />);
    const priceElement = screen.getByText("$49");
    expect(priceElement.className).toContain("text-5xl");
    expect(priceElement.className).toContain("font-bold");
  });

  it("renders interval with muted color", () => {
    const { container } = render(<PricingSimpleCard />);
    const intervalElement = screen.getByText("/month");
    expect(intervalElement.className).toContain("text-muted-foreground");
  });

  it("applies correct section padding", () => {
    const { container } = render(<PricingSimpleCard />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-20");
  });

  it("renders with empty features array", () => {
    const { container } = render(<PricingSimpleCard features={[]} />);
    // When features is empty, the ul element is not rendered
    const featureList = container.querySelector("ul");
    expect(featureList).toBeNull();
  });

  it("renders title with correct font weight", () => {
    const { container } = render(<PricingSimpleCard />);
    const title = screen.getByText("Pro Plan");
    expect(title.className).toContain("font-bold");
  });

  it("renders description with muted foreground", () => {
    const { container } = render(<PricingSimpleCard />);
    const description = screen.getByText(
      "Everything you need to grow your business"
    );
    expect(description.className).toContain("text-muted-foreground");
  });

  it("renders features with muted text color", () => {
    const { container } = render(<PricingSimpleCard features={mockFeatures} />);
    const feature = screen.getByText("Feature 1");
    expect(feature.className).toContain("text-muted-foreground");
  });

  it("applies correct button size", () => {
    const { container } = render(<PricingSimpleCard />);
    const button = screen.getByText("Get Started").closest("a");
    expect(button?.className).toContain("justify-center");
  });
});
