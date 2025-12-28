import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFeedback } from "../contact-feedback";

describe("ContactFeedback", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactFeedback />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactFeedback className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactFeedback heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactFeedback description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactFeedback buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactFeedback />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Feedback")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactFeedback />);
    expect(screen.getByText("Share Your Feedback")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactFeedback />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactFeedback />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
