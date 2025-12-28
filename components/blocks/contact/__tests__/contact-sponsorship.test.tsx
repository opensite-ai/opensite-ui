import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSponsorship } from "../contact-sponsorship";

describe("ContactSponsorship", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactSponsorship />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactSponsorship className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactSponsorship heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactSponsorship description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactSponsorship buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactSponsorship />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactSponsorship />);
    expect(screen.getByText("Sponsorship Opportunities")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactSponsorship />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactSponsorship />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
