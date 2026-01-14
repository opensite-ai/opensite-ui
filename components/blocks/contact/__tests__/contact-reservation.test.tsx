import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactReservation } from "../contact-reservation";

describe("ContactReservation", () => {

  it("renders custom heading", () => {
    render(<ContactReservation heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactReservation description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactReservation buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
