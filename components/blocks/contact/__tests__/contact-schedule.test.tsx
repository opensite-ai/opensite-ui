import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSchedule } from "../contact-schedule";

describe("ContactSchedule", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactSchedule />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactSchedule className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    render(<ContactSchedule heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactSchedule description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactSchedule buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<ContactSchedule />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ContactSchedule />);
    expect(screen.getByText("Schedule a Meeting")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactSchedule />);
    const button = screen.getByRole("button", { type: "submit" });
    expect(button).toBeInTheDocument();
  });

  it("form is accessible", () => {
    const { container } = render(<ContactSchedule />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});
