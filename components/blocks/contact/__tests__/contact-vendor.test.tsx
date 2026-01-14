import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactVendor } from "../contact-vendor";

describe("ContactVendor", () => {

  it("renders custom heading", () => {
    render(<ContactVendor heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactVendor description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactVendor buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
