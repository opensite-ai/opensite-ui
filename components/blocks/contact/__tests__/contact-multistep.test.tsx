import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMultistep } from "../contact-multistep";

describe("ContactMultistep", () => {

  it("renders custom heading", () => {
    render(<ContactMultistep heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactMultistep description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactMultistep buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
    expect(button).toBeInTheDocument();
  });
});
