import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMaintenance } from "../contact-maintenance";

describe("ContactMaintenance", () => {

  it("renders custom heading", () => {
    render(<ContactMaintenance heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactMaintenance description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactMaintenance buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
