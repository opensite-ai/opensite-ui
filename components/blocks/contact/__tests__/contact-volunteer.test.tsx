import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactVolunteer } from "../contact-volunteer";

describe("ContactVolunteer", () => {

  it("renders custom heading", () => {
    render(<ContactVolunteer heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactVolunteer description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactVolunteer buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
