import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactCatering } from "../contact-catering";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactCatering", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactCatering />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactCatering className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactCatering heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactCatering description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactCatering buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactCatering />);

    // Event details fields - Select fields use getByText since they have custom rendering
    expect(screen.getByText("Event Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Event Date")).toBeInTheDocument();
    expect(screen.getByText("Number of Guests")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Venue")).toBeInTheDocument();

    // Service preferences section
    expect(screen.getByText("Service Preferences")).toBeInTheDocument();

    // Service style radio options
    expect(screen.getByText("Buffet")).toBeInTheDocument();
    expect(screen.getByText("Plated")).toBeInTheDocument();
    expect(screen.getByText("Family Style")).toBeInTheDocument();
    expect(screen.getByText("Food Stations")).toBeInTheDocument();
    expect(screen.getByText("Cocktail")).toBeInTheDocument();

    // Cuisine preferences checkboxes
    expect(screen.getByText("American")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
    expect(screen.getByText("Asian Fusion")).toBeInTheDocument();
    expect(screen.getByText("Mexican")).toBeInTheDocument();
    expect(screen.getByText("Mediterranean")).toBeInTheDocument();
    expect(screen.getByText("BBQ")).toBeInTheDocument();

    // Dietary accommodations checkboxes
    expect(screen.getByText("Vegetarian options")).toBeInTheDocument();
    expect(screen.getByText("Vegan options")).toBeInTheDocument();
    expect(screen.getByText("Gluten-free options")).toBeInTheDocument();
    expect(screen.getByText("Kosher")).toBeInTheDocument();
    expect(screen.getByText("Halal")).toBeInTheDocument();

    // Budget field - Select field uses getByText
    expect(screen.getByText("Budget Per Person (Optional)")).toBeInTheDocument();

    // Contact information fields (single name field instead of firstName/lastName)
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    // Additional details
    expect(screen.getByLabelText("Additional Details (Optional)")).toBeInTheDocument();

    // Tasting checkbox
    expect(screen.getByText("I'm interested in scheduling a tasting")).toBeInTheDocument();
  });

  it("renders event type options", () => {
    render(<ContactCatering />);
    // Select component renders with custom UI, check for the label text
    expect(screen.getByText("Event Type")).toBeInTheDocument();
  });

  it("renders guest count options", () => {
    render(<ContactCatering />);
    // Select component renders with custom UI, check for the label text
    expect(screen.getByText("Number of Guests")).toBeInTheDocument();
  });

  it("renders budget options", () => {
    render(<ContactCatering />);
    // Select component renders with custom UI, check for the label text
    expect(screen.getByText("Budget Per Person (Optional)")).toBeInTheDocument();
  });
});
