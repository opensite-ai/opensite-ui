import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactRetreat } from "../contact-retreat";

describe("ContactRetreat", () => {

  it("renders custom heading", () => {
    render(<ContactRetreat heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactRetreat description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactRetreat buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
