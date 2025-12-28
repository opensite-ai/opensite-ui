import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactEmergency } from "../contact-emergency";

describe("ContactEmergency", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactEmergency />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactEmergency className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactEmergency heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactEmergency description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactEmergency buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactEmergency />);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactEmergency />);
    expect(screen.getByText("Emergency Contact")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactEmergency />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactEmergency />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
