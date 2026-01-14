import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactWedding } from "../contact-wedding";

describe("ContactWedding", () => {

  it("renders custom heading", () => {
    render(<ContactWedding heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactWedding description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactWedding buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
