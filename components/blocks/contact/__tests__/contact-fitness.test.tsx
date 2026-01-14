import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFitness } from "../contact-fitness";

describe("ContactFitness", () => {

  it("renders custom heading", () => {
    render(<ContactFitness heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactFitness description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactFitness buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
