import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactEmergency } from "../contact-emergency";

describe("ContactEmergency", () => {

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
    expect(button).toBeInTheDocument();
  });
});
