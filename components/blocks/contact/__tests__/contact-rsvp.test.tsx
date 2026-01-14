import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactRsvp } from "../contact-rsvp";

describe("ContactRsvp", () => {

  it("renders custom heading", () => {
    render(<ContactRsvp heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactRsvp description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactRsvp buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
