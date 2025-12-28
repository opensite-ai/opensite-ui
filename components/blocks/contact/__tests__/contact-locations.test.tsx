import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactLocations } from "../contact-locations";

describe("ContactLocations", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactLocations />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactLocations className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactLocations heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactLocations description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactLocations buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactLocations />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactLocations />);
    expect(screen.getByText("Find a Location")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactLocations />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactLocations />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
