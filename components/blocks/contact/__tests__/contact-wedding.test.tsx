import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactWedding } from "../contact-wedding";

describe("ContactWedding", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactWedding />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactWedding className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactWedding heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactWedding description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactWedding buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactWedding />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactWedding />);
    expect(screen.getByText("Wedding Inquiry")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactWedding />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactWedding />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
