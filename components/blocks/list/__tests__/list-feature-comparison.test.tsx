import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListFeatureComparison } from "../list-feature-comparison";
import type {
  ListFeatureComparisonFeature,
  ListFeatureComparisonTrustIndicator,
} from "../list-feature-comparison";

describe("ListFeatureComparison", () => {
  const mockFeatures: ListFeatureComparisonFeature[] = [
    { name: "Unlimited Projects", basic: false, pro: true, enterprise: true },
    { name: "API Access", basic: true, pro: true, enterprise: true },
    { name: "Advanced Analytics", basic: false, pro: false, enterprise: true },
  ];

  const mockTrustIndicators: ListFeatureComparisonTrustIndicator[] = [
    {
      icon: "lucide/users",
      title: "50,000+ Users",
      description: "Join our community",
    },
    {
      icon: "lucide/check",
      title: "99.9% Uptime",
      description: "Reliable service",
    },
  ];

  it("renders custom badge text", () => {
    render(<ListFeatureComparison badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ListFeatureComparison heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ListFeatureComparison description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom features correctly", () => {
    render(<ListFeatureComparison features={mockFeatures} />);
    expect(screen.getByText("Unlimited Projects")).toBeInTheDocument();
    expect(screen.getByText("API Access")).toBeInTheDocument();
    expect(screen.getByText("Advanced Analytics")).toBeInTheDocument();
  });

  it("renders correct number of table rows", () => {
    const { container } = render(
      <ListFeatureComparison features={mockFeatures} />
    );
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(3);
  });

  it("renders primary button with correct text and link", () => {
    render(
      <ListFeatureComparison
        actions={[{ label: "Sign Up Now", href: "/signup" }]}
      />
    );
    const link = screen.getByRole("link", { name: /Sign Up Now/ });
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("renders secondary button with correct text and link", () => {
    render(
      <ListFeatureComparison
        actions={[{ label: "Learn More", href: "/features", variant: "outline" }]}
      />
    );
    const link = screen.getByRole("link", { name: "Learn More" });
    expect(link).toHaveAttribute("href", "/features");
  });

  it("renders table structure correctly", () => {
    const { container } = render(
      <ListFeatureComparison features={mockFeatures} />
    );
    expect(container.querySelector("table")).toBeInTheDocument();
    expect(container.querySelector("thead")).toBeInTheDocument();
    expect(container.querySelector("tbody")).toBeInTheDocument();
  });

  it("renders with empty features array", () => {
    const { container } = render(<ListFeatureComparison features={[]} />);
    expect(container.firstChild).toBeInTheDocument();
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(0);
  });
});
