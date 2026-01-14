import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactLocations } from "../contact-locations";

describe("ContactLocations", () => {

  it("renders custom heading", () => {
    render(<ContactLocations heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactLocations description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactLocations buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
