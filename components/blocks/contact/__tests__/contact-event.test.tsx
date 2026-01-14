import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactEvent } from "../contact-event";

describe("ContactEvent", () => {

  it("renders custom heading", () => {
    render(<ContactEvent heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactEvent description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactEvent buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
