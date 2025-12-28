import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSupport } from "../contact-support";

describe("ContactSupport", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactSupport />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactSupport className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactSupport heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactSupport description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactSupport buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactSupport />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactSupport />);
    expect(screen.getByText("How can we help?")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactSupport />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactSupport />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
