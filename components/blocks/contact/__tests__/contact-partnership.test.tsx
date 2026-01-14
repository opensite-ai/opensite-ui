import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPartnership } from "../contact-partnership";

describe("ContactPartnership", () => {

  it("renders custom heading", () => {
    render(<ContactPartnership heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactPartnership description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactPartnership buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
