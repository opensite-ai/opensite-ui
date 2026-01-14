import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactQuote } from "../contact-quote";

describe("ContactQuote", () => {

  it("renders custom heading", () => {
    render(<ContactQuote heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactQuote description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactQuote buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
