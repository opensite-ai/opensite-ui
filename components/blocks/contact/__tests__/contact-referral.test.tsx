import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactReferral } from "../contact-referral";

describe("ContactReferral", () => {

  it("renders custom heading", () => {
    render(<ContactReferral heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactReferral description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactReferral buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
