import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPhotography } from "../contact-photography";

describe("ContactPhotography", () => {

  it("renders custom heading", () => {
    render(<ContactPhotography heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactPhotography description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactPhotography buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
