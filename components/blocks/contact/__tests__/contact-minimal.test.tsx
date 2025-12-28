import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMinimal } from "../contact-minimal";

describe("ContactMinimal", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactMinimal />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactMinimal className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactMinimal heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactMinimal description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactMinimal buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactMinimal />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactMinimal />);
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactMinimal />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactMinimal />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
